import React from 'react';
import { FACE_PARTS } from '../data/gamedata.js';
export { FaceAvatar };

function FaceAvatar({ face, size = 120 }) {
  const f = face || {};
  const skinColor = (FACE_PARTS.skinTone.options.find(o=>o.id===f.skinTone) || {}).color || '#dba87b';
  const hairColor = (FACE_PARTS.hairColor.options.find(o=>o.id===f.hairColor) || {}).color || '#5a3a1f';
  const faceShape = f.faceShape || 'round';
  const hairStyle = f.hairStyle || 'short';
  const accessory = f.accessory || 'none';
  const expression = f.expression || 'calm';

  // Face shape paths (cy=50, head)
  const faceShapes = {
    round:  <ellipse cx="50" cy="52" rx="26" ry="30" fill={skinColor} stroke="#1a1208" strokeWidth="1" />,
    long:   <ellipse cx="50" cy="55" rx="22" ry="34" fill={skinColor} stroke="#1a1208" strokeWidth="1" />,
    square: <path d="M 26 40 Q 26 30 38 28 L 62 28 Q 74 30 74 40 L 74 70 Q 74 84 50 86 Q 26 84 26 70 Z"
              fill={skinColor} stroke="#1a1208" strokeWidth="1" />,
  };

  // Ears
  const ears = (
    <>
      <ellipse cx="24" cy="52" rx="4" ry="6" fill={skinColor} stroke="#1a1208" strokeWidth="0.8" />
      <ellipse cx="76" cy="52" rx="4" ry="6" fill={skinColor} stroke="#1a1208" strokeWidth="0.8" />
    </>
  );

  // Hair (drawn over face)
  const hair = {
    short: (
      <path d="M 24 36 Q 28 22 50 22 Q 72 22 76 36 Q 76 42 70 42 L 30 42 Q 24 42 24 36 Z"
        fill={hairColor} />
    ),
    long: (
      <>
        <path d="M 22 36 Q 26 18 50 18 Q 74 18 78 36 L 78 78 Q 70 76 70 70 L 70 42 L 30 42 L 30 70 Q 30 76 22 78 Z"
          fill={hairColor} />
      </>
    ),
    bald: null,
    curly: (
      <g fill={hairColor}>
        <circle cx="32" cy="30" r="8"/>
        <circle cx="42" cy="24" r="9"/>
        <circle cx="55" cy="22" r="9"/>
        <circle cx="67" cy="26" r="8"/>
        <circle cx="74" cy="34" r="7"/>
        <circle cx="28" cy="38" r="7"/>
      </g>
    ),
    topknot: (
      <>
        <ellipse cx="50" cy="14" rx="9" ry="7" fill={hairColor} />
        <rect x="46" y="20" width="8" height="8" fill={hairColor} />
        <path d="M 28 38 Q 32 28 50 28 Q 68 28 72 38 Q 72 42 68 42 L 32 42 Q 28 42 28 38 Z" fill={hairColor} />
      </>
    ),
    mohawk: (
      <path d="M 44 14 Q 40 28 40 42 L 60 42 Q 60 28 56 14 Q 50 10 44 14 Z" fill={hairColor} />
    ),
    sidecut: (
      <path d="M 24 36 Q 28 22 50 22 Q 72 22 76 36 L 76 42 L 60 42 Q 56 32 50 30 Q 36 38 30 42 L 24 42 Z"
        fill={hairColor} />
    ),
    ponytail: (
      <>
        <path d="M 26 36 Q 30 22 50 22 Q 70 22 74 36 L 74 42 L 26 42 Z" fill={hairColor} />
        <ellipse cx="74" cy="50" rx="5" ry="14" fill={hairColor} transform="rotate(20 74 50)" />
      </>
    ),
  };

  // Eyes
  const eyeBase = (
    <>
      <circle cx="40" cy="52" r="3" fill="white" stroke="#1a1208" strokeWidth="0.8" />
      <circle cx="60" cy="52" r="3" fill="white" stroke="#1a1208" strokeWidth="0.8" />
      <circle cx="40" cy="52" r="1.6" fill="#1a1208" />
      <circle cx="60" cy="52" r="1.6" fill="#1a1208" />
    </>
  );

  const fierceEyes = (
    <>
      <path d="M 36 50 L 44 53" stroke="#1a1208" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 56 53 L 64 50" stroke="#1a1208" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </>
  );
  const tiredEyes = (
    <>
      <path d="M 37 53 Q 40 51 44 53" stroke="#1a1208" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 56 53 Q 60 51 63 53" stroke="#1a1208" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </>
  );

  const eyes = {
    calm: eyeBase,
    smile: eyeBase,
    fierce: fierceEyes,
    tired: tiredEyes,
  };

  // Mouth
  const mouths = {
    calm: <line x1="44" y1="68" x2="56" y2="68" stroke="#1a1208" strokeWidth="1.4" strokeLinecap="round" />,
    smile: <path d="M 42 67 Q 50 73 58 67" stroke="#1a1208" strokeWidth="1.4" fill="none" strokeLinecap="round" />,
    fierce: <path d="M 42 70 L 58 70 L 56 67 L 44 67 Z" fill="#1a1208" />,
    tired: <line x1="44" y1="70" x2="56" y2="70" stroke="#1a1208" strokeWidth="1.2" strokeLinecap="round" />,
  };

  // Eyebrows
  const eyebrows = {
    calm: (
      <>
        <path d="M 36 46 L 44 45" stroke="#1a1208" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 56 45 L 64 46" stroke="#1a1208" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    smile: (
      <>
        <path d="M 36 47 Q 40 45 44 46" stroke="#1a1208" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 56 46 Q 60 45 64 47" stroke="#1a1208" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
    fierce: (
      <>
        <path d="M 36 48 L 44 44" stroke="#1a1208" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 56 44 L 64 48" stroke="#1a1208" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
    tired: (
      <>
        <path d="M 36 45 L 44 47" stroke="#1a1208" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 56 47 L 64 45" stroke="#1a1208" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  };

  // Accessory
  const accessories = {
    none: null,
    eyepatch: (
      <>
        <ellipse cx="40" cy="52" rx="6" ry="4.5" fill="#1a1208" />
        <line x1="34" y1="50" x2="22" y2="46" stroke="#1a1208" strokeWidth="1" />
        <line x1="46" y1="51" x2="68" y2="46" stroke="#1a1208" strokeWidth="1" />
      </>
    ),
    glasses: (
      <>
        <circle cx="40" cy="52" r="6" fill="none" stroke="#3a2818" strokeWidth="1.4" />
        <circle cx="60" cy="52" r="6" fill="none" stroke="#3a2818" strokeWidth="1.4" />
        <line x1="46" y1="52" x2="54" y2="52" stroke="#3a2818" strokeWidth="1.4" />
      </>
    ),
    bandana: (
      <>
        <path d="M 24 36 L 76 36 L 78 42 L 22 42 Z" fill="#a02020" />
        <path d="M 78 36 L 88 32 L 86 42 L 78 42 Z" fill="#7a1818" />
        <circle cx="32" cy="39" r="1" fill="#1a1208" />
        <circle cx="50" cy="39" r="1" fill="#1a1208" />
        <circle cx="68" cy="39" r="1" fill="#1a1208" />
      </>
    ),
    hood: (
      <path d="M 12 70 Q 12 28 50 22 Q 88 28 88 70 L 88 90 L 12 90 Z"
        fill="#3a2818" stroke="#1a1208" strokeWidth="1" />
    ),
    helmet: (
      <>
        <path d="M 22 50 Q 22 20 50 20 Q 78 20 78 50 L 78 44 L 22 44 Z"
          fill="#7a7060" stroke="#1a1208" strokeWidth="1" />
        <rect x="46" y="20" width="8" height="14" fill="#5a5040" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{display:'block'}}>
      {/* Hood goes behind everything if active */}
      {accessory === 'hood' && accessories.hood}
      {ears}
      {faceShapes[faceShape] || faceShapes.round}
      {/* Hair (skip if helmet/hood/bandana fully covers) */}
      {accessory !== 'helmet' && accessory !== 'hood' && (hair[hairStyle] || hair.short)}
      {/* Eyebrows + Eyes + Mouth */}
      {accessory !== 'helmet' && accessory !== 'eyepatch' && eyebrows[expression]}
      {accessory !== 'helmet' && (accessory === 'eyepatch' ? (
        <>
          {/* Right eye visible only */}
          <circle cx="60" cy="52" r="3" fill="white" stroke="#1a1208" strokeWidth="0.8" />
          <circle cx="60" cy="52" r="1.6" fill="#1a1208" />
        </>
      ) : eyes[expression])}
      {accessory !== 'helmet' && mouths[expression]}
      {/* Accessory front layer */}
      {accessory !== 'hood' && accessory !== 'helmet' && accessories[accessory]}
      {accessory === 'helmet' && accessories.helmet}
    </svg>
  );
}
