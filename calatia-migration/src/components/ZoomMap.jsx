import React, { useRef, useState, useCallback, useEffect } from 'react';
import mapUrl from '../map.png';
export { ZoomMap };

// Logical canvas width is fixed; height auto-fits the loaded image's aspect ratio.
// Node coords (wx/wy) are PERCENTAGES (0–100) relative to the map, so they
// stay valid regardless of which image file is used or its native resolution.
const MAP_W = 1000;
const DEFAULT_MAP_H = 558;
const MAX_ZOOM = 4.0;

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// Min zoom fills the viewport AND leaves overflow on both axes (1.15x safety),
// so the user can pan in both directions without ever exposing empty space.
function getMinZoom(vpW, vpH, mapH) {
  return Math.max(vpW / MAP_W, vpH / mapH) * 1.15;
}

function ZoomMap({ allNodes, gs, onClickNode }) {
  const vpRef = useRef(null);
  const imgRef = useRef(null);
  const zoomRef = useRef(1);
  const minZoomRef = useRef(1);
  const [mapH, setMapH] = useState(DEFAULT_MAP_H);
  const mapHRef = useRef(DEFAULT_MAP_H);
  const [zoom, _setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastMouse = useRef(null);
  const lastTouches = useRef(null);
  const lastPinchDist = useRef(null);

  const setZoom = useCallback((v) => {
    const nv = typeof v === 'function' ? v(zoomRef.current) : v;
    zoomRef.current = nv;
    _setZoom(nv);
  }, []);

  const clampPan = useCallback((px, py, z) => {
    const vp = vpRef.current;
    if (!vp) return { x: px, y: py };
    const vpW = vp.clientWidth;
    const vpH = vp.clientHeight;
    const mW = MAP_W * z;
    const mH = mapHRef.current * z;
    // Strict edge clamp: map always fills viewport, pan stays within bounds.
    return {
      x: mW >= vpW ? clamp(px, vpW - mW, 0) : (vpW - mW) / 2,
      y: mH >= vpH ? clamp(py, vpH - mH, 0) : (vpH - mH) / 2,
    };
  }, []);

  const zoomToward = useCallback((cx, cy, factor) => {
    const newZoom = clamp(zoomRef.current * factor, minZoomRef.current, MAX_ZOOM);
    const scale = newZoom / zoomRef.current;
    setPan(prevPan => {
      const nx = cx - scale * (cx - prevPan.x);
      const ny = cy - scale * (cy - prevPan.y);
      return clampPan(nx, ny, newZoom);
    });
    setZoom(newZoom);
  }, [clampPan, setZoom]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const rect = vpRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    zoomToward(cx, cy, factor);
  }, [zoomToward]);

  const handleMouseDown = useCallback((e) => {
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setPan(prev => clampPan(prev.x + dx, prev.y + dy, zoomRef.current));
  }, [clampPan]);

  const handleMouseUp = useCallback(() => { dragging.current = false; }, []);

  const handleTouchStart = useCallback((e) => {
    const touches = Array.from(e.touches);
    lastTouches.current = touches.map(t => ({ x: t.clientX, y: t.clientY }));
    if (touches.length === 2) {
      lastPinchDist.current = Math.hypot(
        touches[1].clientX - touches[0].clientX,
        touches[1].clientY - touches[0].clientY
      );
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const touches = Array.from(e.touches);
    const prev = lastTouches.current;
    if (!prev || prev.length === 0) return;
    if (touches.length === 1 && prev.length >= 1) {
      const dx = touches[0].clientX - prev[0].x;
      const dy = touches[0].clientY - prev[0].y;
      setPan(p => clampPan(p.x + dx, p.y + dy, zoomRef.current));
    } else if (touches.length === 2 && lastPinchDist.current) {
      const newDist = Math.hypot(
        touches[1].clientX - touches[0].clientX,
        touches[1].clientY - touches[0].clientY
      );
      const factor = clamp(newDist / lastPinchDist.current, 0.85, 1.18);
      const cx = (touches[0].clientX + touches[1].clientX) / 2;
      const cy = (touches[0].clientY + touches[1].clientY) / 2;
      const rect = vpRef.current.getBoundingClientRect();
      zoomToward(cx - rect.left, cy - rect.top, factor);
      lastPinchDist.current = newDist;
    }
    lastTouches.current = touches.map(t => ({ x: t.clientX, y: t.clientY }));
  }, [clampPan, zoomToward]);

  const handleTouchEnd = useCallback((e) => {
    lastTouches.current = Array.from(e.touches).map(t => ({ x: t.clientX, y: t.clientY }));
    if (e.touches.length < 2) lastPinchDist.current = null;
  }, []);

  useEffect(() => {
    const el = vpRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleWheel, handleTouchMove]);

  // Read image natural aspect ratio once it loads; derive logical map height.
  const onImgLoad = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth) return;
    const h = Math.round(MAP_W * img.naturalHeight / img.naturalWidth);
    mapHRef.current = h;
    setMapH(h);
  }, []);

  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const vpW = vp.clientWidth;
    const vpH = vp.clientHeight;
    const minZ = getMinZoom(vpW, vpH, mapHRef.current);
    minZoomRef.current = minZ;

    // Bounding box of unlocked nodes (wx/wy are 0–100 percentages).
    const visNodes = allNodes.filter(n =>
      (n.defaultUnlocked || (gs.unlockedNodes || []).includes(n.id)) && n.wx != null
    );
    const toPx = (n) => ({ x: n.wx * MAP_W / 100, y: n.wy * mapHRef.current / 100 });
    const xs = visNodes.map(n => toPx(n).x);
    const ys = visNodes.map(n => toPx(n).y);
    const bboxCX = xs.length ? (Math.min(...xs) + Math.max(...xs)) / 2 : MAP_W / 2;
    const bboxCY = ys.length ? (Math.min(...ys) + Math.max(...ys)) / 2 : mapHRef.current / 2;

    const z = minZ;
    setZoom(z);
    setPan(clampPan(vpW / 2 - bboxCX * z, vpH / 2 - bboxCY * z, z));
  }, [setZoom, clampPan, allNodes, gs.currentLocId, gs.unlockedNodes, mapH]); // eslint-disable-line react-hooks/exhaustive-deps

  const visibleNodes = allNodes.filter(n => {
    const unlocked = (gs.unlockedNodes || []).includes(n.id) || n.defaultUnlocked;
    // n.minZoom is a multiplier on top of the fill-zoom (1.0 = always visible, 1.4 = need to zoom in 40%)
    const threshold = minZoomRef.current * (n.minZoom || 1.0);
    return unlocked && zoom >= threshold;
  });

  const btnZoom = useCallback((factor) => {
    const vp = vpRef.current;
    if (!vp) return;
    minZoomRef.current = getMinZoom(vp.clientWidth, vp.clientHeight, mapHRef.current);
    zoomToward(vp.clientWidth / 2, vp.clientHeight / 2, factor);
  }, [zoomToward]);

  return (
    <div
      ref={vpRef}
      className="zoom-map-viewport"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="zoom-map-canvas"
        style={{
          width: MAP_W,
          height: mapH,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
      >
        <img
          ref={imgRef}
          src={mapUrl}
          alt="Sword Coast"
          draggable={false}
          onLoad={onImgLoad}
          style={{ width: MAP_W, height: mapH, display: 'block', userSelect: 'none', pointerEvents: 'none' }}
        />
        {visibleNodes.map(n => (
          <ZoomMarker
            key={n.id}
            node={n}
            zoom={zoom}
            mapW={MAP_W}
            mapH={mapH}
            isCurrent={n.id === gs.currentLocId}
            onClick={() => onClickNode(n)}
          />
        ))}
      </div>
      <div className="zoom-map-title">费伦大陆 · 剑湾海岸</div>
      <div className="zoom-controls">
        <button className="zoom-btn" onClick={() => btnZoom(1.4)}>＋</button>
        <button className="zoom-btn" onClick={() => btnZoom(1 / 1.4)}>－</button>
      </div>
    </div>
  );
}

function ZoomMarker({ node, zoom, mapW, mapH, isCurrent, onClick }) {
  // wx/wy are percentages (0–100) of the map; convert to canvas pixels.
  const px = node.wx * mapW / 100;
  const py = node.wy * mapH / 100;
  return (
    <div
      className="zoom-marker-anchor"
      style={{ left: px, top: py }}
      onClick={onClick}
    >
      <div
        className={`zoom-marker zm-${node.type || 'default'} ${isCurrent ? 'zm-current' : ''} ${node.kind === 'future' ? 'zm-future' : ''}`}
        style={{
          transform: `translate(-50%, -50%) scale(${1 / zoom})`,
          transformOrigin: 'center center',
        }}
      >
        <div className="zm-pin">
          <span className="zm-icon">{node.icon}</span>
        </div>
        <div className="zm-label">
          {isCurrent && <span className="zm-you">▼ </span>}
          {node.name}
        </div>
      </div>
    </div>
  );
}
