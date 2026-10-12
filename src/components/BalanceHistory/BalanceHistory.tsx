import React from 'react';

interface Point {
  t: number; // position along the x-axis, 0 (start of Jul) to 1 (end)
  value: number;
}

// Values read from your image
const data: Point[] = [
  { t: 0, value: 110 },
  { t: 0.08, value: 330 },
  { t: 0.18, value: 240 },
  { t: 0.26, value: 485 },
  { t: 0.34, value: 435 },
  { t: 0.43, value: 780 },
  { t: 0.585, value: 215 },
  { t: 0.7, value: 575 },
  { t: 0.84, value: 240 },
  { t: 0.945, value: 640 },
  { t: 1, value: 600 },
];

const MONTHS = [
  { label: 'Jul', t: 0 },
  { label: 'Aug', t: 0.144 },
  { label: 'Sep', t: 0.286 },
  { label: 'Oct', t: 0.428 },
  { label: 'Nov', t: 0.572 },
  { label: 'Dec', t: 0.714 },
  { label: 'Jan', t: 0.858 },
];

const Y_TICKS = [0, 200, 400, 600, 800];
const MAX_VALUE = 800;

// Chart geometry (SVG units). The SVG scales to fit the card.
const W = 590;
const H = 232;
const LEFT = 42;
const RIGHT = 580;
const TOP = 12;
const BOTTOM = 192;

const xOf = (t: number) => LEFT + t * (RIGHT - LEFT);
const yOf = (v: number) => BOTTOM - (v / MAX_VALUE) * (BOTTOM - TOP);

/* Smooth curve that never overshoots the data (monotone cubic) */
const buildSmoothPath = (pts: { x: number; y: number }[]) => {
  const n = pts.length;
  const dx: number[] = [];
  const m: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    dx.push(pts[i + 1].x - pts[i].x);
    m.push((pts[i + 1].y - pts[i].y) / dx[i]);
  }

  const tangents: number[] = new Array(n).fill(0);
  tangents[0] = m[0];
  tangents[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) {
    tangents[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  }

  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
    } else {
      const a = tangents[i] / m[i];
      const b = tangents[i + 1] / m[i];
      const s = a * a + b * b;
      if (s > 9) {
        const tau = 3 / Math.sqrt(s);
        tangents[i] = tau * a * m[i];
        tangents[i + 1] = tau * b * m[i];
      }
    }
  }

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const x0 = pts[i].x;
    const y0 = pts[i].y;
    const x1 = pts[i + 1].x;
    const y1 = pts[i + 1].y;
    const h = dx[i] / 3;
    d += ` C ${x0 + h} ${y0 + tangents[i] * h}, ${x1 - h} ${y1 - tangents[i + 1] * h}, ${x1} ${y1}`;
  }
  return d;
};

const points = data.map((p) => ({ x: xOf(p.t), y: yOf(p.value) }));
const linePath = buildSmoothPath(points);
const areaPath = `${linePath} L ${xOf(1)} ${BOTTOM} L ${xOf(0)} ${BOTTOM} Z`;

interface BalanceHistoryProps {
  filter?: string;
}

const BalanceHistory: React.FC<BalanceHistoryProps> = ({ filter = '' }) => {
  const sectionName = 'Balance History';
  const shouldShow = !filter || sectionName.toLowerCase().includes(filter.toLowerCase());

  if (!shouldShow) return null;

  return (
    // No max-width: fills the space so it ends at the same right edge as the sections above
    <section className="flex w-full min-w-0 flex-col opacity-100">
      {/* Title */}
      <h2 className="mb-4 text-lg font-semibold text-[#343C6A] sm:text-[22px]">
        {sectionName}
      </h2>

      {/* White card: at least 282px tall (title + card = 323px) */}
      <div className="flex min-h-[282px] flex-1 items-center rounded-[25px] bg-white p-4 sm:p-6">
        {/* max-h keeps the chart from getting too tall when the card is very wide */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto max-h-[250px] w-full"
          role="img"
          aria-label="Balance history line chart from July to January"
        >
          <defs>
            <linearGradient id="balance-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2D60FF" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#2D60FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal dashed grid + y labels */}
          {Y_TICKS.map((tick) => (
            <g key={tick}>
              <line
                x1={LEFT}
                x2={RIGHT}
                y1={yOf(tick)}
                y2={yOf(tick)}
                className="stroke-[#DFE5F1]"
                strokeDasharray="4 4"
              />
              <text
                x={LEFT - 10}
                y={yOf(tick)}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="12"
                className="fill-[#718EBF]"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* Vertical dashed grid + month labels */}
          {MONTHS.map((month) => (
            <g key={month.label}>
              <line
                x1={xOf(month.t)}
                x2={xOf(month.t)}
                y1={TOP}
                y2={BOTTOM + 5}
                className="stroke-[#DFE5F1]"
                strokeDasharray="4 4"
              />
              <text
                x={xOf(month.t) + 3}
                y={BOTTOM + 24}
                fontSize="12"
                className="fill-[#718EBF]"
              >
                {month.label}
              </text>
            </g>
          ))}

          {/* Filled area under the curve */}
          <path d={areaPath} fill="url(#balance-fill)" />

          {/* The curve */}
          <path
            d={linePath}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-[#1814F3]"
          />
        </svg>
      </div>
    </section>
  );
};

export default BalanceHistory;