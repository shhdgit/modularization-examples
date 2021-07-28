# 优化 Feedback

在 Feedback 这部分，我们讨论了“控制边界”和“控制变更”这两部分内容。这分别对应了监控和发布变更这两项运维的传统职能。
在监控系统，发布部署系统的选择方面，要保持一致性并不难，运维强推就可以。

如果要更精细一些的Feedback，那可能要牵涉到 RPC 框架的统一，进程内的边界监控。这些就要靠 QA，基础架构，研发效能等职能部门的共同努力了。
Feedback 的最大敌人是多编程语言，如果编程语言都无法统一，这些一致性的保持代价会非常高。
基础架构团队很难去给每种编程语言提供足够优良的 SDK，新的特性也很难保持各种语言的实现会同步跟进。
盲目地拆微服务尚有挽救的必要，盲目地拆成多语言的微服务，建议直接放弃治疗。

# 指标计算与自动检查

以 RPC 框架的一致性为例：

通过代码扫描可以很容易发现哪些地方是直接 http 调用，而没有走 RPC 框架的。
甚至用正则匹配就可以把“接入率”给计算出来。
另外一个途径是在运行时采集流量数据，比如哪些请求是 RPC 框架发的，可以打上特殊的标记。