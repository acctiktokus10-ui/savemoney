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

input[type="text"], input[type="tel"], input[type="number"] {
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
input[type="text"]:focus, input[type="tel"]:focus, input[type="number"]:focus {
  border-color: var(--red);
  background: #fff;
  box-shadow: 0 0 0 3px var(--red-glow);
}
input::placeholder { color: #ccc; font-weight: 400; }

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

/* ── BOTTOM NAV ── */
.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #fff;
  border-top: 1.5px solid var(--border);
  display: flex;
  z-index: 200;
  box-shadow: 0 -4px 20px rgba(124,58,237,0.08);
}
.nav-item {
  flex: 1;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 8px 4px 10px;
  cursor: pointer;
  transition: background 0.15s;
  border: none; background: transparent;
  font-family: 'DM Sans', sans-serif;
  gap: 3px;
}
.nav-item:hover { background: var(--red-soft); }
.nav-icon { font-size: 1.35rem; line-height: 1; }
.nav-label {
  font-size: 0.7rem; font-weight: 600;
  color: var(--muted);
  font-family: 'Lexend', sans-serif;
  letter-spacing: 0.1px;
}
.nav-item.active .nav-label { color: var(--red); }
.nav-item.active .nav-icon { filter: none; }
.nav-active-dot {
  width: 4px; height: 4px;
  background: var(--red);
  border-radius: 50%;
}

/* ── MAIN APP ── */
.app-wrap {
  max-width: 700px;
  margin: 24px auto 90px;
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

/* ── WALLET ── */
.wallet-summary {
  background: linear-gradient(135deg, var(--red) 0%, var(--orange) 100%);
  border-radius: 16px;
  padding: 24px 24px 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px var(--red-glow);
  color: #fff;
}
.wallet-label {
  font-size: 0.82rem; opacity: 0.82; margin-bottom: 4px;
  font-family: 'Lexend', sans-serif;
}
.wallet-total {
  font-family: 'Lexend', sans-serif;
  font-size: 2rem; font-weight: 800;
  letter-spacing: -1px; margin-bottom: 16px;
}
.wallet-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
.wallet-stat {
  background: rgba(255,255,255,0.15);
  border-radius: 10px;
  padding: 10px 12px;
}
.wallet-stat-val {
  font-family: 'Lexend', sans-serif;
  font-weight: 700; font-size: 1rem;
  color: #fff; margin-bottom: 2px;
}
.wallet-stat-lbl {
  font-size: 0.72rem; color: rgba(255,255,255,0.78);
  line-height: 1.3;
}

.withdraw-btn {
  width: 100%; padding: 13px;
  background: #fff;
  color: var(--red);
  border: none; border-radius: 12px;
  font-family: 'Lexend', sans-serif;
  font-size: 0.95rem; font-weight: 700;
  cursor: pointer;
  margin-top: 14px;
  transition: opacity 0.2s, transform 0.15s;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.withdraw-btn:hover:not(:disabled) { opacity:0.92; transform: translateY(-1px); }
.withdraw-btn:disabled { opacity:0.5; cursor:not-allowed; }

.wallet-tabs {
  display: flex; gap: 8px;
  margin-bottom: 14px;
}
.wallet-tab {
  padding: 7px 16px;
  border-radius: 20px;
  border: 1.5px solid var(--border);
  background: #fff;
  font-family: 'Lexend', sans-serif;
  font-size: 0.8rem; font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s;
}
.wallet-tab.active {
  background: var(--red-soft);
  border-color: var(--red);
  color: var(--red);
}

.tx-list { display: flex; flex-direction: column; gap: 10px; }
.tx-item {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 16px;
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid var(--border);
  transition: box-shadow 0.15s;
}
.tx-item:hover { box-shadow: 0 2px 12px rgba(124,58,237,0.08); }
.tx-icon {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; flex-shrink: 0;
}
.tx-icon.pending  { background: #fff8e1; }
.tx-icon.done     { background: #e8f5e9; }
.tx-icon.withdraw { background: #e3f2fd; }
.tx-info { flex: 1; min-width: 0; }
.tx-title {
  font-family: 'Lexend', sans-serif;
  font-weight: 600; font-size: 0.88rem; color: var(--text);
  margin-bottom: 2px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.tx-date { font-size: 0.75rem; color: var(--muted); }
.tx-note { font-size: 0.72rem; color: #ff8f00; margin-top: 2px; }
.tx-amount {
  font-family: 'Lexend', sans-serif;
  font-weight: 700; font-size: 0.95rem;
  flex-shrink: 0;
  text-align: right;
}
.tx-amount.plus  { color: var(--green); }
.tx-amount.minus { color: #1565c0; }
.tx-badge {
  display: inline-block;
  font-size: 0.67rem; font-weight: 600;
  padding: 2px 7px; border-radius: 8px;
  font-family: 'Lexend', sans-serif;
  margin-top: 3px;
}
.badge-pending  { background: #fff8e1; color: #f57f17; }
.badge-done     { background: #e8f5e9; color: #2e7d32; }
.badge-withdraw { background: #e3f2fd; color: #1565c0; }
.badge-ready    { background: #f3e5f5; color: #7b1fa2; }

/* ── ORDERS ── */
.order-list { display: flex; flex-direction: column; gap: 12px; }
.order-item {
  background: #fff;
  border-radius: 14px;
  border: 1.5px solid var(--border);
  padding: 16px;
  transition: box-shadow 0.15s;
}
.order-item:hover { box-shadow: 0 2px 16px rgba(124,58,237,0.09); }
.order-head {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 10px;
}
.order-id {
  font-family: 'Lexend', sans-serif;
  font-size: 0.82rem; font-weight: 700; color: var(--text);
}
.order-date { font-size: 0.75rem; color: var(--muted); margin-top: 2px; }
.order-status {
  font-size: 0.72rem; font-weight: 700; padding: 3px 10px;
  border-radius: 10px; font-family: 'Lexend', sans-serif;
}
.status-processing { background: #fff8e1; color: #f57f17; }
.status-completed  { background: #e8f5e9; color: #2e7d32; }
.status-cancelled  { background: #fce4ec; color: #c62828; }

.order-product {
  display: flex; gap: 10px; align-items: center;
  padding: 10px; background: #fafafa; border-radius: 8px;
  margin-bottom: 10px;
}
.order-thumb {
  width: 44px; height: 44px; border-radius: 8px;
  background: var(--red-soft);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; flex-shrink: 0;
}
.order-name {
  font-size: 0.85rem; font-weight: 500; color: var(--text);
  line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden;
}
.order-foot {
  display: flex; justify-content: space-between; align-items: center;
}
.order-cashback-lbl { font-size: 0.78rem; color: var(--muted); }
.order-cashback-val {
  font-family: 'Lexend', sans-serif;
  font-weight: 700; font-size: 0.95rem; color: var(--green);
}
.order-link {
  font-size: 0.75rem; font-weight: 600; color: var(--red);
  text-decoration: none; font-family: 'Lexend', sans-serif;
}
.order-link:hover { text-decoration: underline; }

.empty-state {
  text-align: center; padding: 48px 24px;
}
.empty-icon { font-size: 3rem; margin-bottom: 12px; }
.empty-title {
  font-family: 'Lexend', sans-serif;
  font-size: 1rem; font-weight: 700; color: var(--text);
  margin-bottom: 6px;
}
.empty-desc { font-size: 0.84rem; color: var(--muted); line-height: 1.5; }

/* ── PROFILE ── */
.profile-header {
  display: flex; align-items: center; gap: 16px;
  background: linear-gradient(135deg, var(--red), var(--orange));
  border-radius: 16px; padding: 20px 22px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px var(--red-glow);
}
.profile-avatar-lg {
  width: 56px; height: 56px;
  background: rgba(255,255,255,0.25);
  border-radius: 50%; border: 2.5px solid rgba(255,255,255,0.5);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; font-weight: 700; color: #fff;
  font-family: 'Lexend', sans-serif;
  flex-shrink: 0;
}
.profile-info h3 {
  font-family: 'Lexend', sans-serif;
  font-weight: 700; font-size: 1rem; color: #fff;
  margin-bottom: 3px;
}
.profile-info p { font-size: 0.82rem; color: rgba(255,255,255,0.78); }

.form-group { margin-bottom: 18px; }
.form-label {
  font-size: 0.82rem; font-weight: 600; color: #555;
  margin-bottom: 7px; display: block; letter-spacing: 0.2px;
}
.form-note { font-size: 0.75rem; color: var(--muted); margin-top: 5px; }

.save-btn {
  width: 100%; padding: 13px;
  background: linear-gradient(135deg, var(--red), var(--orange));
  color: #fff; border: none; border-radius: 12px;
  font-family: 'Lexend', sans-serif;
  font-size: 0.95rem; font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  box-shadow: 0 4px 18px var(--red-glow);
  margin-top: 6px;
}
.save-btn:hover { opacity:0.92; transform: translateY(-1px); }
.save-btn:active { transform: none; }

.success-toast {
  background: var(--green-bg);
  border: 1.5px solid #a5d6a7;
  color: var(--green);
  padding: 11px 16px;
  border-radius: 10px;
  font-size: 0.85rem; font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Lexend', sans-serif;
  display: flex; align-items: center; gap: 8px;
}

/* ── WITHDRAW MODAL ── */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 500;
  display: flex; align-items: flex-end; justify-content: center;
  padding: 0;
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
.modal-sheet {
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 28px 24px 40px;
  width: 100%; max-width: 480px;
  animation: slideUp 0.3s ease;
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
.modal-title {
  font-family: 'Lexend', sans-serif;
  font-size: 1.1rem; font-weight: 800;
  color: var(--text); margin-bottom: 6px;
}
.modal-sub { font-size: 0.84rem; color: var(--muted); margin-bottom: 22px; }
.modal-row {
  display: flex; justify-content: space-between;
  padding: 10px 0; border-bottom: 1px solid var(--border);
  font-size: 0.88rem;
}
.modal-row:last-of-type { border-bottom: none; }
.modal-row-label { color: var(--muted); }
.modal-row-val { font-weight: 600; color: var(--text); font-family: 'Lexend', sans-serif; }
.modal-actions {
  display: flex; gap: 10px; margin-top: 22px;
}
.btn-cancel {
  flex: 1; padding: 12px;
  background: #f5f5f5; border: none; border-radius: 10px;
  font-family: 'Lexend', sans-serif; font-weight: 600; font-size: 0.9rem;
  color: var(--muted); cursor: pointer;
}
.btn-confirm {
  flex: 2; padding: 12px;
  background: linear-gradient(135deg, var(--red), var(--orange));
  border: none; border-radius: 10px;
  font-family: 'Lexend', sans-serif; font-weight: 700; font-size: 0.9rem;
  color: #fff; cursor: pointer;
  box-shadow: 0 3px 12px var(--red-glow);
}
`;

/* ── MOCK DATA ── */
const MOCK_ORDERS = [
  {
    id: "SPE-2024-001",
    date: "25/05/2024",
    product: "Áo thun nam basic oversize cổ tròn",
    status: "completed",
    cashback: 15000,
    link: "https://shopee.vn/product/123/456",
  },
  {
    id: "SPE-2024-002",
    date: "22/05/2024",
    product: "Giày thể thao nữ đế bằng phong cách Hàn Quốc",
    status: "processing",
    cashback: 32000,
    link: "https://shopee.vn/product/234/567",
  },
  {
    id: "SPE-2024-003",
    date: "18/05/2024",
    product: "Son môi lì velvet matte chống trôi 24h",
    status: "completed",
    cashback: 8500,
    link: "https://shopee.vn/product/345/678",
  },
  {
    id: "SPE-2024-004",
    date: "10/05/2024",
    product: "Balo laptop chống nước thời trang đi học",
    status: "cancelled",
    cashback: 0,
    link: "https://shopee.vn/product/456/789",
  },
];

const MOCK_TRANSACTIONS = [
  { id: 1, type: "done",     title: "Hoàn tiền đơn SPE-2024-001", date: "25/05/2024", amount: 15000,  canWithdraw: true,  note: "Có thể rút từ 27/05/2024" },
  { id: 2, type: "pending",  title: "Hoàn tiền đơn SPE-2024-002", date: "22/05/2024", amount: 32000,  canWithdraw: false, note: "Đang chờ xác nhận đơn hàng" },
  { id: 3, type: "done",     title: "Hoàn tiền đơn SPE-2024-003", date: "18/05/2024", amount: 8500,   canWithdraw: true,  note: "Có thể rút từ 20/05/2024" },
  { id: 4, type: "withdraw", title: "Rút tiền về tài khoản",       date: "15/05/2024", amount: -50000, canWithdraw: false, note: null },
];

function fmt(n) {
  return new Intl.NumberFormat("vi-VN").format(n) + "đ";
}

/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function App() {
  const [user, setUser]           = useState(null);
  const [loginVal, setLoginVal]   = useState("");
  const [loginErr, setLoginErr]   = useState("");
  const [tab, setTab]             = useState("convert");   // convert | orders | wallet | profile

  // Convert tab
  const [input, setInput]         = useState("");
  const [results, setResults]     = useState([]);
  const [loading, setLoading]     = useState(false);
  const [copied, setCopied]       = useState({});

  // Wallet tab
  const [walletFilter, setWalletFilter] = useState("all"); // all | pending | done | withdraw
  const [showWithdraw, setShowWithdraw] = useState(false);

  // Profile tab
  const [profile, setProfile]     = useState({ fullName: "", bankName: "", bankNumber: "", phone: "" });
  const [savedProfile, setSavedProfile] = useState(null);
  const [profileSaved, setProfileSaved] = useState(false);

  // Warm-up API
  useEffect(() => {
    fetch("/api/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ links: [], subId: "warmup" }),
    }).catch(() => {});
  }, []);

  // Load saved profile from localStorage
  useEffect(() => {
    if (!user) return;
    try {
      const saved = localStorage.getItem(`profile_${user}`);
      if (saved) {
        const p = JSON.parse(saved);
        setProfile(p);
        setSavedProfile(p);
      }
    } catch {}
  }, [user]);

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

  function handleLogout() {
    setUser(null);
    setResults([]);
    setInput("");
    setTab("convert");
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

  function saveProfile() {
    try { localStorage.setItem(`profile_${user}`, JSON.stringify(profile)); } catch {}
    setSavedProfile({ ...profile });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  // Wallet computed
  const readyAmt   = MOCK_TRANSACTIONS.filter(t => t.type === "done"    && t.canWithdraw).reduce((s,t) => s + t.amount, 0);
  const pendingAmt = MOCK_TRANSACTIONS.filter(t => t.type === "pending").reduce((s,t) => s + t.amount, 0);
  const totalAmt   = readyAmt + pendingAmt;

  const filteredTx = walletFilter === "all"
    ? MOCK_TRANSACTIONS
    : MOCK_TRANSACTIONS.filter(t => t.type === walletFilter);

  const txIcon = { pending: "⏳", done: "✅", withdraw: "💸" };

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

  const successCount = results.filter(r => r.success).length;

  return (
    <>
      <style>{css}</style>

      {/* HEADER */}
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
          <button className="btn-logout" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="app-wrap">

        {/* ── TAB: CONVERT ── */}
        {tab === "convert" && (
          <>
            <div className="welcome-banner">
              <div className="welcome-emoji">💰</div>
              <div className="welcome-text">
                <h2>Xin chào, {user}!</h2>
                <p>Dán link Shopee vào bên dưới để tạo link hoàn tiền</p>
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
                                    color:"#fff", borderRadius:8,
                                    fontFamily:"'Lexend',sans-serif", fontWeight:600, fontSize:"0.82rem",
                                    textDecoration:"none", display:"inline-flex", alignItems:"center", gap:5,
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
          </>
        )}

        {/* ── TAB: ORDERS ── */}
        {tab === "orders" && (
          <>
            <div className="card" style={{marginBottom:16}}>
              <div className="card-title">📦 Đơn hàng của bạn</div>
              <div className="card-desc">Theo dõi trạng thái hoàn tiền theo từng đơn</div>
            </div>

            {MOCK_ORDERS.length === 0 ? (
              <div className="card">
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <div className="empty-title">Chưa có đơn hàng</div>
                  <div className="empty-desc">Hãy tạo link hoàn tiền và mua hàng để đơn xuất hiện tại đây</div>
                </div>
              </div>
            ) : (
              <div className="order-list">
                {MOCK_ORDERS.map(order => (
                  <div className="order-item" key={order.id}>
                    <div className="order-head">
                      <div>
                        <div className="order-id">#{order.id}</div>
                        <div className="order-date">{order.date}</div>
                      </div>
                      <span className={`order-status status-${order.status}`}>
                        {order.status === "completed" ? "✅ Hoàn thành"
                          : order.status === "processing" ? "⏳ Đang xử lý"
                          : "❌ Đã huỷ"}
                      </span>
                    </div>

                    <div className="order-product">
                      <div className="order-thumb">🛍️</div>
                      <div className="order-name">{order.product}</div>
                    </div>

                    <div className="order-foot">
                      <div>
                        <div className="order-cashback-lbl">Hoàn tiền</div>
                        <div className="order-cashback-val">
                          {order.status === "cancelled" ? "—" : fmt(order.cashback)}
                        </div>
                      </div>
                      <a className="order-link" href={order.link} target="_blank" rel="noopener noreferrer">
                        Xem sản phẩm →
                      </a>
                    </div>

                    {order.status === "completed" && (
                      <div style={{
                        marginTop:10, padding:"7px 12px",
                        background:"#f3e5f5", borderRadius:8,
                        fontSize:"0.75rem", color:"#7b1fa2", fontWeight:600,
                        fontFamily:"'Lexend',sans-serif"
                      }}>
                        💜 Tiền đã vào ví — có thể rút sau 2 ngày kể từ ngày hoàn thành
                      </div>
                    )}
                    {order.status === "processing" && (
                      <div style={{
                        marginTop:10, padding:"7px 12px",
                        background:"#fff8e1", borderRadius:8,
                        fontSize:"0.75rem", color:"#f57f17", fontWeight:600,
                        fontFamily:"'Lexend',sans-serif"
                      }}>
                        ⏳ Đang chờ Shopee xác nhận đơn hàng...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── TAB: WALLET ── */}
        {tab === "wallet" && (
          <>
            {/* Balance card */}
            <div className="wallet-summary">
              <div className="wallet-label">Tổng số dư ví</div>
              <div className="wallet-total">{fmt(totalAmt)}</div>
              <div className="wallet-grid">
                <div className="wallet-stat">
                  <div className="wallet-stat-val">{fmt(readyAmt)}</div>
                  <div className="wallet-stat-lbl">Có thể rút ngay</div>
                </div>
                <div className="wallet-stat">
                  <div className="wallet-stat-val">{fmt(pendingAmt)}</div>
                  <div className="wallet-stat-lbl">Đang xử lý</div>
                </div>
                <div className="wallet-stat">
                  <div className="wallet-stat-val">{fmt(50000)}</div>
                  <div className="wallet-stat-lbl">Đã rút</div>
                </div>
              </div>
              <button
                className="withdraw-btn"
                disabled={readyAmt === 0}
                onClick={() => setShowWithdraw(true)}
              >
                💸 Rút tiền ngay {readyAmt > 0 ? `(${fmt(readyAmt)})` : ""}
              </button>
            </div>

            {/* Note */}
            <div style={{
              padding:"12px 16px", background:"#fff8e1",
              border:"1.5px solid #ffe082", borderRadius:12,
              fontSize:"0.8rem", color:"#795548", lineHeight:1.5,
              marginBottom:16, fontWeight:500,
            }}>
              ℹ️ <strong>Lưu ý:</strong> Tiền được hoàn sau khi đơn hoàn thành. Bạn có thể rút về tài khoản ngân hàng <strong>2 ngày sau khi đơn được xác nhận hoàn thành</strong>.
            </div>

            {/* Filter tabs */}
            <div className="wallet-tabs">
              {[
                { key:"all",      label:"Tất cả" },
                { key:"pending",  label:"⏳ Đang xử lý" },
                { key:"done",     label:"✅ Đã hoàn" },
                { key:"withdraw", label:"💸 Đã rút" },
              ].map(f => (
                <button
                  key={f.key}
                  className={`wallet-tab ${walletFilter === f.key ? "active" : ""}`}
                  onClick={() => setWalletFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Transaction list */}
            {filteredTx.length === 0 ? (
              <div className="card">
                <div className="empty-state">
                  <div className="empty-icon">💳</div>
                  <div className="empty-title">Không có giao dịch</div>
                  <div className="empty-desc">Chưa có giao dịch nào trong mục này</div>
                </div>
              </div>
            ) : (
              <div className="tx-list">
                {filteredTx.map(tx => (
                  <div className="tx-item" key={tx.id}>
                    <div className={`tx-icon ${tx.type}`}>{txIcon[tx.type]}</div>
                    <div className="tx-info">
                      <div className="tx-title">{tx.title}</div>
                      <div className="tx-date">{tx.date}</div>
                      {tx.note && <div className="tx-note">📌 {tx.note}</div>}
                      <div>
                        {tx.type === "pending"  && <span className="tx-badge badge-pending">Đang xử lý</span>}
                        {tx.type === "done" && tx.canWithdraw && <span className="tx-badge badge-ready">Có thể rút</span>}
                        {tx.type === "done" && !tx.canWithdraw && <span className="tx-badge badge-done">Đã hoàn</span>}
                        {tx.type === "withdraw" && <span className="tx-badge badge-withdraw">Đã rút</span>}
                      </div>
                    </div>
                    <div>
                      <div className={`tx-amount ${tx.amount > 0 ? "plus" : "minus"}`}>
                        {tx.amount > 0 ? "+" : ""}{fmt(Math.abs(tx.amount))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── TAB: PROFILE ── */}
        {tab === "profile" && (
          <>
            <div className="profile-header">
              <div className="profile-avatar-lg">{user[0].toUpperCase()}</div>
              <div className="profile-info">
                <h3>{savedProfile?.fullName || user}</h3>
                <p>Tài khoản Shopee: {user}</p>
              </div>
            </div>

            {profileSaved && (
              <div className="success-toast">✅ Đã lưu thông tin thành công!</div>
            )}

            <div className="card">
              <div className="card-title">👤 Thông tin cá nhân</div>
              <div className="card-desc">Điền thông tin để nhận tiền hoàn về tài khoản của bạn</div>

              <div className="form-group">
                <label className="form-label">Họ và tên</label>
                <input
                  type="text"
                  placeholder="Nguyễn Thị Thanh Thảo"
                  value={profile.fullName}
                  onChange={e => setProfile(p => ({ ...p, fullName: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="tel"
                  placeholder="0912 345 678"
                  value={profile.phone}
                  onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                />
              </div>
            </div>

            <div className="card">
              <div className="card-title">🏦 Tài khoản ngân hàng</div>
              <div className="card-desc">Dùng để nhận tiền hoàn khi bạn yêu cầu rút</div>

              <div className="form-group">
                <label className="form-label">Tên ngân hàng</label>
                <input
                  type="text"
                  placeholder="VD: Vietcombank, MB Bank, Techcombank..."
                  value={profile.bankName}
                  onChange={e => setProfile(p => ({ ...p, bankName: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Số tài khoản</label>
                <input
                  type="text"
                  placeholder="Nhập số tài khoản ngân hàng"
                  value={profile.bankNumber}
                  onChange={e => setProfile(p => ({ ...p, bankNumber: e.target.value.replace(/\D/g,"") }))}
                />
                <div className="form-note">⚠️ Kiểm tra kỹ trước khi lưu — tiền sẽ chuyển về số này</div>
              </div>

              <button
                className="save-btn"
                onClick={saveProfile}
                disabled={!profile.fullName.trim() || !profile.bankName.trim() || !profile.bankNumber.trim()}
              >
                💾 Lưu thông tin
              </button>
            </div>

            {/* Account info readonly */}
            <div className="card">
              <div className="card-title">🔒 Thông tin tài khoản</div>
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginTop:4 }}>
                {[
                  ["Tên đăng nhập", user],
                  ["Sub ID (tracking)", user],
                  ["Trạng thái", "✅ Đang hoạt động"],
                ].map(([lbl, val]) => (
                  <div key={lbl} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.88rem", borderBottom:"1px solid var(--border)", paddingBottom:10 }}>
                    <span style={{ color:"var(--muted)" }}>{lbl}</span>
                    <span style={{ fontWeight:600, fontFamily:"'Lexend',sans-serif", color:"var(--text)" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* BOTTOM NAVIGATION */}
      <nav className="bottom-nav">
        {[
          { key:"convert", icon:"🔗", label:"Chuyển Link" },
          { key:"orders",  icon:"📦", label:"Đơn Hàng" },
          { key:"wallet",  icon:"💰", label:"Ví Tiền" },
          { key:"profile", icon:"👤", label:"Thông Tin" },
        ].map(n => (
          <button
            key={n.key}
            className={`nav-item ${tab === n.key ? "active" : ""}`}
            onClick={() => setTab(n.key)}
          >
            <span className="nav-icon">{n.icon}</span>
            <span className="nav-label">{n.label}</span>
            {tab === n.key && <div className="nav-active-dot" />}
          </button>
        ))}
      </nav>

      {/* WITHDRAW MODAL */}
      {showWithdraw && (
        <div className="modal-overlay" onClick={() => setShowWithdraw(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-title">💸 Xác nhận rút tiền</div>
            <div className="modal-sub">Tiền sẽ được chuyển về tài khoản ngân hàng đã đăng ký</div>

            <div className="modal-row">
              <span className="modal-row-label">Số tiền rút</span>
              <span className="modal-row-val" style={{color:"var(--green)"}}>{fmt(readyAmt)}</span>
            </div>
            <div className="modal-row">
              <span className="modal-row-label">Tài khoản nhận</span>
              <span className="modal-row-val">
                {savedProfile?.bankNumber
                  ? `${savedProfile.bankName} — ${savedProfile.bankNumber}`
                  : <span style={{color:"var(--err)"}}>Chưa cập nhật</span>}
              </span>
            </div>
            <div className="modal-row">
              <span className="modal-row-label">Họ tên</span>
              <span className="modal-row-val">{savedProfile?.fullName || user}</span>
            </div>
            <div className="modal-row">
              <span className="modal-row-label">Thời gian xử lý</span>
              <span className="modal-row-val">1–3 ngày làm việc</span>
            </div>

            {!savedProfile?.bankNumber && (
              <div style={{
                marginTop:14, padding:"11px 14px",
                background:"#fff5f5", border:"1.5px solid #ef9a9a",
                borderRadius:10, fontSize:"0.82rem", color:"var(--err)",
                fontWeight:500, lineHeight:1.5
              }}>
                ⚠️ Bạn chưa có thông tin tài khoản ngân hàng. Vui lòng cập nhật trong tab <strong>Thông Tin</strong> trước khi rút.
              </div>
            )}

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowWithdraw(false)}>Huỷ</button>
              <button
                className="btn-confirm"
                disabled={!savedProfile?.bankNumber}
                onClick={() => {
                  setShowWithdraw(false);
                  alert("✅ Yêu cầu rút tiền đã gửi! Tiền sẽ về trong 1–3 ngày làm việc.");
                }}
              >
                Xác nhận rút tiền
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
