# 附录 A：源码导航速查

> 快速定位 Claude Code 源码中的关键模块。

---

## 按功能领域索引

### Agent 循环
| 文件 | 职责 | 相关章节 |
|------|------|---------|
| `src/query.ts` | Agent 循环核心（AsyncGenerator） | 第 3 章 |
| `src/QueryEngine.ts` | 查询生命周期管理 | 第 3 章 |
| `src/services/api/claude.ts` | Anthropic API 客户端 | 第 3 章 |
| `src/services/api/withRetry.ts` | 重试策略 | 第 9 章 |

### 工具系统
| 文件 | 职责 | 相关章节 |
|------|------|---------|
| `src/Tool.ts` | 工具接口定义（~25 方法） | 第 4 章 |
| `src/tools.ts` | 工具注册表 | 第 4 章 |
| `src/tools/` | 57 个工具实现 | 第 4 章 |
| `src/services/tools/toolExecution.ts` | 工具执行引擎 | 第 4 章 |
| `src/services/tools/toolOrchestration.ts` | 并行/串行编排 | 第 6 章 |
| `src/services/tools/StreamingToolExecutor.ts` | 流式执行器 | 第 6 章 |

### 权限与安全
| 文件 | 职责 | 相关章节 |
|------|------|---------|
| `src/utils/permissions/permissions.ts` | 权限决策核心 | 第 5 章 |
| `src/utils/permissions/PermissionRule.ts` | 规则解析 | 第 5 章 |
| `src/utils/sandbox/sandbox-adapter.ts` | 沙箱适配 | 第 5 章 |
| `src/hooks/toolPermission/` | 三条权限路径 | 第 5 章 |

### 配置系统
| 文件 | 职责 | 相关章节 |
|------|------|---------|
| `src/utils/settings/settings.ts` | 七层配置加载合并 | 第 8 章 |
| `src/utils/config.ts` | 全局配置管理 | 第 8 章 |
| `src/utils/claudemd.ts` | CLAUDE.md 加载 | 第 8 章 |

### 多 Agent 协作
| 文件 | 职责 | 相关章节 |
|------|------|---------|
| `src/tools/AgentTool/` | Agent 工具 | 第 10 章 |
| `src/utils/swarm/` | Teammate 生成 | 第 10 章 |
| `src/utils/teammateMailbox.ts` | 文件基邮箱 | 第 10 章 |
| `src/utils/tasks.ts` | 任务持久化 | 第 10 章 |

### 终端 UI
| 文件 | 职责 | 相关章节 |
|------|------|---------|
| `src/ink/` | 内嵌 Ink 渲染引擎 | 第 7 章 |
| `src/components/` | 150+ React 组件 | 第 7 章 |
| `src/state/` | 应用状态管理 | 第 7 章 |

### 上下文管理
| 文件 | 职责 | 相关章节 |
|------|------|---------|
| `src/services/compact/compact.ts` | 上下文压缩 | 第 12 章 |
| `src/context.ts` | 系统提示构建 | 第 12、13 章 |
| `src/constants/prompts.ts` | 提示词组装引擎 | 第 13 章 |
| `src/utils/systemPrompt.ts` | 提示词优先级路由 | 第 13 章 |
| `src/constants/systemPromptSections.ts` | 提示词缓存管理 | 第 13 章 |

---

## 按设计模式索引

| 模式 | 使用位置 | 相关章节 |
|------|---------|---------|
| AsyncGenerator 流式管道 | `query.ts`, `StreamingToolExecutor.ts` | 第 3、6 章 |
| 安全失败默认值 | `Tool.ts:757` (`TOOL_DEFAULTS`) | 第 4 章 |
| 文件锁 + 指数退避 | `utils/tasks.ts`, `utils/teammateMailbox.ts` | 第 10、13 章 |
| 懒加载打破循环依赖 | `tools.ts:63-72` | 第 1 章 |
| Zod Schema 验证 | 所有 `tools/*/` 的 `inputSchema` | 第 4 章 |
| 编译时 Feature Flag | `tools.ts` (`feature()` from `bun:bundle`) | 第 2 章 |
| 写穿缓存 | `utils/settings/settingsCache.ts` | 第 8 章 |
| AsyncLocalStorage 隔离 | `utils/swarm/spawnInProcess.ts` | 第 10、13 章 |

---

## 核心类型定义速查

| 类型 | 定义位置 | 用途 |
|------|---------|------|
| `Tool` | `src/Tool.ts` | 工具接口（~25 方法） |
| `Message` | `src/types/message.ts` | 对话消息类型层次 |
| `AppState` | `src/state/AppState.tsx` | 应用全局状态 |
| `PermissionRule` | `src/utils/permissions/PermissionRule.ts` | 权限规则 |
| `ToolPermissionContext` | `src/Tool.ts` | 权限上下文 |
| `CronTask` | `src/utils/cronTasks.ts` | 定时任务 |
| `InProcessSpawnConfig` | `src/utils/swarm/spawnInProcess.ts` | Teammate 配置 |
