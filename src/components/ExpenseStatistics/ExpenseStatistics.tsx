import React from 'react';

interface Slice {
  label: string;
  value: number; // percent
  color: string;
}

// Clockwise order, matching your image
const slices: Slice[] = [
  { label: 'Entertainment', value: 30, color: '#343C6A' },
  { label: 'Bill Expense', value: 15, color: '#FC7900' },
  { label: 'Others', value: 35, color: '#1814F3' },
  { label: 'Investment', value: 20, color: '#FA00FF' },
];

const CX = 150;
const CY = 150;
const RADIUS = 122;
const EXPLODE = 10; // gap between slices
const START_ANGLE = -122; // degrees, 0 = top, clockwise
const LABEL_RADIUS = RADIUS * 0.62;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const point = (angle: number, r: number) => ({
  x: CX + r * Math.sin(toRad(angle)),
  y: CY - r * Math.cos(toRad(angle)),
});

const buildSlices = () => {
  let current = START_ANGLE;

  return slices.map((slice) => {
    const sweep = (slice.value / 100) * 360;
    const start = current;
    const end = current + sweep;
    const mid = start + sweep / 2;
    current = end;

    const p1 = point(start, RADIUS);
    const p2 = point(end, RADIUS);
    const largeArc = sweep > 180 ? 1 : 0;

    const path = `M ${CX} ${CY} L ${p1.x} ${p1.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${p2.x} ${p2.y} Z`;

    // Push the slice outwards from the centre
    const shift = {
      x: EXPLODE * Math.sin(toRad(mid)),
      y: -EXPLODE * Math.cos(toRad(mid)),
    };

    return { ...slice, path, shift, labelPos: point(mid, LABEL_RADIUS) };
  });
};

const computed = buildSlices();

interface ExpenseStatisticsProps {
  filter?: string;
}

const ExpenseStatistics: React.FC<ExpenseStatisticsProps> = ({ filter = '' }) => {
  const sectionName = 'Expense Statistics';
  const shouldShow = !filter || sectionName.toLowerCase().includes(filter.toLowerCase());

  if (!shouldShow) return null;

  return (
    <section className="flex w-full min-w-0 flex-col opacity-100">
      {/* Title */}
      <h2 className="mb-4 text-lg font-semibold text-[#343C6A] sm:text-[22px]">
        {sectionName}
      </h2>

      {/* White card (stretches to match the Weekly Activity height) */}
      <div className="flex flex-1 items-center justify-center rounded-[25px] bg-white p-4 sm:p-6">
        <svg
          viewBox="0 0 300 300"
          className="h-auto w-full max-w-[320px]"
          role="img"
          aria-label="Expense statistics pie chart: Entertainment 30%, Bill Expense 15%, Others 35%, Investment 20%"
        >
          {computed.map((slice) => (
            <g key={slice.label} transform={`translate(${slice.shift.x} ${slice.shift.y})`}>
              <path d={slice.path} fill={slice.color} />
              <text
                x={slice.labelPos.x}
                y={slice.labelPos.y}
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="inherit"
              >
                <tspan
                  x={slice.labelPos.x}
                  dy="-0.2em"
                  fontSize="16"
                  fontWeight="700"
                >
                  {slice.value}%
                </tspan>
                <tspan
                  x={slice.labelPos.x}
                  dy="1.4em"
                  fontSize="11"
                  fontWeight="600"
                >
                  {slice.label}
                </tspan>
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
};

export default ExpenseStatistics;