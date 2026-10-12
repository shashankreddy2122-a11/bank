import React from 'react';

const sectionTitle = 'mb-4 text-lg font-semibold text-[#343C6A] sm:text-[22px]';

/* =====================================================================
   Custom two-tone icons (they use the text colour of their parent)
   ===================================================================== */
interface IconProps {
  size?: number;
  className?: string;
}

const iconBase = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  className,
  'aria-hidden': true as const,
});

/* Money bag with a dollar sign */
const MoneyBagIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <path
      d="M8.5 7.8C6 10.2 4.5 12.8 4.5 15.6A5.4 5.4 0 0 0 9.9 21h4.2a5.4 5.4 0 0 0 5.4-5.4c0-2.8-1.5-5.4-4-7.8z"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M9 3.2h6l-1.4 3a2.6 2.6 0 0 1-3.2 0z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <text
      x="12"
      y="17.4"
      textAnchor="middle"
      fontSize="8.5"
      fontWeight="800"
      fill="currentColor"
      fontFamily="Inter, system-ui, sans-serif"
    >
      $
    </text>
  </svg>
);

/* Pie chart with a pulled-out slice */
const PieChartIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <path
      d="M10.5 5.2A8 8 0 1 0 18.8 13.5H10.5z"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 2.8a8 8 0 0 1 7.7 7.7h-7.7z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

/* Two circular arrows (return / exchange) */
const SwapArrowsIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.14" />
    <path
      d="M6 10.5a6.5 6.5 0 0 1 11.2-2.2l1.3 1.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.6 5.4v4.4h-4.4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 13.5a6.5 6.5 0 0 1-11.2 2.2l-1.3-1.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.4 18.6v-4.4h4.4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Apple (filled) */
const AppleLogoIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <path
      d="M16.37 12.64c-.03-2.45 2-3.63 2.09-3.69-1.14-1.67-2.91-1.9-3.54-1.92-1.51-.15-2.94.89-3.7.89-.77 0-1.94-.87-3.19-.84-1.64.02-3.15.95-4 2.42-1.71 2.96-.44 7.34 1.22 9.74.81 1.17 1.78 2.49 3.05 2.44 1.22-.05 1.69-.79 3.17-.79 1.48 0 1.9.79 3.19.76 1.32-.02 2.15-1.19 2.95-2.37.93-1.36 1.31-2.68 1.34-2.75-.03-.01-2.57-.99-2.6-3.89zM13.94 5.4c.67-.82 1.13-1.95 1-3.08-.97.04-2.14.65-2.84 1.46-.62.72-1.17 1.88-1.02 2.99 1.08.08 2.18-.55 2.86-1.37z"
      fill="currentColor"
    />
  </svg>
);

/* Smartphone with a screen and camera (Samsung Mobile) */
const PhoneIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <rect
      x="6"
      y="2.5"
      width="12"
      height="19"
      rx="3"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <rect x="8.2" y="5.6" width="7.6" height="11.2" rx="1.2" fill="currentColor" fillOpacity="0.5" />
    <circle cx="12" cy="4.1" r="0.7" fill="currentColor" />
    <path d="M10.4 19.4h3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/* Electric-car "T" emblem (Tesla Motors) */
const EmblemIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <path
      d="M2.5 7.6C5 5.6 8.2 4.5 12 4.5s7 1.1 9.5 3.1l-1.5 1.8c-2-.8-4.7-1.6-7-1.7V19.2L12 21.2l-1-2V7.7c-2.3.1-5 .9-7 1.7z"
      fill="currentColor"
    />
    <path
      d="M7.6 11.4c1.3-.4 2.7-.6 4.4-.6s3.100.2 4.400.6"
      stroke="currentColor"
      strokeOpacity="0.45"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

/* =====================================================================
   1. Three stat cards
   ===================================================================== */
const stats = [
  {
    label: 'Total Invested Amount',
    value: '$150,000',
    icon: MoneyBagIcon,
    bg: 'bg-gradient-to-br from-[#E6FBF9] to-[#C4F3EE]',
    ring: 'ring-[#16DBCC]/20',
    color: 'text-[#16DBCC]',
  },
  {
    label: 'Number of Investments',
    value: '1,250',
    icon: PieChartIcon,
    bg: 'bg-gradient-to-br from-[#FFEAF1] to-[#FFCFE0]',
    ring: 'ring-[#FF82AC]/20',
    color: 'text-[#FF82AC]',
  },
  {
    label: 'Rate of Return',
    value: '+5.80%',
    icon: SwapArrowsIcon,
    bg: 'bg-gradient-to-br from-[#EDF1FF] to-[#D3DEFF]',
    ring: 'ring-[#396AFF]/20',
    color: 'text-[#396AFF]',
  },
];

const StatCards: React.FC = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-[30px]">
    {stats.map((item) => (
      <div
        key={item.label}
        className="flex items-center gap-4 rounded-[25px] bg-white px-5 py-5 sm:px-6"
      >
        <div
          className={`flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full ring-4 sm:h-[70px] sm:w-[70px] ${item.bg} ${item.ring}`}
        >
          <item.icon size={30} className={item.color} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm text-[#718EBF]">{item.label}</p>
          <p className="truncate text-xl font-semibold text-[#232323] sm:text-2xl">
            {item.value}
          </p>
        </div>
      </div>
    ))}
  </div>
);

/* =====================================================================
   Line chart (used by both charts)
   ===================================================================== */
interface ChartPoint {
  u: number;
  value: number;
}

interface LineChartProps {
  points: ChartPoint[];
  color: string;
  smooth: boolean;
  markers: boolean;
  label: string;
}

const YEARS = [2016, 2017, 2018, 2019, 2020, 2021];
const Y_TICKS = [0, 10000, 20000, 30000, 40000];
const MAX_VALUE = 40000;

const U_MIN = -0.2;
const U_MAX = 5.4;

const W = 520;
const H = 250;
const LEFT = 62;
const RIGHT = 508;
const TOP = 12;
const BOTTOM = 205;

const xOf = (u: number) => LEFT + ((u - U_MIN) / (U_MAX - U_MIN)) * (RIGHT - LEFT);

const yOf = (v: number) => BOTTOM - (v / MAX_VALUE) * (BOTTOM - TOP);

/* Smooth curve that never overshoots the data */
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
    const h = dx[i] / 3;

    d += ` C ${pts[i].x + h} ${pts[i].y + tangents[i] * h}, ${pts[i + 1].x - h} ${
      pts[i + 1].y - tangents[i + 1] * h
    }, ${pts[i + 1].x} ${pts[i + 1].y}`;
  }

  return d;
};

const buildStraightPath = (pts: { x: number; y: number }[]) =>
  pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

const LineChart: React.FC<LineChartProps> = ({ points, color, smooth, markers, label }) => {
  const coords = points.map((p) => ({
    x: xOf(p.u),
    y: yOf(p.value),
  }));

  const path = smooth ? buildSmoothPath(coords) : buildStraightPath(coords);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={label}>
      {/* Dashed grid + y labels */}
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
            fontSize="11"
            className="fill-[#718EBF]"
          >
            {`$${tick.toLocaleString('en-US')}`}
          </text>
        </g>
      ))}

      {/* Year labels */}
      {YEARS.map((year, i) => (
        <text
          key={year}
          x={xOf(i)}
          y={BOTTOM + 22}
          textAnchor="middle"
          fontSize="11"
          className="fill-[#718EBF]"
        >
          {year}
        </text>
      ))}

      {/* The line */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Round markers */}
      {markers &&
        coords.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r="4.5"
            fill="#FFFFFF"
            stroke={color}
            strokeWidth="2.5"
          />
        ))}
    </svg>
  );
};

/* ---------- Yearly Investment Data ---------- */
const yearlyData: ChartPoint[] = [
  { u: 0, value: 6000 },
  { u: 1, value: 23500 },
  { u: 2, value: 16000 },
  { u: 3, value: 37000 },
  { u: 4, value: 21000 },
  { u: 5, value: 29000 },
];

/* ---------- Monthly Revenue Data ---------- */
const monthlyData: ChartPoint[] = [
  { u: -0.2, value: 10000 },
  { u: 0.2, value: 13500 },
  { u: 0.7, value: 20000 },
  { u: 1.35, value: 11500 },
  { u: 1.8, value: 26000 },
  { u: 2.4, value: 32500 },
  { u: 3.05, value: 20500 },
  { u: 3.55, value: 28500 },
  { u: 4.15, value: 24500 },
  { u: 4.8, value: 15000 },
  { u: 5.4, value: 34500 },
];

const Charts: React.FC = () => (
  <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-2 xl:gap-[30px]">
    <section className="flex min-w-0 flex-col">
      <h2 className={sectionTitle}>Yearly Total Investment</h2>

      <div className="flex flex-1 items-center rounded-[25px] bg-white p-4 sm:p-6">
        <LineChart
          points={yearlyData}
          color="#FFAB09"
          smooth={false}
          markers
          label="Yearly total investment line chart from 2016 to 2021"
        />
      </div>
    </section>

    <section className="flex min-w-0 flex-col">
      <h2 className={sectionTitle}>Monthly Revenue</h2>

      <div className="flex flex-1 items-center rounded-[25px] bg-white p-4 sm:p-6">
        <LineChart
          points={monthlyData}
          color="#16DBCC"
          smooth
          markers={false}
          label="Monthly revenue line chart from 2016 to 2021"
        />
      </div>
    </section>
  </div>
);

/* =====================================================================
   3. My Investment
   ===================================================================== */
interface InvestmentItem {
  name: string;
  category: string;
  value: string;
  returnPercent: string;
  logo: React.ReactNode;
  logoBg: string;
}

const investments: InvestmentItem[] = [
  {
    name: 'Apple Store',
    category: 'E-commerce, Marketplace',
    value: '$54,000',
    returnPercent: '+16%',
    logo: <AppleLogoIcon size={26} className="text-[#FF6B9C]" />,
    logoBg: 'bg-gradient-to-br from-[#FFEAF1] to-[#FFCFE0]',
  },
  {
    name: 'Samsung Mobile',
    category: 'E-commerce, Marketplace',
    value: '$25,300',
    returnPercent: '-4%',
    logo: <PhoneIcon size={28} className="text-[#396AFF]" />,
    logoBg: 'bg-gradient-to-br from-[#EDF1FF] to-[#D3DEFF]',
  },
  {
    name: 'Tesla Motors',
    category: 'Electric Vehicles',
    value: '$8,200',
    returnPercent: '+25%',
    logo: <EmblemIcon size={28} className="text-[#FFB020]" />,
    logoBg: 'bg-gradient-to-br from-[#FFF7E0] to-[#FFEBB5]',
  },
];

const MyInvestment: React.FC = () => (
  <section className="flex min-w-0 flex-col">
    <h2 className={sectionTitle}>My Investment</h2>

    <div className="flex flex-1 flex-col gap-4">
      {investments.map((item) => {
        const isNegative = item.returnPercent.startsWith('-');

        return (
          <div
            key={item.name}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-[20px] bg-white p-4 sm:grid-cols-[auto_minmax(0,1.6fr)_1fr_1fr] sm:gap-4"
          >
            <div
              className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[14px] sm:h-[60px] sm:w-[60px] ${item.logoBg}`}
            >
              {item.logo}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#232323] sm:text-base">
                {item.name}
              </p>

              <p className="truncate text-xs text-[#718EBF]">{item.category}</p>
            </div>

            {/* Investment value (hidden on phones) */}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-[#232323] sm:text-base">{item.value}</p>

              <p className="text-xs text-[#718EBF]">Investment Value</p>
            </div>

            {/* Return value */}
            <div className="text-right sm:text-left">
              <p
                className={`text-sm font-medium sm:text-base ${
                  isNegative ? 'text-[#FE5C73]' : 'text-[#16DBAA]'
                }`}
              >
                {item.returnPercent}
              </p>

              <p className="text-xs text-[#718EBF]">Return Value</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

/* =====================================================================
   4. Trending Stock
   ===================================================================== */
const stocks = [
  { no: '01.', name: 'Trivago', price: '$520', change: '+5%' },
  { no: '02.', name: 'Canon', price: '$480', change: '+10%' },
  { no: '03.', name: 'Uber Food', price: '$350', change: '-3%' },
  { no: '04.', name: 'Nokia', price: '$940', change: '+2%' },
  { no: '05.', name: 'Tiktok', price: '$670', change: '-12%' },
];

const TrendingStock: React.FC = () => (
  <section className="flex min-w-0 flex-col">
    <h2 className={sectionTitle}>Trending Stock</h2>

    <div className="flex-1 overflow-x-auto rounded-[25px] bg-white px-4 py-3 sm:px-6 sm:py-4">
      <table className="w-full min-w-[320px] border-collapse text-left">
        <thead>
          <tr className="text-xs text-[#718EBF] sm:text-sm">
            <th className="py-3 pr-3 font-medium">SL No</th>
            <th className="py-3 pr-3 font-medium">Name</th>
            <th className="py-3 pr-3 font-medium">Price</th>
            <th className="py-3 font-medium">Return</th>
          </tr>
        </thead>

        <tbody>
          {stocks.map((stock) => {
            const isNegative = stock.change.startsWith('-');

            return (
              <tr key={stock.no} className="text-sm text-[#232323]">
                <td className="py-3.5 pr-3">{stock.no}</td>
                <td className="py-3.5 pr-3">{stock.name}</td>
                <td className="py-3.5 pr-3">{stock.price}</td>
                <td
                  className={`py-3.5 font-medium ${
                    isNegative ? 'text-[#FE5C73]' : 'text-[#16DBAA]'
                  }`}
                >
                  {stock.change}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </section>
);

/* =====================================================================
   The Investments page
   ===================================================================== */
interface InvestmentsProps {
  filter?: string;
}

const Investments: React.FC<InvestmentsProps> = ({ filter = '' }) => {
  const shouldShow = (name: string) => !filter || name.toLowerCase().includes(filter.toLowerCase());

  return (
    <div className="flex flex-col gap-6 xl:gap-[30px]">
      <StatCards />

      <Charts />

      <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] xl:gap-[30px]">
        {shouldShow('My Investment') && <MyInvestment />}
        {shouldShow('Trending Stock') && <TrendingStock />}
      </div>
    </div>
  );
};

export default Investments;