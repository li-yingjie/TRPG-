import React, { useState } from 'react';
import { listSaves, writeSave, loadSave, formatSaveTime, SLOT_AUTO, SLOT_1, SLOT_2 } from '../utils/save.js';
export { SettingsPanel };

// 从 localStorage 读取字体设置，带默认值
export function loadFontSettings() {
  try {
    const raw = localStorage.getItem('calatia_settings');
    const s = raw ? JSON.parse(raw) : {};
    return {
      fontSize:   s.fontSize   ?? 15,
      lineHeight: s.lineHeight ?? 1.6,
    };
  } catch (e) {
    return { fontSize: 17, lineHeight: 1.6 };
  }
}

function saveFontSettings(s) {
  localStorage.setItem('calatia_settings', JSON.stringify(s));
}

// 将字体设置写入 CSS 变量（在 App 挂载时也调用一次）
export function applyFontSettings({ fontSize, lineHeight }) {
  document.documentElement.style.setProperty('--font-size-base', fontSize + 'px');
  document.documentElement.style.setProperty('--line-height-base', lineHeight);
}

function SettingsPanel({ gs, onClose, onNewGame, onLoad }) {
  const [confirm, setConfirm] = useState(false);
  const [font, setFont] = useState(() => loadFontSettings());
  const saves = listSaves();

  const updateFont = (patch) => {
    const next = { ...font, ...patch };
    setFont(next);
    saveFontSettings(next);
    applyFontSettings(next);
  };

  const FONT_SIZES   = [13, 14, 15, 16, 17, 18];
  const LINE_HEIGHTS = [1.4, 1.5, 1.6, 1.7, 1.8, 2.0];

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()}>

        {/* 标题 */}
        <div className="settings-header">
          <span className="settings-title">设置</span>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>

        <div className="settings-body">

          {/* ── 游戏 ── */}
          <div className="settings-section">
            <div className="settings-section-title">游戏</div>

            {!confirm ? (
              <button className="settings-row-btn settings-danger-btn" onClick={() => setConfirm(true)}>
                🔄 开始新游戏
              </button>
            ) : (
              <div className="settings-confirm-box">
                <div className="settings-confirm-text">当前进度不会自动保存，确认开始新游戏？</div>
                <div className="settings-confirm-row">
                  <button className="save-btn save-btn-del" onClick={() => { onNewGame(); onClose(); }}>确认</button>
                  <button className="save-btn save-btn-load" onClick={() => setConfirm(false)}>取消</button>
                </div>
              </div>
            )}
          </div>

          {/* ── 字体 ── */}
          <div className="settings-section">
            <div className="settings-section-title">字体</div>

            <div className="settings-row">
              <span className="settings-row-label">字体大小</span>
              <div className="settings-stepper">
                <button
                  className="settings-step-btn"
                  disabled={font.fontSize <= FONT_SIZES[0]}
                  onClick={() => updateFont({ fontSize: FONT_SIZES[Math.max(0, FONT_SIZES.indexOf(font.fontSize) - 1)] })}
                >◀</button>
                <span className="settings-step-val">{font.fontSize}</span>
                <button
                  className="settings-step-btn"
                  disabled={font.fontSize >= FONT_SIZES[FONT_SIZES.length - 1]}
                  onClick={() => updateFont({ fontSize: FONT_SIZES[Math.min(FONT_SIZES.length - 1, FONT_SIZES.indexOf(font.fontSize) + 1)] })}
                >▶</button>
              </div>
            </div>

            <div className="settings-row">
              <span className="settings-row-label">字行间距</span>
              <div className="settings-stepper">
                <button
                  className="settings-step-btn"
                  disabled={font.lineHeight <= LINE_HEIGHTS[0]}
                  onClick={() => updateFont({ lineHeight: LINE_HEIGHTS[Math.max(0, LINE_HEIGHTS.indexOf(font.lineHeight) - 1)] })}
                >◀</button>
                <span className="settings-step-val">{font.lineHeight}</span>
                <button
                  className="settings-step-btn"
                  disabled={font.lineHeight >= LINE_HEIGHTS[LINE_HEIGHTS.length - 1]}
                  onClick={() => updateFont({ lineHeight: LINE_HEIGHTS[Math.min(LINE_HEIGHTS.length - 1, LINE_HEIGHTS.indexOf(font.lineHeight) + 1)] })}
                >▶</button>
              </div>
            </div>

            <div className="settings-preview-text">
              伴随着洪亮的管乐器吹奏声，一个男人向着万人瞩目的高台缓步拾级而上。他冉冉屈膝，跪在国王跟前。
            </div>

            <button className="settings-row-btn" onClick={() => updateFont({ fontSize: 17, lineHeight: 1.6 })}>
              重置字体
            </button>
          </div>

          {/* ── 存档 ── */}
          <div className="settings-section">
            <div className="settings-section-title">存档</div>
            {saves.filter(s => !s.empty).map(s => (
              <div key={s.slot} className="settings-save-row">
                <div className="settings-save-info">
                  <span className="settings-save-label">{s.slot === 0 ? '自动存档' : `存档 ${s.slot}`}</span>
                  <span className="settings-save-meta">{s.name} Lv.{s.level} · {formatSaveTime(s.savedAt)}</span>
                </div>
                <button className="save-btn save-btn-load" onClick={() => { onLoad(s.gs); onClose(); }}>读取</button>
              </div>
            ))}
            {saves.every(s => s.empty) && (
              <div className="settings-empty">暂无存档</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
