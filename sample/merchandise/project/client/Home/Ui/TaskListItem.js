"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskListItem = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactiveWidget = require("@autonomy/reactive-widget");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function $(scene) {
  return scene.useServices();
}

class TaskListItem extends _reactiveWidget.Widget {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "luckyNumber", this.subscribe(async scene => {
      return await $(scene).wasteSomeResource();
    }));
  }

  render() {
    return /*#__PURE__*/React.createElement("span", null, this.luckyNumber);
  }

}

exports.TaskListItem = TaskListItem;