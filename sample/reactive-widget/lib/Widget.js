"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWidget = exports.renderRootWidget = exports.Widget = void 0;
const React = require("react");
const ReactDOM = require("react-dom");
const entity_archetype_1 = require("@autonomy/entity-archetype");
const Future_1 = require("./Future");
const tracing = require("scheduler/tracing");
// 展示界面，其数据来自两部分
// 父组件传递过来的 props
// 从 I/O 获得的外部状态，保存在 futures 里
class Widget {
    // 父组件传入的 props
    constructor(props) {
        this.props = props;
        // 外部状态
        this.subscriptions = new Map();
    }
    // react 的钩子不能写在 render 里，必须写在这里
    setupHooks() { }
    // 声明一份对外部状态的依赖
    subscribe(compute) {
        return new Future_1.Future(compute);
    }
    // 外部状态发生了变化，触发重渲染
    notifyChange() { }
    async mount() {
        if (this.onMount) {
            await this.onMount(new entity_archetype_1.Scene({
                serviceProtocol: Widget.serviceProtocol,
                database: Widget.database,
                operation: newOperation('sync scene'),
            }));
        }
        // afterMounted
        for (const [k, v] of Object.entries(this)) {
            if (v && v instanceof Future_1.Future) {
                this.subscriptions.set(k, v);
            }
        }
        await this.refreshSubscriptions();
    }
    async refreshSubscriptions() {
        const promises = new Map();
        // 并发计算
        for (const [k, future] of this.subscriptions.entries()) {
            promises.set(k, this.computeFuture(future));
        }
        for (const [k, promise] of promises.entries()) {
            Reflect.set(this, k, await promise);
        }
    }
    async computeFuture(future) {
        const scene = new entity_archetype_1.Scene({
            serviceProtocol: Widget.serviceProtocol,
            database: Widget.database,
            operation: currentOperation(),
        });
        return await future.get(scene);
    }
    unmount() {
        this.unmounted = true;
        for (const future of this.subscriptions.values()) {
            future.dispose();
        }
        this.subscriptions.clear();
        if (this.onUnmount) {
            this.onUnmount(new entity_archetype_1.Scene({
                database: Widget.database,
                serviceProtocol: Widget.serviceProtocol,
                operation: newOperation('unmount component'),
            }));
        }
    }
}
exports.Widget = Widget;
function newOperation(traceOp) {
    return {
        traceId: '123',
        traceOp,
        baggage: {},
        props: {},
    };
}
function currentOperation() {
    const interactions = tracing.unstable_getCurrent();
    if (!interactions) {
        throw new Error('missing operation');
    }
    for (const interaction of interactions) {
        const maybeOp = interaction.name;
        if (maybeOp && maybeOp.traceId) {
            return maybeOp;
        }
    }
    throw new Error('missing operation');
}
function runInOperation(op, action) {
    return tracing.unstable_trace(op, 0, () => {
        return action();
    });
}
function renderRootWidget(widgetClass, options) {
    entity_archetype_1.HttpServiceProtocol.project = options.project;
    Widget.database = options.database;
    Widget.serviceProtocol = options.serviceProtocol;
    Future_1.enableDependencyTracking();
    const elem = document.getElementById('RootWidget');
    if (!elem) {
        console.error('missing element #RootWidget');
        return;
    }
    const operation = newOperation(`initial render ${window.location.href}`);
    runInOperation(operation, () => {
        ReactDOM.render(renderWidget(widgetClass), elem);
    });
}
exports.renderRootWidget = renderRootWidget;
function renderWidget(widgetClass, props) {
    function Wrapper() {
        const [widget, _] = React.useState(() => new widgetClass(props));
        const [isReady, setReady] = React.useState(false);
        const initialRenderOp = currentOperation();
        React.useEffect(() => {
            const promise = runInOperation(initialRenderOp, () => {
                return widget.mount();
            });
            promise
                .then(() => {
                if (!widget.unmounted) {
                    runInOperation(initialRenderOp, () => {
                        setReady(true);
                    });
                }
            })
                .catch((reason) => {
                console.error('failure', reason);
            });
            return () => {
                widget.unmount();
            };
        }, []);
        const hooks = widget.setupHooks();
        if (isReady === true) {
            return widget.render(hooks);
        }
        return React.createElement(React.Fragment, null);
    }
    return React.createElement(Wrapper, null);
}
exports.renderWidget = renderWidget;
//# sourceMappingURL=Widget.js.map