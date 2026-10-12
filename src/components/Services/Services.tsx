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

const SHIELD_PATH = 'M12 2.5 20 5.5v6.2c0 4.7-3.3 8.3-8 9.8-4.7-1.5-8-5.100-8-9.800V5.500z';

/* Shield with a check mark (Safety, Life Insurance) */
const ShieldCheckIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <path d={SHIELD_PATH} fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    {/* darker right half for depth */}
    <path d="M12 2.5 20 5.5v6.2c0 4.7-3.3 8.3-8 9.8z" fill="currentColor" fillOpacity="0.25" />
    <path d="m8.500 12 2.500 2.500 4.500-4.800" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Shield with a heart (Life Insurance card at the top) */
const ShieldHeartIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <path d={SHIELD_PATH} fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 2.5 20 5.5v6.2c0 4.7-3.3 8.3-8 9.8z" fill="currentColor" fillOpacity="0.25" />
    <path
      d="M12 16.200c-2.800-1.800-4-3.100-4-4.700a2.100 2.100 0 0 1 4-.9 2.100 2.100 0 0 1 4 .9c0 1.600-1.200 2.900-4 4.700z"
      fill="currentColor"
    />
  </svg>
);

/* Shopping bag: body, handle, lighter top band, small sparkle */
const ShoppingBagIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <path d="M8.500 8.500V7a3.500 3.500 0 0 1 7 0v1.500" stroke="currentColor" strokeWidth="1.900" strokeLinecap="round" />
    <path d="M4.500 8.500h15l-1.100 11.300a2 2 0 0 1-2 1.800H7.600a2 2 0 0 1-2-1.800z" fill="currentColor" />
    <path d="M4.500 8.500h15l-.2 2.300H4.700z" fill="#FFFFFF" fillOpacity="0.28" />
    <circle cx="9.200" cy="13.500" r="1" fill="#FFFFFF" fillOpacity="0.8" />
    <circle cx="14.800" cy="13.500" r="1" fill="#FFFFFF" fillOpacity="0.8" />
  </svg>
);

/* Hand holding a dollar coin (Business loans) */
const HandCoinIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    {/* coin */}
    <circle cx="12" cy="7.500" r="5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.700" />
    <path d="M12 5v5M13.600 6.200c-.3-.5-.9-.8-1.600-.8-.9 0-1.600.5-1.600 1.200 0 1.700 3.400.8 3.400 2.500 0 .7-.7 1.200-1.800 1.200-.7 0-1.300-.3-1.700-.8" stroke="currentColor" strokeWidth="1.200" strokeLinecap="round" />
    {/* hand */}
    <path
      d="M2.500 15.500h3.300c1 0 2 .3 2.800.9l1.400 1c.4.3.9.4 1.400.4h2.300c.8 0 1.300.9.800 1.500-.2.300-.5.400-.8.400H11"
      stroke="currentColor"
      strokeWidth="1.800"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.800 15.500 14 13.600c1.400-.3 2.500.1 3.500 1l3.500 3.600c.5.500.4 1.300-.2 1.700l-2.300 1.500c-1 .6-2.100.8-3.200.5L11 20.800"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.800"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Briefcase: body, handle, clasp band (Checking accounts) */
const BriefcaseIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <path d="M8.500 7.500V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.500" stroke="currentColor" strokeWidth="1.900" strokeLinecap="round" />
    <rect x="2.500" y="7.500" width="19" height="13" rx="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.700" />
    <path d="M2.500 12.500c3 1.800 6 2.700 9.500 2.700s6.500-.9 9.500-2.700" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" />
    <rect x="10" y="12.300" width="4" height="3.600" rx="1" fill="currentColor" />
  </svg>
);

/* Growth bars with a rising arrow (Savings accounts) */
const GrowthIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <rect x="3.500" y="14" width="4.200" height="7" rx="1.300" fill="currentColor" fillOpacity="0.45" />
    <rect x="9.900" y="10" width="4.200" height="11" rx="1.300" fill="currentColor" fillOpacity="0.7" />
    <rect x="16.300" y="6" width="4.200" height="15" rx="1.300" fill="currentColor" />
    <path d="M4 9.500 9 5.500l3 2.200 5-4.200" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.800 3.600h3.300v3.300" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Person: head and shoulders (Debit and credit cards) */
const PersonIcon: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg {...iconBase(size, className)}>
    <path
      d="M4.500 20.500c0-3.900 3.400-6.500 7.500-6.500s7.500 2.600 7.500 6.500c0 .8-.6 1.500-1.500 1.500h-12c-.9 0-1.500-.7-1.500-1.500z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    <circle cx="12" cy="7.800" r="4.600" fill="currentColor" />
    <path d="M9.200 6.200a3.200 3.200 0 0 1 2.600-1.400" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.300" strokeLinecap="round" />
  </svg>
);

/* =====================================================================
   1. Three top cards
   ===================================================================== */
const topCards = [
  {
    title: 'Life Insurance',
    note: 'Unlimited protection',
    icon: ShieldHeartIcon,
    bg: 'bg-gradient-to-br from-[#EDF1FF] to-[#D3DEFF]',
    ring: 'ring-[#396AFF]/20',
    color: 'text-[#396AFF]',
  },
  {
    title: 'Shopping',
    note: 'Buy. Think. Grow',
    icon: ShoppingBagIcon,
    bg: 'bg-gradient-to-br from-[#FFF7E0] to-[#FFEBB5]',
    ring: 'ring-[#FFBB38]/25',
    color: 'text-[#FFB020]',
  },
  {
    title: 'Safety',
    note: 'We are your allies',
    icon: ShieldCheckIcon,
    bg: 'bg-gradient-to-br from-[#E6FBF9] to-[#C4F3EE]',
    ring: 'ring-[#16DBCC]/20',
    color: 'text-[#16DBCC]',
  },
];

const TopCards: React.FC = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-[30px]">
    {topCards.map((item) => (
      <div
        key={item.title}
        className="flex items-center gap-4 rounded-[25px] bg-white px-5 py-5 sm:px-6"
      >
        <div
          className={`flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full ring-4 sm:h-[70px] sm:w-[70px] ${item.bg} ${item.ring}`}
        >
          <item.icon size={30} className={item.color} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-lg font-semibold text-[#232323] sm:text-xl">{item.title}</p>
          <p className="truncate text-sm text-[#718EBF]">{item.note}</p>
        </div>
      </div>
    ))}
  </div>
);

/* =====================================================================
   2. Bank Services List
   ===================================================================== */
interface ServiceDetail {
  title: string;
  note: string;
}

interface ServiceRow {
  title: string;
  note: string;
  icon: React.FC<IconProps>;
  bg: string;
  color: string;
  details: ServiceDetail[]; // the three middle columns
}

const services: ServiceRow[] = [
  {
    title: 'Business loans',
    note: 'Funding to grow your business',
    icon: HandCoinIcon,
    bg: 'bg-gradient-to-br from-[#FFEAF1] to-[#FFCFE0]',
    color: 'text-[#FF6B9C]',
    details: [
      { title: 'Loan Amount', note: 'Up to $500,000' },
      { title: 'Interest Rate', note: 'From 6.5% p.a.' },
      { title: 'Tenure', note: '1 to 10 years' },
    ],
  },
  {
    title: 'Checking accounts',
    note: 'Everyday banking made simple',
    icon: BriefcaseIcon,
    bg: 'bg-gradient-to-br from-[#FFF7E0] to-[#FFEBB5]',
    color: 'text-[#FFB020]',
    details: [
      { title: 'Minimum Balance', note: '$0 required' },
      { title: 'Monthly Fee', note: 'No monthly fee' },
      { title: 'Transactions', note: 'Unlimited free' },
    ],
  },
  {
    title: 'Savings accounts',
    note: 'Grow your money steadily',
    icon: GrowthIcon,
    bg: 'bg-gradient-to-br from-[#FFEAF1] to-[#FFCFE0]',
    color: 'text-[#FF6B9C]',
    details: [
      { title: 'Interest Rate', note: '4.2% APY' },
      { title: 'Minimum Deposit', note: '$100' },
      { title: 'Withdrawals', note: 'Anytime, no penalty' },
    ],
  },
  {
    title: 'Debit and credit cards',
    note: 'Pay securely, earn rewards',
    icon: PersonIcon,
    bg: 'bg-gradient-to-br from-[#EDF1FF] to-[#D3DEFF]',
    color: 'text-[#396AFF]',
    details: [
      { title: 'Annual Fee', note: '$0 for first year' },
      { title: 'Cashback', note: 'Up to 5% back' },
      { title: 'Credit Limit', note: 'Up to $20,000' },
    ],
  },
  {
    title: 'Life Insurance',
    note: 'Protect the people you love',
    icon: ShieldCheckIcon,
    bg: 'bg-gradient-to-br from-[#E6FBF9] to-[#C4F3EE]',
    color: 'text-[#16DBCC]',
    details: [
      { title: 'Coverage', note: 'Up to $1,000,000' },
      { title: 'Premium', note: 'From $15 / month' },
      { title: 'Policy Term', note: '10 to 30 years' },
    ],
  },
  {
    title: 'Business loans',
    note: 'Working capital for your team',
    icon: HandCoinIcon,
    bg: 'bg-gradient-to-br from-[#FFEAF1] to-[#FFCFE0]',
    color: 'text-[#FF6B9C]',
    details: [
      { title: 'Loan Amount', note: 'Up to $250,000' },
      { title: 'Interest Rate', note: 'From 7.2% p.a.' },
      { title: 'Approval Time', note: 'Within 48 hours' },
    ],
  },
];

const handleViewDetails = (service: ServiceRow) => {
  // Connect your "view details" logic here
  console.log('View details:', service.title);
};

const BankServicesList: React.FC = () => (
  <section className="min-w-0">
    <h2 className={sectionTitle}>Bank Services List</h2>

    <div className="flex flex-col gap-4">
      {services.map((service, index) => (
        <div
          key={`${service.title}-${index}`}
          className="grid grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-3 rounded-[20px] bg-white px-4 py-4 sm:px-5 md:grid-cols-[48px_minmax(0,1.6fr)_1fr_1fr_1fr_auto] md:gap-4"
        >
          {/* Icon tile */}
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${service.bg}`}
          >
            <service.icon size={26} className={service.color} />
          </div>

          {/* Name + short note */}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#232323] sm:text-base">
              {service.title}
            </p>
            <p className="truncate text-xs text-[#718EBF] sm:text-sm">{service.note}</p>
          </div>

          {/* Three detail columns (hidden on phones) */}
          {service.details.map((col, i) => (
            <div key={i} className="hidden min-w-0 md:block">
              <p className="truncate text-sm font-medium text-[#232323] sm:text-base">{col.title}</p>
              <p className="truncate text-xs text-[#718EBF] sm:text-sm">{col.note}</p>
            </div>
          ))}

          {/* View Details button */}
          <button
            type="button"
            onClick={() => handleViewDetails(service)}
            className="h-[34px] whitespace-nowrap rounded-full border border-[#718EBF] bg-white px-4 text-xs text-[#718EBF] transition-colors hover:border-[#1814F3] hover:text-[#1814F3] focus-visible:border-[#1814F3] focus-visible:text-[#1814F3] focus-visible:outline-none sm:w-[100px] sm:px-0 sm:text-sm"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  </section>
);

/* =====================================================================
   The Services page
   ===================================================================== */
interface ServicesProps {
  filter?: string;
}

const Services: React.FC<ServicesProps> = ({ filter = '' }) => {
  const shouldShow = (name: string) => !filter || name.toLowerCase().includes(filter.toLowerCase());

  return (
    <div className="flex flex-col gap-6 xl:gap-[30px]">
      <TopCards />
      {shouldShow('Bank Services List') && <BankServicesList />}
    </div>
  );
};

export default Services;