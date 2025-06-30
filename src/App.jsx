import React, { useRef, useState } from 'react';

function App() {
  // 默认示例链接（tronscan接口）
  const [normalUrl, setNormalUrl] = useState('https://cdn.wsform.com/wp-content/uploads/2020/06/industry.csv');
  const [errorUrl, setErrorUrl] = useState('https://cdn.wsform.com/wp-content/uploads/2020/06/not_exist.csv');
  const [errorMode, setErrorMode] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState('');
  const [showCompare, setShowCompare] = useState(false);
  const aRef = useRef(null);

  const url = errorMode ? errorUrl : normalUrl;

  // 1. a标签方式
  const handleHrefDownload = () => {
    setMessage('');
    if (aRef.current) {
      aRef.current.href = url;
      aRef.current.click();
      setMessage('已触发下载（如接口报错，页面可能跳转或下载错误内容）');
    }
  };

  // 2. window.open方式
  const handleOpenDownload = () => {
    setMessage('');
    window.open(url);
    setMessage('已尝试新窗口下载（如接口报错，可能跳转到错误页面）');
  };

  // 3. fetch+Blob方式
  const handleFetchDownload = async () => {
    setMessage('');
    setDownloading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('接口返回错误');
      const blob = await res.blob();
      // 尝试从url或header获取文件名
      let filename = 'downloaded_file';
      const disposition = res.headers.get('content-disposition');
      if (disposition && disposition.includes('filename=')) {
        filename = decodeURIComponent(disposition.split('filename=')[1].replace(/['"]/g, ''));
      } else {
        // 从url提取
        const urlParts = url.split('/');
        if (urlParts.length > 0) filename = urlParts[urlParts.length - 1];
      }
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setMessage('下载成功（如接口报错会被拦截并提示）');
    } catch (e) {
      setMessage('下载失败：' + (e.message || '未知错误'));
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: '#f6f8fa',
      fontFamily: 'system-ui, sans-serif',
      color: '#222',
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ maxWidth: 700, width: '100%', boxSizing: 'border-box', padding: '32px 12px 0 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 配置区 */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 20, marginBottom: 14, width: '100%', boxSizing: 'border-box', borderBottom: '2px solid #f1f3f6' }}>
          <h2 style={{ color: '#2563eb', margin: 0, marginBottom: 16, fontWeight: 700, fontSize: 21, textAlign: 'center' }}>前端下载方式兼容性演示</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 180, maxWidth: 300 }}>
              <label style={{ fontSize: 13, color: '#2563eb', fontWeight: 600, marginBottom: 3 }}>正常下载链接</label>
              <input
                type="text"
                value={normalUrl}
                onChange={e => setNormalUrl(e.target.value)}
                style={{ padding: 8, borderRadius: 3, border: '1.5px solid #2563eb', fontSize: 14, background: '#fff', color: '#222', outline: 'none', fontWeight: 500, height: 36 }}
                placeholder="请输入正常下载链接"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 180, maxWidth: 300 }}>
              <label style={{ fontSize: 13, color: '#b91c1c', fontWeight: 600, marginBottom: 3 }}>错误/无效链接</label>
              <input
                type="text"
                value={errorUrl}
                onChange={e => setErrorUrl(e.target.value)}
                style={{ padding: 8, borderRadius: 3, border: '1.5px solid #b91c1c', fontSize: 14, background: '#fff', color: '#222', outline: 'none', fontWeight: 500, height: 36 }}
                placeholder="请输入错误或无效链接"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 110, alignItems: 'center', justifyContent: 'flex-end' }}>
              <label style={{ fontSize: 13, color: '#222', fontWeight: 600, marginBottom: 3 }}>模拟接口报错</label>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 500, userSelect: 'none', height: 36, cursor: 'pointer' }}>
                <span style={{ position: 'relative', display: 'inline-block', width: 38, height: 22, marginRight: 8 }}>
                  <input
                    type="checkbox"
                    checked={errorMode}
                    onChange={e => setErrorMode(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: errorMode ? '#2563eb' : '#e5e7eb',
                    borderRadius: 12,
                    transition: 'background 0.2s',
                    boxShadow: errorMode ? '0 0 2px #2563eb88' : 'none',
                  }}></span>
                  <span style={{
                    position: 'absolute',
                    left: errorMode ? 18 : 2,
                    top: 2,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 1px 3px #0001',
                    transition: 'left 0.2s',
                    border: '1px solid #e5e7eb',
                  }}></span>
                </span>
                <span style={{ color: errorMode ? '#2563eb' : '#888', fontWeight: 600 }}>{errorMode ? '已开启' : '关闭'}</span>
              </label>
            </div>
          </div>
          <div style={{ color: '#888', fontSize: 12, marginTop: 7, textAlign: 'center' }}>
            请先配置下载链接和报错开关，再选择下方任意方式进行测试。
          </div>
        </div>

        {/* 演示区 */}
        <div style={{ display: 'flex', gap: 10, width: '100%', justifyContent: 'center', alignItems: 'stretch', marginBottom: 14 }}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 4, boxShadow: '0 1px 4px #0001', padding: 10, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 150 }}>
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>a标签 href/download</div>
            <button onClick={handleHrefDownload} style={{ padding: '7px 18px', borderRadius: 4, border: '1.5px solid #2563eb', background: '#2563eb', color: '#fff', cursor: 'pointer', marginTop: 4, fontSize: 14, fontWeight: 600, marginBottom: 6, height: 36, minWidth: 70 }}>
              下载
            </button>
            <a ref={aRef} style={{ display: 'none' }} download href={url}>下载</a>
            <div style={{ color: '#888', fontSize: 12, marginTop: 2, textAlign: 'center', lineHeight: 1.5 }}>
              浏览器原生下载，接口报错时页面可能跳转或下载错误内容，无法拦截。
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 4, boxShadow: '0 1px 4px #0001', padding: 10, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 150 }}>
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>window.open</div>
            <button onClick={handleOpenDownload} style={{ padding: '7px 18px', borderRadius: 4, border: '1.5px solid #2563eb', background: '#2563eb', color: '#fff', cursor: 'pointer', marginTop: 4, fontSize: 14, fontWeight: 600, marginBottom: 6, height: 36, minWidth: 70 }}>
              下载
            </button>
            <div style={{ color: '#888', fontSize: 12, marginTop: 2, textAlign: 'center', lineHeight: 1.5 }}>
              新窗口下载，接口报错时会跳转到错误页面，无法拦截。<br />
              <span style={{ color: '#f59e42', fontWeight: 500 }}>体验适中（不会影响当前页面）</span>
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 4, boxShadow: '0 1px 4px #0001', padding: 10, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 150 }}>
            <div style={{ color: '#059669', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>fetch + Blob</div>
            <button onClick={handleFetchDownload} disabled={downloading} style={{ padding: '7px 18px', borderRadius: 4, border: '1.5px solid #059669', background: downloading ? '#a7f3d0' : '#059669', color: '#fff', cursor: downloading ? 'not-allowed' : 'pointer', marginTop: 4, fontSize: 14, fontWeight: 600, marginBottom: 6, height: 36, minWidth: 70 }}>
              {downloading ? '下载中...' : '下载'}
            </button>
            <div style={{ color: '#888', fontSize: 12, marginTop: 2, textAlign: 'center', lineHeight: 1.5 }}>
              推荐方式，可拦截接口报错并友好提示。<br />
              <span style={{ color: '#b91c1c', fontWeight: 500 }}>如目标服务器未设置CORS，fetch方式会报错。</span>
            </div>
          </div>
        </div>

        {/* 统一提示区，放在对比表格上方 */}
        {message && <div style={{ background: '#fef3c7', color: '#b45309', padding: '12px 18px', borderRadius: 6, fontSize: 15, maxWidth: 500, margin: '0 auto 18px auto', textAlign: 'center', border: '1px solid #fde68a' }}>{message}</div>}

        {/* 对比表格，默认折叠，点击展开 */}
        <div style={{ maxWidth: 700, width: '100%', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, padding: 0, marginBottom: 18, overflow: 'hidden', transition: 'max-height 0.3s' }}>
          <button
            onClick={() => setShowCompare(v => !v)}
            style={{ width: '100%', background: 'none', border: 'none', color: '#888', fontWeight: 500, fontSize: 13, padding: '8px 0', cursor: 'pointer', outline: 'none', borderRadius: 0, marginBottom: showCompare ? 8 : 0, transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
            onMouseOut={e => e.currentTarget.style.background = 'none'}
          >
            {showCompare ? '收起对比' : '展开对比'}
          </button>
          {showCompare && (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'center', marginTop: 0 }}>
              <thead>
                <tr style={{ color: '#2563eb', fontWeight: 700, fontSize: 15 }}>
                  <th></th>
                  <th>a标签 href</th>
                  <th>window.open</th>
                  <th>fetch + Blob</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ color: '#888' }}>可拦截错误</td>
                  <td>✗</td>
                  <td>✗</td>
                  <td style={{ color: '#059669' }}>✓</td>
                </tr>
                <tr>
                  <td style={{ color: '#888' }}>受CORS影响</td>
                  <td>✗</td>
                  <td>✗</td>
                  <td style={{ color: '#b91c1c' }}>✓</td>
                </tr>
                <tr>
                  <td style={{ color: '#888' }}>用户体验</td>
                  <td>原生下载/跳转</td>
                  <td style={{ color: '#f59e42' }}>新窗口跳转（适中）</td>
                  <td style={{ color: '#059669' }}>友好可控</td>
                </tr>
                <tr>
                  <td style={{ color: '#888' }}>支持自定义文件名</td>
                  <td>部分支持（需download属性）</td>
                  <td>✗</td>
                  <td style={{ color: '#059669' }}>✓</td>
                </tr>
                <tr>
                  <td style={{ color: '#888' }}>兼容性</td>
                  <td>极好</td>
                  <td>极好</td>
                  <td>现代浏览器</td>
                </tr>
                <tr>
                  <td style={{ color: '#888' }}>支持大文件</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td style={{ color: '#888' }}>支持进度/反馈</td>
                  <td>✗</td>
                  <td>✗</td>
                  <td style={{ color: '#059669' }}>✓（可实现进度条）</td>
                </tr>
                <tr>
                  <td style={{ color: '#888' }}>实现复杂度</td>
                  <td>最低</td>
                  <td>低</td>
                  <td>略高</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: 24, color: '#aaa', fontSize: 13, textAlign: 'center', letterSpacing: 1, marginBottom: 8 }}>
          © 下载方式兼容性演示 | React + Vite
        </div>
      </div>
    </div>
  );
}

export default App;
