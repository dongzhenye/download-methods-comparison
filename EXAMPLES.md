# Code Examples / 代码示例

This document provides practical code examples for implementing the three download methods demonstrated in this project.

本文档提供了项目中演示的三种下载方法的实际代码示例。

## 1. Traditional `<a>` Tag Method / 传统 `<a>` 标签方法

### Basic Implementation / 基础实现

```jsx
// Simple download link
// 简单的下载链接
<a href="/api/download/file.pdf" download="document.pdf">
  Download File
</a>

// Dynamic download with React
// React 中的动态下载
function DownloadButton({ fileUrl, fileName }) {
  return (
    <a 
      href={fileUrl} 
      download={fileName}
      className="download-btn"
    >
      Download {fileName}
    </a>
  );
}
```

### With Click Handler / 带点击处理

```jsx
function DownloadWithTracking({ fileUrl, fileName }) {
  const handleClick = () => {
    // Track download event
    // 追踪下载事件
    analytics.track('file_downloaded', { fileName });
  };

  return (
    <a 
      href={fileUrl} 
      download={fileName}
      onClick={handleClick}
    >
      Download {fileName}
    </a>
  );
}
```

## 2. Window.open Method / Window.open 方法

### Basic Implementation / 基础实现

```javascript
function downloadFile(url) {
  window.open(url, '_blank');
}

// React component example
// React 组件示例
function DownloadButton({ fileUrl }) {
  const handleDownload = () => {
    window.open(fileUrl, '_blank');
  };

  return (
    <button onClick={handleDownload}>
      Download File
    </button>
  );
}
```

### With Feature Detection / 带功能检测

```javascript
function safeDownload(url) {
  // Check if popup was blocked
  // 检查弹窗是否被阻止
  const newWindow = window.open(url, '_blank');
  
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    // Fallback to direct navigation
    // 降级到直接导航
    window.location.href = url;
  }
}
```

## 3. Fetch + Blob Method (Recommended) / Fetch + Blob 方法（推荐）

### Basic Implementation / 基础实现

```javascript
async function downloadFile(url, filename) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    // 清理资源
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download file: ' + error.message);
  }
}
```

### With Progress Tracking / 带进度追踪

```javascript
async function downloadWithProgress(url, filename, onProgress) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Get total size from headers
    // 从响应头获取文件总大小
    const contentLength = response.headers.get('content-length');
    const total = parseInt(contentLength, 10);
    let loaded = 0;
    
    // Read the response as a stream
    // 以流的方式读取响应
    const reader = response.body.getReader();
    const chunks = [];
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      chunks.push(value);
      loaded += value.length;
      
      // Report progress
      // 报告进度
      if (onProgress && total) {
        onProgress({
          loaded,
          total,
          percentage: Math.round((loaded / total) * 100)
        });
      }
    }
    
    // Create blob from chunks
    // 从数据块创建 blob
    const blob = new Blob(chunks);
    const downloadUrl = window.URL.createObjectURL(blob);
    
    // Trigger download
    // 触发下载
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    link.click();
    
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}

// React component with progress
// 带进度的 React 组件
function DownloadWithProgress({ url, filename }) {
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  
  const handleDownload = async () => {
    setDownloading(true);
    setProgress(0);
    
    try {
      await downloadWithProgress(url, filename, ({ percentage }) => {
        setProgress(percentage);
      });
    } catch (error) {
      alert('Download failed: ' + error.message);
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };
  
  return (
    <div>
      <button onClick={handleDownload} disabled={downloading}>
        {downloading ? `Downloading... ${progress}%` : 'Download'}
      </button>
      {downloading && (
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
```

### With CORS Headers / 处理 CORS

```javascript
async function downloadWithCORS(url, filename) {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      credentials: 'include', // If you need to send cookies
      headers: {
        'Accept': 'application/octet-stream',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    // ... rest of the download logic
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('CORS')) {
      console.error('CORS error - the server needs to allow cross-origin requests');
      // Fallback to opening in new window
      // 降级到新窗口打开
      window.open(url, '_blank');
    } else {
      throw error;
    }
  }
}
```

## Best Practices / 最佳实践

### 1. Error Handling / 错误处理

```javascript
class DownloadService {
  static async download(url, filename) {
    try {
      // Try fetch + blob first
      // 首先尝试 fetch + blob
      await this.fetchDownload(url, filename);
    } catch (error) {
      console.warn('Fetch download failed, trying fallback', error);
      
      // Fallback to window.open
      // 降级到 window.open
      this.fallbackDownload(url);
    }
  }
  
  static async fetchDownload(url, filename) {
    const response = await fetch(url);
    
    if (!response.ok) {
      // Check specific error types
      // 检查特定错误类型
      if (response.status === 404) {
        throw new Error('File not found');
      } else if (response.status === 403) {
        throw new Error('Access denied');
      } else if (response.status >= 500) {
        throw new Error('Server error');
      }
      
      throw new Error(`Download failed: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    this.triggerDownload(blob, filename);
  }
  
  static fallbackDownload(url) {
    // Create a temporary form for download
    // 创建临时表单进行下载
    const form = document.createElement('form');
    form.method = 'GET';
    form.action = url;
    form.target = '_blank';
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
  
  static triggerDownload(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
```

### 2. File Type Detection / 文件类型检测

```javascript
function getFileExtension(filename, mimeType) {
  // Try to get extension from filename
  // 尝试从文件名获取扩展名
  if (filename && filename.includes('.')) {
    return filename.split('.').pop().toLowerCase();
  }
  
  // Fallback to MIME type mapping
  // 降级到 MIME 类型映射
  const mimeToExt = {
    'application/pdf': 'pdf',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'application/zip': 'zip',
    'text/csv': 'csv',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  };
  
  return mimeToExt[mimeType] || 'download';
}

async function downloadWithAutoFilename(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  
  // Try to get filename from Content-Disposition header
  // 尝试从 Content-Disposition 响应头获取文件名
  let filename = 'download';
  const disposition = response.headers.get('content-disposition');
  if (disposition) {
    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
    if (matches && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
  }
  
  // Add extension if missing
  // 如果缺少扩展名则添加
  const ext = getFileExtension(filename, blob.type);
  if (!filename.includes('.')) {
    filename += '.' + ext;
  }
  
  // Trigger download
  // 触发下载
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(downloadUrl);
}
```

## Summary / 总结

| Method | Use Case | 使用场景 |
|--------|----------|----------|
| `<a>` tag | Simple downloads, when error handling is not critical | 简单下载，错误处理不重要时 |
| window.open | Quick implementation, opening files in new tabs | 快速实现，在新标签页打开文件 |
| fetch + Blob | Production applications requiring error handling and progress tracking | 需要错误处理和进度追踪的生产应用 |

For production applications, we strongly recommend using the **fetch + Blob** method with proper error handling and fallbacks.

对于生产应用，我们强烈建议使用带有适当错误处理和降级方案的 **fetch + Blob** 方法。