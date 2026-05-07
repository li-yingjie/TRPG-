// ════════════════════════════════
// 存档系统 · localStorage
// key: calatia_save_0  (自动存档)
//      calatia_save_1  (手动槽 1)
//      calatia_save_2  (手动槽 2)
// ════════════════════════════════

const PREFIX = 'calatia_save_';
export const SLOT_AUTO = 0;
export const SLOT_1 = 1;
export const SLOT_2 = 2;
export const ALL_SLOTS = [SLOT_AUTO, SLOT_1, SLOT_2];

/** 读取单条存档，不存在返回 null */
export function loadSave(slot) {
  try {
    const raw = localStorage.getItem(PREFIX + slot);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/** 写入存档 */
export function writeSave(slot, gs) {
  const data = {
    gs,
    savedAt: Date.now(),
    version: 14,
  };
  localStorage.setItem(PREFIX + slot, JSON.stringify(data));
}

/** 删除存档 */
export function deleteSave(slot) {
  localStorage.removeItem(PREFIX + slot);
}

/** 读取全部 3 个槽位信息（用于存档列表展示）*/
export function listSaves() {
  return ALL_SLOTS.map(slot => {
    const s = loadSave(slot);
    if (!s) return { slot, empty: true };
    return {
      slot,
      empty: false,
      name: s.gs?.name || '冒险者',
      level: s.gs?.level || 1,
      day: s.gs?.day || 1,
      savedAt: s.savedAt,
      gs: s.gs,
    };
  });
}

/** 格式化存档时间 */
export function formatSaveTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${mm}-${dd} ${hh}:${min}`;
}
