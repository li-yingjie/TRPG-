// Walk the dialogs tree and collect every image src referenced by a
// { type:'image', src } block, then warm the browser cache with new Image()
// so they appear instantly mid-conversation instead of streaming in.

import { DIALOGS } from '../data/dialogs.js';

function collectImageSrcs(obj, out = new Set()) {
  if (!obj) return out;
  if (Array.isArray(obj)) {
    for (const v of obj) collectImageSrcs(v, out);
    return out;
  }
  if (typeof obj === 'object') {
    if (obj.type === 'image' && typeof obj.src === 'string') out.add(obj.src);
    for (const k in obj) collectImageSrcs(obj[k], out);
  }
  return out;
}

let preloaded = false;

export function preloadSceneImages() {
  if (preloaded) return;
  preloaded = true;
  const srcs = collectImageSrcs(DIALOGS);
  for (const src of srcs) {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  }
}
