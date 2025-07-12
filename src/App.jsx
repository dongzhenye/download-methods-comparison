import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  // Default example links (WS Form official examples)
  // 默认示例链接（WS Form官方示例）
  const [normalUrl, setNormalUrl] = useState('https://cdn.wsform.com/wp-content/uploads/2020/06/industry.csv');
  const [errorUrl, setErrorUrl] = useState('https://cdn.wsform.com/wp-content/uploads/2020/06/not_exist.csv');
  const [errorMode, setErrorMode] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [activeMethod, setActiveMethod] = useState(null);
  const aRef = useRef(null);

  const url = errorMode ? errorUrl : normalUrl;

  // Show message with auto-hide
  // 显示消息
  const showMessage = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  // 1. Traditional <a> tag method
  // 1. a标签方式
  const handleHrefDownload = () => {
    setActiveMethod('href');
    if (aRef.current) {
      aRef.current.href = url;
      aRef.current.click();
      showMessage('已触发下载（如接口报错，页面可能跳转或下载错误内容）', 'warning');
    }
    setTimeout(() => setActiveMethod(null), 1000);
  };

  // 2. window.open method
  // 2. window.open方式
  const handleOpenDownload = () => {
    setActiveMethod('open');
    try {
      window.open(url);
      showMessage('已尝试新窗口下载（如接口报错，可能跳转到错误页面）', 'warning');
    } catch (error) {
      showMessage('打开新窗口失败：' + error.message, 'error');
    }
    setTimeout(() => setActiveMethod(null), 1000);
  };

  // 3. fetch + Blob method (recommended)
  // 3. fetch+Blob方式
  const handleFetchDownload = async () => {
    setActiveMethod('fetch');
    setDownloading(true);
    
    try {
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const blob = await res.blob();
      
      // Try to get filename from URL or headers
      // 尝试从url或header获取文件名
      let filename = 'downloaded_file';
      const disposition = res.headers.get('content-disposition');
      
      if (disposition && disposition.includes('filename=')) {
        filename = decodeURIComponent(disposition.split('filename=')[1].replace(/['"]/g, ''));
      } else {
        // Extract filename from URL
        // 从url提取文件名
        const urlParts = url.split('/');
        if (urlParts.length > 0) {
          filename = urlParts[urlParts.length - 1];
        }
      }
      
      // Create download link
      // 创建下载链接
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up memory
      // 清理内存
      window.URL.revokeObjectURL(link.href);
      
      showMessage('下载成功！', 'success');
    } catch (error) {
      console.error('下载失败:', error);
      showMessage('下载失败：' + (error.message || '未知错误'), 'error');
    } finally {
      setDownloading(false);
      setTimeout(() => setActiveMethod(null), 1000);
    }
  };

  const methods = [
    {
      id: 'href',
      title: 'a标签 href/download',
      icon: '🔗',
      description: '浏览器原生下载，无法拦截错误',
      pros: ['实现简单', '兼容性好'],
      cons: ['无法拦截错误', '可能跳转页面'],
      handler: handleHrefDownload,
      color: '#3b82f6',
      recommended: false
    },
    {
      id: 'open',
      title: 'window.open',
      icon: '🪟',
      description: '新窗口下载，不影响当前页面',
      pros: ['不影响当前页', '实现简单'],
      cons: ['无法拦截错误', '可能打开错误页'],
      handler: handleOpenDownload,
      color: '#8b5cf6',
      recommended: false
    },
    {
      id: 'fetch',
      title: 'fetch + Blob',
      icon: '🚀',
      description: '现代方式，可完全控制下载流程',
      pros: ['可拦截错误', '支持进度', '体验友好'],
      cons: ['受CORS限制', '实现复杂'],
      handler: handleFetchDownload,
      color: '#10b981',
      recommended: true,
      loading: downloading
    }
  ];

  return (
    <div className="app">
      {/* Background decoration */}
      {/* 背景装饰 */}
      <div className="background-decoration"></div>
      
      <div className="container">
        {/* Header section */}
        {/* 标题区域 */}
        <header className="header">
          <h1 className="title">
            <span className="title-icon">📥</span>
            前端下载方式对比演示
          </h1>
          <p className="subtitle">
            探索不同下载实现方式在错误处理上的表现差异
          </p>
        </header>

        {/* Configuration panel */}
        {/* 配置面板 */}
        <div className="config-panel">
          <div className="config-section">
            <div className="url-inputs">
              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">✅</span>
                  正常下载链接
                </label>
                <input
                  type="url"
                  value={normalUrl}
                  onChange={e => setNormalUrl(e.target.value)}
                  className="input-field"
                  placeholder="输入可正常下载的文件链接"
                />
              </div>
              
              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">❌</span>
                  错误测试链接
                </label>
                <input
                  type="url"
                  value={errorUrl}
                  onChange={e => setErrorUrl(e.target.value)}
                  className="input-field error"
                  placeholder="输入会返回错误的链接"
                />
              </div>
            </div>

            <div className="switch-container">
              <span className="switch-label">模拟错误响应</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={errorMode}
                  onChange={e => setErrorMode(e.target.checked)}
                />
                <span className="switch-slider"></span>
              </label>
              <span className={`switch-status ${errorMode ? 'active' : ''}`}>
                {errorMode ? '错误模式' : '正常模式'}
              </span>
            </div>
          </div>
        </div>

        {/* Download method cards */}
        {/* 下载方式卡片 */}
        <div className="methods-grid">
          {methods.map(method => (
            <div 
              key={method.id} 
              className={`method-card ${method.recommended ? 'recommended' : ''} ${activeMethod === method.id ? 'active' : ''}`}
              style={{ '--card-color': method.color }}
            >
              {method.recommended && (
                <div className="recommended-badge">推荐</div>
              )}
              
              <div className="method-header">
                <span className="method-icon">{method.icon}</span>
                <h3 className="method-title">{method.title}</h3>
              </div>
              
              <p className="method-description">{method.description}</p>
              
              <div className="method-details">
                <div className="pros-cons">
                  <div className="pros">
                    <h4>优点</h4>
                    <ul>
                      {method.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cons">
                    <h4>缺点</h4>
                    <ul>
                      {method.cons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <button
                onClick={method.handler}
                disabled={method.loading}
                className="download-button"
              >
                {method.loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    下载中...
                  </>
                ) : (
                  '开始下载'
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Message notification */}
        {/* 消息提示 */}
        {message && (
          <div className={`message message-${messageType}`}>
            <span className="message-icon">
              {messageType === 'success' && '✅'}
              {messageType === 'error' && '❌'}
              {messageType === 'warning' && '⚠️'}
              {messageType === 'info' && 'ℹ️'}
            </span>
            {message}
          </div>
        )}

        {/* Detailed comparison table */}
        {/* 详细对比表格 */}
        <details className="comparison-details">
          <summary className="comparison-summary">
            查看详细对比 →
          </summary>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>特性</th>
                  <th>a标签 href</th>
                  <th>window.open</th>
                  <th className="highlight">fetch + Blob</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>错误拦截</td>
                  <td className="no">✗</td>
                  <td className="no">✗</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>CORS限制</td>
                  <td className="yes">✗</td>
                  <td className="yes">✗</td>
                  <td className="no">✓</td>
                </tr>
                <tr>
                  <td>自定义文件名</td>
                  <td className="partial">部分支持</td>
                  <td className="no">✗</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>下载进度</td>
                  <td className="no">✗</td>
                  <td className="no">✗</td>
                  <td className="yes">✓</td>
                </tr>
                <tr>
                  <td>浏览器兼容性</td>
                  <td className="yes">极好</td>
                  <td className="yes">极好</td>
                  <td className="partial">现代浏览器</td>
                </tr>
                <tr>
                  <td>实现复杂度</td>
                  <td className="yes">简单</td>
                  <td className="yes">简单</td>
                  <td className="partial">中等</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>

        {/* Footer */}
        {/* 页脚 */}
        <footer className="footer">
          <p>使用 React + Vite 构建 · 演示不同下载方式的错误处理差异</p>
        </footer>
      </div>

      {/* Hidden download link */}
      {/* 隐藏的下载链接 */}
      <a ref={aRef} style={{ display: 'none' }} download href={url}>下载</a>
    </div>
  );
}

export default App;