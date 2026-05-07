import React from 'react';
export { SwordCoastSVG };

function SwordCoastSVG() {
  return (
    <svg
      className="terrain-svg"
      viewBox="0 0 1000 700"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── 基础大地 ── */}
      <rect width="1000" height="700" fill="#2a3818" />

      {/* ── 海洋 ── */}
      <path
        d="M0,0 L188,0 L178,55 L170,120 L158,195 L165,265 L150,330 L162,400 L145,470 L158,535 L140,600 L155,660 L148,700 L0,700 Z"
        fill="#14263e"
      />
      {/* 深海区 */}
      <path
        d="M0,0 L110,0 L98,180 L85,380 L88,700 L0,700 Z"
        fill="#0d1c2e"
        opacity="0.6"
      />
      {/* 浅海波纹 */}
      {[80,160,240,320,400,480,560,640].map((y, i) => (
        <path
          key={i}
          d={`M20,${y} Q55,${y-8} 90,${y} Q125,${y+8} 145,${y}`}
          fill="none"
          stroke="#1e3a5a"
          strokeWidth="1.5"
          opacity="0.35"
        />
      ))}

      {/* ── 海岸线 ── */}
      <path
        d="M188,0 L178,55 L170,120 L158,195 L165,265 L150,330 L162,400 L145,470 L158,535 L140,600 L155,660 L148,700"
        fill="none"
        stroke="#9a7228"
        strokeWidth="2.5"
        opacity="0.75"
      />

      {/* ── 内华冬河 — 从东北流向内华冬城 ── */}
      <path
        d="M490,0 L470,50 L440,110 L380,155 L310,175 L245,188 L165,195"
        fill="none"
        stroke="#2e5a8a"
        strokeWidth="3.5"
        opacity="0.65"
      />
      {/* 支流 */}
      <path
        d="M440,110 L430,145 L412,190"
        fill="none"
        stroke="#2e5a8a"
        strokeWidth="2"
        opacity="0.45"
      />

      {/* ── 永冬林 ── */}
      <ellipse cx="500" cy="215" rx="195" ry="118" fill="#1a2e0e" opacity="0.8" />
      <ellipse cx="500" cy="215" rx="195" ry="118" fill="none" stroke="#243d12" strokeWidth="2" opacity="0.5" />
      {[
        [420,185],[460,195],[500,178],[540,192],[575,208],
        [475,225],[515,235],[550,222],[480,248],[530,250],
      ].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#223810" opacity="0.6" />
      ))}

      {/* ── 剑山山脉 ── */}
      {[
        [460,400],[492,372],[525,408],[558,378],[590,415],
        [622,385],[652,418],[480,442],[515,450],[550,438],[588,452],
      ].map(([x,y], i) => (
        <polygon
          key={i}
          points={`${x},${y} ${x-26},${y+48} ${x+26},${y+48}`}
          fill="#6a5a4a"
          stroke="#4a3a2a"
          strokeWidth="1"
          opacity="0.9"
        />
      ))}
      {[
        [460,400],[492,372],[525,408],[558,378],[590,415],[622,385]
      ].map(([x,y], i) => (
        <polygon
          key={`s${i}`}
          points={`${x},${y} ${x-9},${y+18} ${x+9},${y+18}`}
          fill="#e8e0d8"
          opacity="0.65"
        />
      ))}

      {/* ── 高路 — 沿海岸南北 ── */}
      <path
        d="M192,0 L188,68 L182,135 L175,195 L182,270 L168,350 L175,435 L162,520 L168,600 L160,700"
        fill="none"
        stroke="#c89828"
        strokeWidth="2.5"
        strokeDasharray="12,7"
        opacity="0.5"
      />

      {/* ── 翠野小径 — 内华冬城 → 法达林镇 ── */}
      <path
        d="M210,195 L268,228 L355,262 L430,290 L490,305"
        fill="none"
        stroke="#c89828"
        strokeWidth="2"
        strokeDasharray="8,6"
        opacity="0.42"
      />

      {/* ── 东去小道 — 法达林镇 → 猫头鹰井 ── */}
      <path
        d="M490,305 L540,272 L592,238"
        fill="none"
        stroke="#c89828"
        strokeWidth="1.5"
        strokeDasharray="6,6"
        opacity="0.3"
      />

      {/* ── 荒地纹理 ── */}
      {[
        [700,200],[750,230],[800,205],[720,260],[780,275],[840,250],
        [700,330],[760,350],[820,320],[700,420],[760,400],[810,430],
      ].map(([x,y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="15" ry="8" fill="#3a4a28" opacity="0.4" />
      ))}

      {/* ── 文字标注 ── */}
      <text x="72" y="360" textAnchor="middle" fontSize="20" fill="#3a6a9a" opacity="0.45" fontStyle="italic" letterSpacing="2">剑　湾</text>
      <text x="800" y="180" textAnchor="middle" fontSize="15" fill="#6a7a58" opacity="0.3" fontStyle="italic">北方荒野</text>
      <text x="780" y="520" textAnchor="middle" fontSize="15" fill="#6a7a58" opacity="0.3" fontStyle="italic">内陆荒原</text>
      <text x="500" y="168" textAnchor="middle" fontSize="13" fill="#3a5a28" opacity="0.55" fontStyle="italic">永　冬　林</text>
    </svg>
  );
}
