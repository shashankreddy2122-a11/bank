import React from 'react';

const sectionTitle = 'mb-4 text-lg font-semibold text-[#343C6A] sm:text-[22px]';

/* =====================================================================
   Advanced icons (layered, two-tone, they use the text colour of their parent)
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

/* Person: head and shoulders with a soft shadow layer */
const PersonIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <path
      d="M4.5 20.5c0-3.900 3.400-6.500 7.500-6.500s7.500 2.600 7.500 6.500c0 .8-.6 1.500-1.500 1.500h-12c-.9 0-1.500-.7-1.500-1.500z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    <circle cx="12" cy="7.800" r="4.600" fill="currentColor" />
    <path d="M9.200 6.200a3.200 3.200 0 0 1 2.600-1.400" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.300" strokeLinecap="round" />
  </svg>
);

/* Briefcase: body, handle, clasp band */
const BriefcaseIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <path
      d="M8.500 7.500V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.500"
      stroke="currentColor"
      strokeWidth="1.900"
      strokeLinecap="round"
    />
    <rect x="2.500" y="7.500" width="19" height="13" rx="3" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeWidth="1.700" />
    <path d="M2.500 12.500c3 1.800 6 2.700 9.500 2.700s6.500-.9 9.500-2.700" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" />
    <rect x="10" y="12.300" width="4" height="3.600" rx="1" fill="currentColor" />
  </svg>
);

/* Growth bars with a rising arrow */
const GrowthIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <rect x="3.500" y="14" width="4.200" height="7" rx="1.300" fill="currentColor" fillOpacity="0.45" />
    <rect x="9.900" y="10" width="4.200" height="11" rx="1.300" fill="currentColor" fillOpacity="0.7" />
    <rect x="16.300" y="6" width="4.200" height="15" rx="1.300" fill="currentColor" />
    <path d="M4 9.500 9 5.500l3 2.200 5-4.200" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.800 3.600h3.300v3.300" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Wrench and screwdriver, crossed */
const ToolsIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    {/* screwdriver: tip + thick handle */}
    <path d="m4.800 4.800 7 7" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round" />
    <path d="m13.200 13.200 5.200 5.200" stroke="currentColor" strokeOpacity="0.6" strokeWidth="4.600" strokeLinecap="round" />
    {/* wrench: shaft + open head */}
    <path d="m5 19 8.800-8.800" stroke="currentColor" strokeWidth="2.400" strokeLinecap="round" />
    <circle cx="16.600" cy="7.400" r="3.600" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeWidth="1.700" />
    <path d="m17.300 4.400-.4 3 3 .4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* =====================================================================
   1. Four stat cards
   ===================================================================== */
const stats = [
  {
    label: 'Personal Loans',
    value: '$50,000',
    icon: PersonIcon,
    bg: 'bg-gradient-to-br from-[#EDF1FF] to-[#D3DEFF]',
    ring: 'ring-[#396AFF]/20',
    color: 'text-[#396AFF]',
  },
  {
    label: 'Corporate Loans',
    value: '$100,000',
    icon: BriefcaseIcon,
    bg: 'bg-gradient-to-br from-[#FFF7E0] to-[#FFEBB5]',
    ring: 'ring-[#FFBB38]/25',
    color: 'text-[#FFB020]',
  },
  {
    label: 'Business Loans',
    value: '$500,000',
    icon: GrowthIcon,
    bg: 'bg-gradient-to-br from-[#FFEAF1] to-[#FFCFE0]',
    ring: 'ring-[#FF82AC]/20',
    color: 'text-[#FF6B9C]',
  },
  {
    label: 'Custom Loans',
    value: 'Choose Money',
    icon: ToolsIcon,
    bg: 'bg-gradient-to-br from-[#E6FBF9] to-[#C4F3EE]',
    ring: 'ring-[#16DBCC]/20',
    color: 'text-[#16DBCC]',
  },
];

const StatCards: React.FC = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-[30px]">
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
          <p className="truncate text-xl font-semibold text-[#232323] sm:text-2xl">{item.value}</p>
        </div>
      </div>
    ))}
  </div>
);

/* =====================================================================
   2. Active Loans Overview (table)
   ===================================================================== */
interface LoanRow {
  no: string;
  loanMoney: string;
  leftToRepay: string;
  duration: string;
  interestRate: string;
  installment: string;
}

const loans: LoanRow[] = [
  { no: '01.', loanMoney: '$100,000', leftToRepay: '$40,500', duration: '8 Months', interestRate: '12%', installment: '$2,000 / month' },
  { no: '02.', loanMoney: '$500,000', leftToRepay: '$250,000', duration: '36 Months', interestRate: '10%', installment: '$8,000 / month' },
  { no: '03.', loanMoney: '$900,000', leftToRepay: '$40,500', duration: '12 Months', interestRate: '12%', installment: '$5,000 / month' },
  { no: '04.', loanMoney: '$50,000', leftToRepay: '$40,500', duration: '25 Months', interestRate: '5%', installment: '$2,000 / month' },
  { no: '05.', loanMoney: '$50,000', leftToRepay: '$40,500', duration: '5 Months', interestRate: '16%', installment: '$10,000 / month' },
  { no: '06.', loanMoney: '$80,000', leftToRepay: '$25,500', duration: '14 Months', interestRate: '8%', installment: '$2,000 / month' },
  { no: '07.', loanMoney: '$12,000', leftToRepay: '$5,500', duration: '9 Months', interestRate: '13%', installment: '$500 / month' },
  { no: '08.', loanMoney: '$160,000', leftToRepay: '$100,800', duration: '3 Months', interestRate: '12%', installment: '$900 / month' },
];

const totals = {
  loanMoney: '$125,000',
  leftToRepay: '$750,000',
  installment: '$50,000 / month',
};

const handleRepay = (row: LoanRow) => {
  // Connect your repay logic here
  console.log('Repay loan', row.no);
};

const ActiveLoans: React.FC = () => (
  <section className="min-w-0">
    <h2 className={sectionTitle}>Active Loans Overview</h2>

    {/* White card (scrolls sideways on small screens) */}
    <div className="overflow-x-auto rounded-[25px] bg-white px-4 py-3 sm:px-6 sm:py-4">
      <table className="w-full min-w-[860px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#EBEEF2] text-sm text-[#718EBF]">
            <th className="py-3 pr-4 font-medium">SL No</th>
            <th className="py-3 pr-4 font-medium">Loan Money</th>
            <th className="py-3 pr-4 font-medium">Left to repay</th>
            <th className="py-3 pr-4 font-medium">Duration</th>
            <th className="py-3 pr-4 font-medium">Interest rate</th>
            <th className="py-3 pr-4 font-medium">Installment</th>
            <th className="py-3 font-medium">Repay</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((row) => (
            <tr key={row.no} className="border-b border-[#EBEEF2] text-sm text-[#232323]">
              <td className="whitespace-nowrap py-3 pr-4">{row.no}</td>
              <td className="whitespace-nowrap py-3 pr-4">{row.loanMoney}</td>
              <td className="whitespace-nowrap py-3 pr-4">{row.leftToRepay}</td>
              <td className="whitespace-nowrap py-3 pr-4">{row.duration}</td>
              <td className="whitespace-nowrap py-3 pr-4">{row.interestRate}</td>
              <td className="whitespace-nowrap py-3 pr-4">{row.installment}</td>
              <td className="py-3">
                <button
                  type="button"
                  onClick={() => handleRepay(row)}
                  className="h-[34px] w-[100px] rounded-full border border-[#232323] bg-white text-sm text-[#232323] transition-colors hover:border-[#1814F3] hover:text-[#1814F3] focus-visible:border-[#1814F3] focus-visible:text-[#1814F3] focus-visible:outline-none"
                >
                  Repay
                </button>
              </td>
            </tr>
          ))}

          {/* Total row */}
          <tr className="text-sm font-medium text-[#FE5C73]">
            <td className="whitespace-nowrap py-4 pr-4">Total</td>
            <td className="whitespace-nowrap py-4 pr-4">{totals.loanMoney}</td>
            <td className="whitespace-nowrap py-4 pr-4">{totals.leftToRepay}</td>
            <td className="py-4 pr-4" />
            <td className="py-4 pr-4" />
            <td className="whitespace-nowrap py-4 pr-4">{totals.installment}</td>
            <td className="py-4" />
          </tr>
        </tbody>
      </table>
    </div>
  </section>
);

/* =====================================================================
   The Loans page
   ===================================================================== */
interface LoansProps {
  filter?: string;
}

const Loans: React.FC<LoansProps> = ({ filter = '' }) => {
  const shouldShow = (name: string) => !filter || name.toLowerCase().includes(filter.toLowerCase());

  return (
    <div className="flex flex-col gap-6 xl:gap-[30px]">
      <StatCards />
      {shouldShow('Active Loans Overview') && <ActiveLoans />}
    </div>
  );
};

export default Loans;