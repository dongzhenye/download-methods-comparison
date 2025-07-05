# 前端下载方式兼容性演示

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.0-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

本项目基于 React + Vite，旨在演示三种常见的前端文件下载实现方式在与后端下载 API 搭配使用时的表现差异：

- ✅ **推荐方式**：fetch + Blob - 可以兼容后端报错，避免页面跳转
- ❌ **传统方式**：a标签 href/download - 无法避免页面跳转到报错地址
- ❌ **传统方式**：window.open - 无法避免页面跳转到报错地址

## 🎯 项目目标

通过实际代码演示，帮助开发者理解不同前端下载实现方式的优缺点，尤其是在后端接口可能返回错误（如 404、500 或业务异常）的情况下，如何避免用户体验不佳的问题。

## 🚀 快速开始

### 安装依赖
```bash
npm install
# 或
pnpm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 📖 下载方式详细说明

### 1. a标签 href/download 属性（传统方式）

```jsx
<a href="后端下载API地址" download>下载文件</a>
```

**特点：**
- ✅ 实现简单，浏览器原生支持
- ✅ 兼容性极好
- ❌ 无法拦截后端错误
- ❌ 错误时页面会跳转或下载错误内容

### 2. window.open 方式（传统方式）

```js
window.open("后端下载API地址");
```

**特点：**
- ✅ 实现简单
- ✅ 兼容性极好
- ✅ 不会影响当前页面
- ❌ 无法拦截后端错误
- ❌ 错误时会打开错误页面

### 3. fetch + Blob 方式（推荐方式）

```js
const handleDownload = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`下载失败: ${response.status}`);
    }
    
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = '文件名.ext';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('下载失败:', error);
    // 可以显示友好的错误提示
  }
};
```

**特点：**
- ✅ 可以拦截和处理错误
- ✅ 支持自定义文件名
- ✅ 可以实现下载进度
- ✅ 用户体验友好
- ❌ 受CORS策略限制
- ❌ 实现相对复杂

## 🏗️ 项目结构

```
download-error/
├── public/                 # 静态资源
├── src/
│   ├── App.jsx            # 主应用组件
│   ├── App.css            # 应用样式
│   ├── main.jsx           # 应用入口
│   └── index.css          # 全局样式
├── package.json           # 项目配置
├── vite.config.js         # Vite配置
├── eslint.config.js       # ESLint配置
└── README.md              # 项目文档
```

## 🎨 功能特性

- **交互式演示**：实时切换正常/错误链接进行测试
- **可视化对比**：详细的对比表格展示各方式优缺点
- **响应式设计**：适配不同屏幕尺寸
- **现代UI**：简洁美观的用户界面
- **错误处理**：完善的错误提示机制

## 📊 方式对比一览表

| 对比项             | a标签 href         | window.open         | fetch + Blob         |
|--------------------|--------------------|---------------------|----------------------|
| 可拦截错误         | ✗                  | ✗                   | ✅                    |
| 受CORS影响         | ✗                  | ✗                   | ⚠️                    |
| 用户体验           | 原生下载/跳转      | 新窗口跳转（适中）  | 友好可控             |
| 支持自定义文件名   | 部分支持           | ✗                   | ✅                    |
| 兼容性             | 极好               | 极好                | 现代浏览器           |
| 支持大文件         | ✅                  | ✅                   | ✅                    |
| 支持进度/反馈      | ✗                  | ✗                   | ✅（可实现进度条）    |
| 实现复杂度         | 最低               | 低                  | 略高                 |

## ⚠️ 注意事项

1. **CORS限制**：fetch + Blob 方式需要目标服务器设置正确的CORS头
2. **文件大小**：大文件下载时建议添加进度提示
3. **错误处理**：生产环境中应提供更友好的错误提示
4. **浏览器兼容性**：fetch + Blob 方式需要现代浏览器支持

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

**© 2024 前端下载方式兼容性演示 | React + Vite**
