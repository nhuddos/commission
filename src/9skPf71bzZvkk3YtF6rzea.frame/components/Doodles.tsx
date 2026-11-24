import React from 'react'

/**
 * Hand-drawn doodle icons: a flat colour fill printed slightly off-register
 * under a chunky black outline, like a risograph print.
 */

type Part =
  | { el: 'path'; d: string; fill?: string }
  | { el: 'circle'; cx: number; cy: number; r: number; fill?: string }
  | { el: 'polygon'; points: string; fill?: string }
  | { el: 'line'; d: string }

export type DoodleName =
  | 'eye' | 'pencil' | 'heart' | 'star' | 'sparkle' | 'cloud' | 'flower'
  | 'cat' | 'brush' | 'rainbow' | 'tree' | 'bird' | 'camera' | 'bubble'

const C = {
  coral: '#f0614f',
  tangerine: '#f58a3c',
  mustard: '#ecb83f',
  teal: '#1f8f7a',
  pink: '#f4a9c4',
  periwinkle: '#8fa3ea',
  cream: '#f8dfb9',
  white: '#fffaf0',
  ink: '#1d1a17',
}

const DOODLES: Record<DoodleName, { w: number; parts: Part[] }> = {
  eye: {
    w: 64,
    parts: [
      { el: 'path', d: 'M4 24 Q32 2 60 24 Q32 46 4 24 Z', fill: C.white },
      { el: 'circle', cx: 32, cy: 24, r: 10, fill: C.periwinkle },
      { el: 'circle', cx: 32, cy: 24, r: 3.5, fill: C.ink },
    ],
  },
  pencil: {
    w: 64,
    parts: [
      { el: 'path', d: 'M4 15 H14 V33 H4 Z', fill: C.pink },
      { el: 'path', d: 'M14 15 H46 V33 H14 Z', fill: C.mustard },
      { el: 'path', d: 'M46 15 L61 24 L46 33 Z', fill: C.cream },
      { el: 'path', d: 'M56.5 21.3 L61 24 L56.5 26.7 Z', fill: C.ink },
      { el: 'line', d: 'M14 24 H46' },
    ],
  },
  heart: {
    w: 64,
    parts: [{ el: 'path', d: 'M32 42 C10 28 4 18 10 10 C16 3 26 5 32 14 C38 5 48 3 54 10 C60 18 54 28 32 42 Z', fill: C.coral }],
  },
  star: {
    w: 64,
    parts: [{ el: 'polygon', points: '32,4 37.3,16.7 51,17.8 40.6,26.8 43.8,40.2 32,33 20.2,40.2 23.4,26.8 13,17.8 26.7,16.7', fill: C.mustard }],
  },
  sparkle: {
    w: 64,
    parts: [{ el: 'path', d: 'M32 4 Q35 21 50 24 Q35 27 32 44 Q29 27 14 24 Q29 21 32 4 Z', fill: C.tangerine }],
  },
  cloud: {
    w: 64,
    parts: [{ el: 'path', d: 'M14 38 C4 38 4 24 14 24 C14 14 28 10 32 18 C36 8 54 10 52 24 C62 24 62 38 52 38 Z', fill: C.periwinkle }],
  },
  flower: {
    w: 64,
    parts: [
      { el: 'circle', cx: 32, cy: 12, r: 9, fill: C.pink },
      { el: 'circle', cx: 43.4, cy: 20.3, r: 9, fill: C.pink },
      { el: 'circle', cx: 39, cy: 33.7, r: 9, fill: C.pink },
      { el: 'circle', cx: 25, cy: 33.7, r: 9, fill: C.pink },
      { el: 'circle', cx: 20.6, cy: 20.3, r: 9, fill: C.pink },
      { el: 'circle', cx: 32, cy: 24, r: 7, fill: C.mustard },
    ],
  },
  cat: {
    w: 64,
    parts: [
      { el: 'path', d: 'M14 18 L16 5 L26 13 Q32 11 38 13 L48 5 L50 18 Q54 40 32 41 Q10 40 14 18 Z', fill: C.tangerine },
      { el: 'circle', cx: 25, cy: 25, r: 2.2, fill: C.ink },
      { el: 'circle', cx: 39, cy: 25, r: 2.2, fill: C.ink },
      { el: 'path', d: 'M29.5 31 L34.5 31 L32 34 Z', fill: C.pink },
    ],
  },
  brush: {
    w: 64,
    parts: [
      { el: 'path', d: 'M4 21 Q4 18 8 18 H30 V30 H8 Q4 30 4 27 Z', fill: C.mustard },
      { el: 'path', d: 'M30 15 H40 V33 H30 Z', fill: C.periwinkle },
      { el: 'path', d: 'M40 15 Q56 14 61 24 Q56 34 40 33 Z', fill: C.coral },
    ],
  },
  rainbow: {
    w: 64,
    parts: [
      { el: 'path', d: 'M4 40 A28 28 0 0 1 60 40 L52 40 A20 20 0 0 0 12 40 Z', fill: C.coral },
      { el: 'path', d: 'M12 40 A20 20 0 0 1 52 40 L45 40 A13 13 0 0 0 19 40 Z', fill: C.mustard },
      { el: 'path', d: 'M19 40 A13 13 0 0 1 45 40 L38 40 A6 6 0 0 0 26 40 Z', fill: C.teal },
    ],
  },
  tree: {
    w: 64,
    parts: [{ el: 'path', d: 'M32 4 L52 24 H42 L57 41 H7 L22 24 H12 Z', fill: C.teal }],
  },
  bird: {
    w: 64,
    parts: [
      { el: 'path', d: 'M6 26 Q14 14 28 20 L44 8 L40 22 Q52 22 60 16 Q56 34 34 36 Q16 38 6 26 Z', fill: C.periwinkle },
      { el: 'circle', cx: 18, cy: 24, r: 2, fill: C.ink },
    ],
  },
  camera: {
    w: 64,
    parts: [
      { el: 'path', d: 'M8 14 Q8 10 12 10 H52 Q56 10 56 14 V38 Q56 42 52 42 H12 Q8 42 8 38 Z', fill: C.pink },
      { el: 'circle', cx: 32, cy: 26, r: 10, fill: C.white },
      { el: 'circle', cx: 32, cy: 26, r: 4, fill: C.ink },
      { el: 'circle', cx: 47, cy: 17, r: 2.5, fill: C.ink },
    ],
  },
  bubble: {
    w: 64,
    parts: [
      { el: 'path', d: 'M10 8 H54 Q58 8 58 12 V32 Q58 36 54 36 H26 L16 44 L18 36 H10 Q6 36 6 32 V12 Q6 8 10 8 Z', fill: C.teal },
      { el: 'circle', cx: 22, cy: 22, r: 3, fill: C.white },
      { el: 'circle', cx: 32, cy: 22, r: 3, fill: C.white },
      { el: 'circle', cx: 42, cy: 22, r: 3, fill: C.white },
    ],
  },
}

export function Doodle({ name, className = '', title }: { name: DoodleName; className?: string; title?: string }) {
  const { w, parts } = DOODLES[name]
  return (
    <svg
      viewBox={`0 0 ${w} 48`}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/* off-register colour layer */}
      <g transform="translate(2.5 2)">
        {parts.map((p, i) => renderPart(p, i, true))}
      </g>
      {/* ink outline layer */}
      <g fill="none" stroke={C.ink} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round">
        {parts.map((p, i) => renderPart(p, i, false))}
      </g>
    </svg>
  )
}

function renderPart(p: Part, i: number, colour: boolean) {
  const fillProps = colour ? { fill: 'fill' in p ? p.fill : 'none', stroke: 'none' } : {}
  // Small solid dots (pupils, nostrils) only print in colour, without an outline.
  if (!colour && p.el === 'circle' && p.fill === C.ink) return null
  switch (p.el) {
    case 'path':
      return <path key={i} d={p.d} {...fillProps} />
    case 'circle':
      return <circle key={i} cx={p.cx} cy={p.cy} r={p.r} {...fillProps} />
    case 'polygon':
      return <polygon key={i} points={p.points} {...fillProps} />
    case 'line':
      return colour ? null : <path key={i} d={p.d} />
  }
}
