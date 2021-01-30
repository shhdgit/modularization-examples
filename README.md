飞书群：
![qrcode](./Lark20210124-111151.png)

# 业务逻辑拆分模式

* [为什么值得阅读?](./new/Why.md)
* [拆分成什么呢?](./new/Modules.md)
* [Git仓库的组合关系](./new/Composition.md)
* [评价拆得好坏的角度1：Autonomy](./new/Autonomy.md)
  * [Autonomy 指标](./new/AutonomyMetrics.md)
  * [各种需求下都有哪些常规拆法？](./new/Integration/README.md)
    * [需求模式：离散型UI](./new/Integration/DiscreteUI/README.md)
    * [需求模式：混合型UI](./new/Integration/MixedUI/README.md)
    * [需求模式：离散型流程](./new/Integration/DiscreteProcess/README.md)
    * [需求模式：混合型流程](./new/Integration/MixedProcess/README.md)
    * [需求模式：产品族](./new/Integration/ProductFamily/README.md)
  * [如何依赖倒置？意义是什么？](./new/DependencyInversion.md)
* [评价拆得好坏的角度2：Feedback](./new/Feedback.md)
  * [Feedback 指标](./new/FeedbackMetrics.md)
  * [为了让锅能甩得出去，要给运行时添加什么样的隔离措施？](./new/Isolation/README.md)
    * [控制边界](./new/Isolation/ControlBoundary.md)
      * [隔离模式：进程边界](./new/Isolation/ProcessBoundary/README.md)
      * [隔离模式：函数边界](./new/Isolation/FunctionBoundary/README.md)
      * [隔离模式：插件边界](./new/Isolation/PluginBoundary/README.md)
    * [控制变更](./new/Isolation/ControlChange.md)
      * [隔离模式：多进程](./new/Isolation/MultiProcess/README.md)
      * [隔离模式：多租户](./new/Isolation/MultiTenancy/README.md)
      * [隔离模式：多变种](./new/Isolation/MultiVariant/README.md)
  * [Autonomy 优先](./new/Isolation/AutonomyFirst.md)
* [评价拆得好坏的角度3：Consistency](./new/Consistency.md)
  * [Consistency 指标](./new/ConsistencyMetrics.md)
  * [哪些常见场景需要一致性？怎么靠机器而不是靠人盯着？](./new/Scenario/README.md)
    * [常见场景：字体和颜色](./new/Scenario/FontColor/README.md)
    * [常见场景：布局](./new/Scenario/Layout/README.md)
    * [常见场景：跨进程调用](./new/Scenario/IPC/README.md)
* [真的一点提前设计都不需要吗？](./new/Consensus.md)