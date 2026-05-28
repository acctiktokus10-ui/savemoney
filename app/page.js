"use client";
import { useState, useEffect } from "react";

/* ─────────────────────────── STYLES ─────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --red:       #7c3aed;
  --red-deep:  #6d28d9;
  --red-soft:  #f5f3ff;
  --red-glow:  rgba(124,58,237,0.22);
  --orange:    #a78bfa;
  --yellow:    #c4b5fd;
  --green:     #2e7d32;
  --green-bg:  #f1faf2;
  --err:       #c62828;
  --err-bg:    #fff5f5;
  --white:     #ffffff;
  --bg:        #f3f0ff;
  --border:    #e8e8e8;
  --text:      #212121;
  --muted:     #9e9e9e;
  --card-shadow: 0 4px 32px rgba(124,58,237,0.10);
}

html, body { height: 100%; }
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

/* ── HEADER ── */
.header {
  background: var(--red);
  padding: 0 24px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px var(--red-glow);
  position: sticky; top: 0; z-index: 100;
}
.header-brand {
  font-family: 'Lexend', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: -0.3px;
}
.header-brand .dot {
  width: 8px; height: 8px;
  background: var(--yellow);
  border-radius: 50%;
  animation: pulse 1.8s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { transform: scale(1); opacity:1; }
  50% { transform: scale(1.5); opacity:0.7; }
}
.header-user {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 5px 14px 5px 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.header-user:hover { background: rgba(255,255,255,0.25); }
.header-avatar {
  width: 28px; height: 28px;
  background: var(--yellow);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem; font-weight: 700; color: #8B4513;
}
.header-name {
  font-size: 0.85rem; color: #fff; font-weight: 500;
  max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

/* ── LOGIN SCREEN ── */
.login-wrap {
  min-height: calc(100vh - 58px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px 16px;
  background: linear-gradient(145deg, #f5f3ff 0%, #ede9fe 60%, #f3f0ff 100%);
}
.login-card {
  background: var(--white);
  border-radius: 20px;
  box-shadow: var(--card-shadow);
  padding: 40px 36px 36px;
  width: 100%;
  max-width: 420px;
  animation: fadeUp 0.4s ease both;
}
@keyframes fadeUp {
  from { opacity:0; transform: translateY(20px); }
  to   { opacity:1; transform: none; }
}
.login-icon {
  width: 64px; height: 64px;
  background: linear-gradient(135deg, var(--red), var(--orange));
  border-radius: 18px;
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem;
  margin: 0 auto 20px;
  box-shadow: 0 6px 20px var(--red-glow);
}
.login-title {
  font-family: 'Lexend', sans-serif;
  font-size: 1.5rem; font-weight: 800;
  text-align: center; color: var(--text);
  margin-bottom: 6px;
}
.login-subtitle {
  text-align: center; color: var(--muted);
  font-size: 0.88rem; margin-bottom: 28px; line-height: 1.5;
}
.login-subtitle strong { color: var(--red); }

.field-label {
  font-size: 0.82rem; font-weight: 600; color: #555;
  margin-bottom: 7px; display: block; letter-spacing: 0.2px;
}
.field-hint {
  font-size: 0.78rem; color: var(--muted);
  margin-top: 6px; line-height: 1.5;
}
.field-hint code {
  background: var(--red-soft); color: var(--red);
  padding: 1px 6px; border-radius: 4px;
  font-family: 'Lexend', monospace; font-size: 0.8rem;
}

input[type="text"] {
  width: 100%;
  padding: 13px 16px;
  border: 2px solid var(--border);
  border-radius: 12px;
  font-family: 'Lexend', sans-serif;
  font-size: 0.97rem; font-weight: 500;
  color: var(--text);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fafafa;
  letter-spacing: 0.3px;
}
input[type="text"]:focus {
  border-color: var(--red);
  background: #fff;
  box-shadow: 0 0 0 3px var(--red-glow);
}
input[type="text"]::placeholder { color: #ccc; font-weight: 400; }

.input-error { border-color: var(--err) !important; }
.error-text { font-size: 0.8rem; color: var(--err); margin-top: 6px; }

.btn-primary {
  width: 100%; padding: 14px;
  background: linear-gradient(135deg, var(--red), var(--orange));
  color: #fff; border: none; border-radius: 12px;
  font-family: 'Lexend', sans-serif;
  font-size: 1rem; font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 18px var(--red-glow);
  margin-top: 20px;
  letter-spacing: 0.2px;
}
.btn-primary:hover:not(:disabled) { opacity:0.92; transform: translateY(-1px); box-shadow: 0 6px 24px var(--red-glow); }
.btn-primary:active:not(:disabled) { transform: none; }
.btn-primary:disabled { opacity:0.5; cursor:not-allowed; }

/* ── MAIN APP ── */
.app-wrap {
  max-width: 700px;
  margin: 32px auto 60px;
  padding: 0 16px;
  animation: fadeUp 0.35s ease both;
}

.welcome-banner {
  background: linear-gradient(135deg, var(--red) 0%, var(--orange) 100%);
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 20px;
  display: flex; align-items: center; gap: 16px;
  box-shadow: 0 4px 20px var(--red-glow);
}
.welcome-emoji { font-size: 2.2rem; }
.welcome-text h2 {
  font-family: 'Lexend', sans-serif;
  font-weight: 700; font-size: 1.1rem; color: #fff;
  margin-bottom: 3px;
}
.welcome-text p { font-size: 0.85rem; color: rgba(255,255,255,0.82); }

.card {
  background: var(--white);
  border-radius: 16px;
  box-shadow: var(--card-shadow);
  padding: 28px 24px;
  margin-bottom: 16px;
}
.card-title {
  font-family: 'Lexend', sans-serif;
  font-size: 1rem; font-weight: 700;
  color: var(--text); margin-bottom: 4px;
  display: flex; align-items: center; gap: 8px;
}
.card-desc { font-size: 0.83rem; color: var(--muted); margin-bottom: 18px; }

.textarea-wrap { position: relative; }
textarea {
  width: 100%;
  min-height: 120px;
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 13px 14px 36px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem; line-height: 1.65;
  color: var(--text);
  resize: vertical; outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fafafa;
}
textarea:focus {
  border-color: var(--red); background: #fff;
  box-shadow: 0 0 0 3px var(--red-glow);
}
textarea::placeholder { color: #ccc; }
.ta-counter {
  position: absolute; bottom: 10px; right: 12px;
  font-size: 0.75rem; color: var(--muted);
}

.btn-convert {
  width: 100%; margin-top: 12px;
  padding: 14px;
  background: linear-gradient(135deg, var(--red), var(--orange));
  color: #fff; border: none; border-radius: 12px;
  font-family: 'Lexend', sans-serif;
  font-size: 1rem; font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  box-shadow: 0 4px 18px var(--red-glow);
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-convert:hover:not(:disabled) { opacity:0.92; transform: translateY(-1px); }
.btn-convert:disabled { opacity:0.5; cursor:not-allowed; }

.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── RESULTS ── */
.results { margin-top: 16px; display: flex; flex-direction: column; gap: 12px; }
.result-card {
  border-radius: 12px;
  overflow: hidden;
  animation: fadeUp 0.3s ease both;
}
.result-card.ok { border: 1.5px solid #a5d6a7; }
.result-card.err { border: 1.5px solid #ef9a9a; }

.result-head {
  padding: 9px 14px;
  font-size: 0.8rem; font-weight: 600;
  display: flex; align-items: center; gap: 8px;
}
.result-card.ok .result-head { background: var(--green-bg); color: var(--green); }
.result-card.err .result-head { background: var(--err-bg); color: var(--err); }

.result-input-url {
  font-weight: 400; color: var(--muted);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  max-width: 260px;
}

.result-body { padding: 12px 14px; background: #fff; }
.result-lbl { font-size: 0.78rem; color: var(--muted); margin-bottom: 5px; }
.result-link {
  font-size: 0.8rem; color: #1565c0;
  word-break: break-all; line-height: 1.5;
  background: #f3f7ff; border-radius: 6px;
  padding: 8px 10px; margin-bottom: 10px;
}
.result-err { font-size: 0.85rem; color: var(--err); }

.btn-copy {
  padding: 8px 16px;
  background: var(--green-bg);
  border: 1.5px solid #a5d6a7;
  color: var(--green);
  border-radius: 8px;
  font-family: 'Lexend', sans-serif; font-weight: 600; font-size: 0.82rem;
  cursor: pointer; transition: background 0.15s;
}
.btn-copy:hover { background: #d8f0db; }
.btn-copy.done { background: var(--green); color: #fff; border-color: var(--green); }

/* ── HOW TO ── */
.steps { display: flex; flex-direction: column; gap: 12px; }
.step {
  display: flex; gap: 14px; align-items: flex-start;
}
.step-num {
  min-width: 30px; height: 30px;
  background: linear-gradient(135deg, var(--red), var(--orange));
  color: #fff; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Lexend', sans-serif; font-weight: 700; font-size: 0.85rem;
}
.step-content { flex: 1; }
.step-title { font-weight: 600; font-size: 0.9rem; color: var(--text); margin-bottom: 3px; }
.step-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.5; }

/* ── LOGOUT ── */
.btn-logout {
  background: transparent; border: 1.5px solid rgba(255,255,255,0.5);
  color: #fff; border-radius: 8px;
  padding: 5px 12px; font-size: 0.8rem; font-weight: 600;
  cursor: pointer; transition: background 0.15s;
  font-family: 'Lexend', sans-serif;
}
.btn-logout:hover { background: rgba(255,255,255,0.2); }
`;

/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function App() {
  const [user, setUser]       = useState(null);
  const [loginVal, setLoginVal] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [input, setInput]     = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState({});

  // Validate: chữ + số, phải kết thúc bằng 5 chữ số
  function validateUsername(v) {
    return /^[a-zA-Z0-9_\.]+\d{5}$/.test(v.trim());
  }

  function handleLogin() {
    const v = loginVal.trim();
    if (!v) { setLoginErr("Vui lòng nhập tên tài khoản"); return; }
    if (!validateUsername(v)) {
      setLoginErr("Tên không đúng định dạng. Ví dụ: thanhthao96474 (tên + 5 số cuối SĐT)");
      return;
    }
    setLoginErr("");
    setUser(v);
  }

  const links = input.split("\n").map(l => l.trim()).filter(Boolean);

  async function handleConvert() {
    if (!links.length || !user) return;
    setLoading(true); setResults([]);
    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links, subId: user }),
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([{ success: false, error: "Lỗi kết nối, thử lại nhé!" }]);
    }
    setLoading(false);
  }

  function copyLink(text, i) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(c => ({ ...c, [i]: true }));
      setTimeout(() => setCopied(c => ({ ...c, [i]: false })), 2200);
    });
  }

  function copyAll() {
    const all = results.filter(r => r.success).map(r => r.affiliateLink).join("\n");
    navigator.clipboard.writeText(all);
  }

  /* ── LOGIN ── */
  if (!user) return (
    <>
      <style>{css}</style>
      <div className="header">
        <div className="header-brand">
          <span>🛍️</span> Hoàn Hoa Hồng
          <div className="dot" />
        </div>
      </div>
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-icon">🎁</div>
          <div className="login-title">Đăng nhập</div>
          <div className="login-subtitle">
            Nhập tên tài khoản Shopee để nhận<br/>
            <strong>link hoàn tiền</strong> khi mua hàng
          </div>

          <label className="field-label">Tên tài khoản Shopee</label>
          <input
            type="text"
            className={loginErr ? "input-error" : ""}
            value={loginVal}
            onChange={e => { setLoginVal(e.target.value); setLoginErr(""); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="vd: thanhthao96474"
            autoFocus
          />
          {loginErr && <div className="error-text">⚠️ {loginErr}</div>}
          <div className="field-hint">
            Nhập theo cú pháp: <code>tên + 5 số cuối SĐT</code><br/>
            Ví dụ: <code>thanhthao96474</code>
          </div>

          <button className="btn-primary" onClick={handleLogin} disabled={!loginVal.trim()}>
            Vào ngay →
          </button>
        </div>
      </div>
    </>
  );

  /* ── MAIN APP ── */
  const successCount = results.filter(r => r.success).length;

  return (
    <>
      <style>{css}</style>
      <div className="header">
        <div className="header-brand">
          <span>🛍️</span> Hoàn Hoa Hồng
          <div className="dot" />
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div className="header-user">
            <div className="header-avatar">{user[0].toUpperCase()}</div>
            <span className="header-name">{user}</span>
          </div>
          <button className="btn-logout" onClick={() => { setUser(null); setResults([]); setInput(""); }}>
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="app-wrap">
        <div className="welcome-banner">
          <div className="welcome-emoji">💰</div>
          <div className="welcome-text">
            <h2>Xin chào, {user}!</h2>
            <p>Dán link Shopee vào bên dưới để tạo link hoàn tiền cho bạn</p>
          </div>
        </div>

        <div className="card">
          <div className="card-title">🔗 Chuyển link Shopee</div>
          <div className="card-desc">Mỗi dòng 1 link — tối đa 10 link một lần</div>

          <div className="textarea-wrap">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={"https://shopee.vn/product/...\nhttps://shp.ee/abc123\nhttps://s.shopee.vn/..."}
            />
            <span className="ta-counter">{links.length}/10</span>
          </div>

          <button
            className="btn-convert"
            onClick={handleConvert}
            disabled={loading || !links.length || links.length > 10}
          >
            {loading
              ? <><div className="spinner" /> Đang xử lý...</>
              : "⚡ Tạo Link Hoàn Tiền"}
          </button>

          {results.length > 0 && (
            <>
              {successCount > 1 && (
                <button
                  onClick={copyAll}
                  style={{
                    marginTop:10, width:"100%", padding:"9px",
                    background:"#f0faf3", border:"1.5px solid #2e7d32",
                    color:"#2e7d32", borderRadius:8,
                    fontFamily:"'Lexend',sans-serif", fontWeight:600, fontSize:"0.85rem",
                    cursor:"pointer"
                  }}
                >
                  📋 Sao chép tất cả {successCount} link
                </button>
              )}
              <div className="results">
                {results.map((r, i) => (
                  <div key={i} className={`result-card ${r.success ? "ok" : "err"}`} style={{ animationDelay:`${i*50}ms` }}>
                    <div className="result-head">
                      {r.success ? "✅ Thành công" : "❌ Lỗi"}
                      <span className="result-input-url">{r.input}</span>
                    </div>
                    <div className="result-body">
                      {r.success ? (
                        <>
                          <div className="result-lbl">Link hoàn tiền của bạn:</div>
                          <div className="result-link">{r.affiliateLink}</div>
                          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                            <button
                              className={`btn-copy ${copied[i] ? "done" : ""}`}
                              onClick={() => copyLink(r.affiliateLink, i)}
                            >
                              {copied[i] ? "✓ Đã sao chép!" : "📋 Sao chép link"}
                            </button>
                            <a
                              href={r.affiliateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding:"8px 16px",
                                background:"linear-gradient(135deg, var(--red), var(--orange))",
                                color:"#fff",
                                borderRadius:8,
                                fontFamily:"'Lexend',sans-serif",
                                fontWeight:600,
                                fontSize:"0.82rem",
                                textDecoration:"none",
                                display:"inline-flex",
                                alignItems:"center",
                                gap:5,
                              }}
                            >
                              🛒 Mua ngay
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="result-err">⚠️ {r.error}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="card">
          <div className="card-title">📖 Hướng dẫn sử dụng</div>
          <div className="card-desc" style={{marginBottom:16}}>3 bước đơn giản để nhận hoàn tiền</div>
          <div className="steps">
            {[
              ["Sao chép link sản phẩm", "Mở app Shopee, tìm sản phẩm muốn mua → nhấn Chia sẻ → sao chép link"],
              ["Dán vào đây & chuyển đổi", "Dán link vào ô trên, nhấn \"Tạo Link Hoàn Tiền\""],
              ["Mua hàng qua link mới", "Sao chép link hoàn tiền vừa tạo, mở trên trình duyệt và đặt hàng bình thường"],
            ].map(([t, d], i) => (
              <div className="step" key={i}>
                <div className="step-num">{i+1}</div>
                <div className="step-content">
                  <div className="step-title">{t}</div>
                  <div className="step-desc">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
