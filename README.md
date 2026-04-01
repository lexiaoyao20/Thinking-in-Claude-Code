# Thinking in Claude Code

> 从 Claude Code 源码里提炼一套可复用的工程思路。

这个仓库最重要的内容在 [`book/`](./book/)。

## 直接阅读

- [在线阅读](https://lexiaoyao20.github.io/Thinking-in-Claude-Code/)
- [导读](./book/README.md)
- [前言](./book/00-preface.md)
- [附录 A：源码导航速查](./book/appendix-a.md)

## 这是什么

这不是用户手册，也不是逐文件注释。

它更像一本围绕 Claude Code 源码写成的书，重点回答这些问题：

- 它为什么这样分层
- Agent 为什么是循环而不是一次调用
- 工具、权限、上下文、并发为什么最后都会变成架构问题
- 哪些做法可以迁移到自己的项目里

## 仓库怎么读

### `book/`

正文都在这里，包括导读、17 章正文、附录和术语表。

如果你是第一次来，建议从这里开始。

### `src/`

这是书里分析对应的源码材料，更适合边读边对照，不适合作为起点直接硬啃。

## 推荐阅读顺序

如果你只想先抓重点，按这个顺序读：

1. [第 1 章：架构全景](./book/01-architecture.md)
2. [第 3 章：Agent 循环](./book/03-agent-loop.md)
3. [第 4 章：工具系统](./book/04-tool-system.md)
4. [第 5 章：权限模型](./book/05-permissions.md)
5. [第 10 章：多 Agent 协作](./book/10-multi-agent.md)
6. [第 17 章：编程哲学](./book/17-philosophy.md)

## 适合谁读

- 正在做 AI Agent、代码助手、自动化工作流的人
- 想看成熟终端产品怎么组织起来的人
- 想研究大型 TypeScript 系统怎么处理边界和约束的人
- 更关心“为什么这样设计”的人

## 本地预览

```bash
mdbook serve --open
```
