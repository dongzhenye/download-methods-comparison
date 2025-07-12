# Download Methods Comparison

<div align="center">

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.0-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

<img src="./public/demo-screenshot.png" alt="Demo Screenshot" width="800">

[English](#english) | [中文](#中文)

</div>

## English

### 🎯 Overview

A modern React demo application that compares three different file download methods in web browsers and their behavior when backend APIs return errors. This project helps developers understand the trade-offs between different download approaches and choose the best method for their use case.

### ✨ Features

- **Three Download Methods Comparison**
  - Traditional `<a>` tag with href/download attributes
  - `window.open()` method
  - Modern `fetch` + Blob approach (recommended)
- **Error Handling Demonstration** - See how each method handles backend errors
- **Beautiful Modern UI** - Gradient backgrounds, smooth animations, and responsive design
- **Interactive Testing** - Toggle between normal and error modes to test different scenarios
- **Detailed Comparison Table** - Comprehensive feature comparison at a glance

### 🚀 Quick Start

#### Prerequisites

- Node.js >= 16
- npm or pnpm

#### Installation

```bash
# Clone the repository
git clone https://github.com/dongzhenye/download-methods-comparison.git
cd download-methods-comparison

# Install dependencies
pnpm install
# or
npm install

# Start development server
pnpm run dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the demo.

### 🛠️ Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Fix ESLint issues

### 📊 Methods Comparison

| Feature | `<a>` Tag | window.open | fetch + Blob |
|---------|-----------|-------------|--------------|
| Error Interception | ❌ | ❌ | ✅ |
| CORS Restriction | ❌ | ❌ | ⚠️ |
| Custom Filename | Partial | ❌ | ✅ |
| Progress Tracking | ❌ | ❌ | ✅ |
| Browser Compatibility | Excellent | Excellent | Modern |
| Implementation Complexity | Low | Low | Medium |

### 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 中文

### 🎯 项目简介

一个现代化的 React 演示应用，用于比较三种不同的前端文件下载方式以及它们在后端 API 返回错误时的表现。该项目帮助开发者理解不同下载方法的优缺点，并为具体场景选择最佳方案。

### ✨ 功能特性

- **三种下载方式对比**
  - 传统 `<a>` 标签配合 href/download 属性
  - `window.open()` 方法
  - 现代 `fetch` + Blob 方式（推荐）
- **错误处理演示** - 查看每种方法如何处理后端错误
- **精美的现代化 UI** - 渐变背景、流畅动画、响应式设计
- **交互式测试** - 在正常模式和错误模式之间切换以测试不同场景
- **详细对比表格** - 一目了然的功能对比

### 🚀 快速开始

#### 环境要求

- Node.js >= 16
- npm 或 pnpm

#### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/dongzhenye/download-methods-comparison.git
cd download-methods-comparison

# 安装依赖
pnpm install
# 或
npm install

# 启动开发服务器
pnpm run dev
# 或
npm run dev
```

打开 [http://localhost:5173](http://localhost:5173) 查看演示。

### 🛠️ 可用脚本

- `pnpm run dev` - 启动开发服务器
- `pnpm run build` - 构建生产版本
- `pnpm run preview` - 预览生产构建
- `pnpm run lint` - 运行代码检查
- `pnpm run lint:fix` - 修复代码问题

### 📊 方式对比

| 特性 | `<a>` 标签 | window.open | fetch + Blob |
|------|-----------|-------------|--------------|
| 错误拦截 | ❌ | ❌ | ✅ |
| CORS 限制 | ❌ | ❌ | ⚠️ |
| 自定义文件名 | 部分支持 | ❌ | ✅ |
| 进度追踪 | ❌ | ❌ | ✅ |
| 浏览器兼容性 | 极好 | 极好 | 现代浏览器 |
| 实现复杂度 | 低 | 低 | 中等 |

### 🤝 贡献指南

欢迎贡献！请查看我们的[贡献指南](CONTRIBUTING.md)了解详情。

### 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

<div align="center">
  <strong>如果这个项目对你有帮助，请给一个 ⭐️！</strong>
</div>