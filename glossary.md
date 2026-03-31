# 术语表 (Glossary)

> 本术语表收录全书使用的核心概念。每个术语在正文中首次出现时以**粗体**标注。

---

| 术语 | 英文原文 | 定义 | 首见章节 |
|------|---------|------|---------|
| Agent 循环 | Agent Loop | Claude Code 的核心运行机制——一个"思考→行动→观察→再思考"的无界异步循环，由 `query.ts` 中的 AsyncGenerator 实现 | 第 1 章 |
| 工具调用 | Tool Use / Tool Call | LLM 在对话中请求执行一个外部操作（读文件、运行命令等）的协议行为。包含提议（tool_use）和结果（tool_result）两个阶段 | 第 3 章 |
| 工具执行 | Tool Execution | 工具调用被批准后，系统实际运行工具代码并获取结果的过程。是工具调用的子步骤 | 第 4 章 |
| 上下文压缩 | Compaction | 当对话历史接近上下文窗口上限时，系统将历史消息摘要为更短的版本，以释放窗口空间。Claude Code 中由 `compact.ts` 实现 | 第 12 章 |
| 微压缩 | MicroCompact | 一种轻量级的上下文优化，在不触发完整 Compaction 的情况下减少消息体积 | 第 12 章 |
| 上下文窗口 | Context Window | LLM 单次请求能处理的最大 token 数量。Claude Code 的所有消息（系统提示、对话历史、工具结果）共享这一窗口 | 第 3 章 |
| 提示词缓存 | Prompt Cache | Anthropic API 的一项优化：如果请求的前缀与之前的请求相同，可以复用已处理的中间结果，减少计算和成本 | 第 12 章 |
| 系统提示 | System Prompt | 发送给 LLM 的第一段文本，定义了 Agent 的角色、能力和行为准则。Claude Code 动态组装系统提示 | 第 3 章 |
| 队友 Agent | Teammate | Claude Code 多 Agent 系统中的协作者。可以是进程内（AsyncLocalStorage 隔离）、tmux 面板或 iTerm2 标签页 | 第 10 章 |
| 协调者 | Coordinator | 多 Agent 系统中负责分配任务和管理队友的领导 Agent | 第 10 章 |
| 文件锁 | File Lock | 使用文件系统实现的互斥锁（通过 `proper-lockfile` 库），Claude Code 用它在多 Agent 之间协调对共享文件的访问 | 第 10 章 |
| 指数退避 | Exponential Backoff | 一种重试策略：每次失败后等待时间翻倍（加随机抖动），避免"惊群效应" | 第 9 章 |
| 权限频谱 | Permission Spectrum | Claude Code 的权限模型理念：安全不是"全有或全无"的开关，而是从 `deny`（拒绝）到 `ask`（询问）到 `allow`（允许）的连续频谱 | 第 5 章 |
| 权限规则 | Permission Rule | 在 `settings.json` 中声明的工具访问控制规则，语法如 `"Bash(prefix:git)"`，支持工具名、内容匹配和 MCP 服务器级别规则 | 第 5 章 |
| 沙箱 | Sandbox | 限制工具（特别是 Bash 命令）能访问的文件系统范围，由 `sandbox-adapter.ts` 实现 | 第 5 章 |
| 投机性分类器 | Speculative Classifier | 在显示权限对话框之前，预先判断 Bash 命令安全性的 ML 分类器，用于加速交互 | 第 5 章 |
| MCP | Model Context Protocol | Anthropic 定义的协议，允许外部服务向 AI Agent 提供工具、资源和上下文。Claude Code 支持 stdio、HTTP、SSE、WebSocket 四种传输方式 | 第 11 章 |
| Skill | Skill | Claude Code 的可复用工作流模板，以 Markdown 文件（含 YAML frontmatter）定义，存放在 `.claude/skills/` 目录 | 第 11 章 |
| Hook | Hook | 在特定生命周期事件（如工具执行前后）触发的外部脚本，在 `settings.json` 中配置。exit code 2 表示阻止操作 | 第 11 章 |
| Custom Agent | Custom Agent | 用户自定义的 Agent 角色，以 Markdown 文件定义，存放在 `.claude/agents/` 目录 | 第 11 章 |
| 延迟加载工具 | Deferred Tool | 当 MCP 工具数量超过上下文窗口的 10% 时，系统自动将部分工具标记为"延迟加载"，仅在被 `ToolSearchTool` 发现时才注入完整 schema | 第 11 章 |
| 异步生成器 | AsyncGenerator | JavaScript 的 `async function*` 语法，可以异步地逐个产出值。Claude Code 用它实现流式管道——数据在系统中"流过"而非"存储" | 第 3 章 |
| 背压 | Backpressure | 当消费者处理速度慢于生产者时，自动减缓生产者的机制。AsyncGenerator 天然支持背压——不消费就不生产 | 第 6 章 |
| 流式工具执行器 | StreamingToolExecutor | Claude Code 的工具执行调度器，管理工具的并行/串行执行、按序交付结果、背压控制 | 第 6 章 |
| 工具批次分区 | Tool Batch Partitioning | 将一次 LLM 回复中的多个工具调用分为"只读并行批次"和"写操作串行批次"的策略 | 第 6 章 |
| Ink | Ink | 基于 React 的终端 UI 框架，Claude Code 将其源码内嵌到 `src/ink/` 目录并深度定制 | 第 7 章 |
| Yoga | Yoga | Facebook 开发的跨平台 Flexbox 布局引擎，Ink 用它在终端中实现类 CSS 布局 | 第 7 章 |
| React Reconciler | React Reconciler | React 的核心调和算法，负责比较新旧虚拟 DOM 树并计算最小更新。在 Ink 中被适配用于终端字符输出 | 第 7 章 |
| 帧渲染 | Frame Rendering | Ink 的渲染模型：以 ~60fps 的频率检查脏区域并增量更新终端输出 | 第 7 章 |
| 七层配置 | Seven-Layer Config | Claude Code 的配置优先级体系，从高到低：Enterprise MDM → Remote → Policy File → CLI Flag → Local → Project → User | 第 8 章 |
| Drop-in 约定 | Drop-in Convention | 配置文件的扩展模式：基础文件 + 同名 `.d/` 目录，目录内文件按字母序合并覆盖。如 `managed-settings.json` + `managed-settings.d/*.json` | 第 8 章 |
| MDM | Mobile Device Management | 企业移动设备管理，Claude Code 通过 macOS plist / Windows HKLM 注册表读取企业策略 | 第 8 章 |
| @include 指令 | @include Directive | CLAUDE.md 文件中的文件引用语法（如 `@./path/to/file`），支持递归加载、循环检测、最大深度 5 层 | 第 8 章 |
| 写穿缓存 | Write-Through Cache | 写操作同时更新缓存和持久存储的策略，Claude Code 用它确保配置写入后缓存立即生效 | 第 8 章 |
| 安全失败 | Fail-Closed | 当系统不确定时，默认拒绝操作（而非默认允许）。`buildTool()` 的默认值遵循此原则 | 第 4 章 |
| 遥测安全错误 | TelemetrySafeError | 一种特殊的错误类型，其类名包含验证声明，确保错误信息不包含用户代码或文件路径，可安全发送到遥测系统 | 第 9 章 |
| Token 预算 | Token Budget | 分配给特定操作（如压缩后的对话、单个文件摘要、Skill 注入）的最大 token 数量 | 第 12 章 |
| Feature Flag | Feature Flag | 编译时或运行时的功能开关。Claude Code 使用 `bun:bundle` 实现编译时消除，使用 GrowthBook 实现运行时控制 | 第 2 章 |
| Worktree | Git Worktree | Git 的工作树功能，允许在同一仓库的不同分支上同时工作。Claude Code 用它实现 Agent 之间的文件系统级隔离 | 第 13 章 |
| 消息队列管理器 | MessageQueueManager | Claude Code 的内部组件，在工具执行期间缓冲用户输入，防止消息丢失 | 第 13 章 |
| Cron 调度器 | Cron Scheduler | Claude Code 的定时任务系统，支持持久化（跨会话）和会话内两种模式，具有抖动配置和 7 天自动过期 | 第 13 章 |
| 抖动 | Jitter | 在定时任务的触发时间上添加随机偏移，避免大量任务在同一时刻触发（如避开 :00 和 :30） | 第 13 章 |
| 可观测性三支柱 | Three Pillars of Observability | 日志（Logs）、指标（Metrics）、追踪（Traces）——Claude Code 通过 OpenTelemetry 实现 | 第 14 章 |
| 成本追踪 | Cost Tracking | Claude Code 实时追踪每次 API 调用的 token 消耗和费用，由 `cost-tracker.ts` 实现 | 第 14 章 |
