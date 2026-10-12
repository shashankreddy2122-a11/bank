import React from 'react';
import {
  WalletCards,
  BadgeDollarSign,
  ReceiptText,
  PiggyBank,
  User,
  Smartphone,
} from 'lucide-react';

import { FaSpotify, FaApple, FaPlaystation } from 'react-icons/fa';

/* ---------- Shared bits ---------- */
const sectionTitle =
  'mb-4 text-lg font-semibold text-[#343C6A] sm:text-[22px]';

/* ---------- 1. Four stat cards ---------- */
const stats = [
  {
    label: 'My Balance',
    value: '$12,750',
    icon: WalletCards,
    bg: 'bg-[#FFF5D9]',
    color: 'text-[#FFBB38]',
  },
  {
    label: 'Income',
    value: '$5,600',
    icon: BadgeDollarSign,
    bg: 'bg-[#E7EDFF]',
    color: 'text-[#396AFF]',
  },
  {
    label: 'Expense',
    value: '$3,460',
    icon: ReceiptText,
    bg: 'bg-[#FFE0EB]',
    color: 'text-[#FF82AC]',
  },
  {
    label: 'Total Saving',
    value: '$7,920',
    icon: PiggyBank,
    bg: 'bg-[#DCFAF8]',
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
          className={`flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full sm:h-[70px] sm:w-[70px] ${item.bg}`}
        >
          <item.icon size={30} className={item.color} />
        </div>

        <div className="min-w-0">
          <p className="text-sm text-[#718EBF]">{item.label}</p>

          <p className="truncate text-xl font-semibold text-[#232323] sm:text-2xl">
            {item.value}
          </p>
        </div>
      </div>
    ))}
  </div>
);

/* ---------- 2. Last Transaction ---------- */

const lastTransactions = [
  {
    title: 'Spotify Subscription',
    date: '25 Jan 2021',
    type: 'Shopping',
    card: '1234 ****',
    status: 'Pending',
    amount: '-$150',
    icon: FaSpotify,
    bg: 'bg-[#DCFAF8]',
    color: 'text-[#16DBCC]',
  },
  {
    title: 'Mobile Service',
    date: '25 Jan 2021',
    type: 'Service',
    card: '1234 ****',
    status: 'Completed',
    amount: '-$340',
    icon: Smartphone,
    bg: 'bg-[#E7EDFF]',
    color: 'text-[#396AFF]',
  },
  {
    title: 'Emilly Wilson',
    date: '25 Jan 2021',
    type: 'Transfer',
    card: '1234 ****',
    status: 'Completed',
    amount: '+$780',
    icon: User,
    bg: 'bg-[#FFE0EB]',
    color: 'text-[#FF82AC]',
  },
];

const LastTransaction: React.FC = () => (
  <section className="flex min-w-0 flex-col">
    <h2 className={sectionTitle}>Last Transaction</h2>

    <div className="flex flex-1 flex-col justify-center gap-5 rounded-[25px] bg-white p-5 sm:p-6">
      {lastTransactions.map((item) => {
        const isExpense = item.amount.startsWith('-');

        return (
          <div
            key={item.title}
            className="grid grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-3 text-sm md:grid-cols-[48px_minmax(0,1.5fr)_1fr_1fr_1fr_auto] md:gap-4"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${item.bg}`}
            >
              <item.icon size={22} className={item.color} />
            </div>

            <div className="min-w-0">
              <p className="truncate font-medium text-[#232323]">
                {item.title}
              </p>

              <p className="text-xs text-[#718EBF]">{item.date}</p>
            </div>

            <p className="hidden text-[#718EBF] md:block">{item.type}</p>

            <p className="hidden text-[#718EBF] md:block">{item.card}</p>

            <p className="hidden text-[#718EBF] md:block">{item.status}</p>

            <p
              className={`text-right font-medium ${
                isExpense ? 'text-[#FE5C73]' : 'text-[#16DBAA]'
              }`}
            >
              {item.amount}
            </p>
          </div>
        );
      })}
    </div>
  </section>
);

/* ---------- 3. My Card ---------- */

interface CardData {
  balance: string;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
}

const card: CardData = {
  balance: '$5,756',
  cardHolder: 'Eddy Cusuma',
  validThru: '12/22',
  cardNumber: '3778 **** **** 1234',
};

interface ChipIconProps {
  bodyClass: string;
  lineClass: string;
}

const ChipIcon: React.FC<ChipIconProps> = ({
  bodyClass,
  lineClass,
}) => (
  <svg
    viewBox="0 0 34 34"
    fill="none"
    className="h-[30px] w-[30px]"
    aria-hidden="true"
  >
    <rect
      x="1"
      y="1"
      width="32"
      height="32"
      rx="9"
      className={bodyClass}
    />

    <path
      d="M1 12h10c2 0 3 1 3 3v4c0 2-1 3-3 3H1M33 12H23c-2 0-3 1-3 3v4c0 2 1 3 3 3h10M12 1v6c0 1 1 2 2 2h6c1 0 2-1 2-2V1M12 33v-6c0-1 1-2 2-2h6c1 0 2 1 2 2v6"
      strokeWidth="1.6"
      className={lineClass}
    />
  </svg>
);

const MyCardSection: React.FC = () => {
  return (
    <section className="flex min-w-0 flex-col">
      
      {/* Title */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#343C6A] sm:text-[22px]">
          My Card
        </h2>

        <a
          href="#"
          className="text-sm font-semibold text-[#343C6A] hover:text-[#2D60FF] sm:text-base"
        >
          See All
        </a>
      </div>

      {/* Card */}
     <div className="flex w-full flex-1 items-start">
  <div
    className="
      flex
      h-[235px]
      w-full
      flex-col
      overflow-hidden
      rounded-[25px]
      bg-gradient-to-br
      from-[#4C49ED]
      to-[#0A06F4]
      text-white
    "
  >
    {/* Top Part */}
    <div className="flex-1 px-5 pt-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-white/80">Balance</p>
          <p className="text-lg font-semibold">{card.balance}</p>
        </div>

        <ChipIcon
          bodyClass="fill-white"
          lineClass="stroke-[#2A27EE]"
        />
      </div>

      {/* Card Holder + Valid Thru */}
      <div className="mt-7 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] text-white/80">
            CARD HOLDER
          </p>
          <p className="text-sm font-semibold">
            {card.cardHolder}
          </p>
        </div>

        <div>
          <p className="text-[11px] text-white/80">
            VALID THRU
          </p>
          <p className="text-sm font-semibold">
            {card.validThru}
          </p>
        </div>
      </div>
    </div>

    {/* Bottom Strip */}
    <div className="flex items-center justify-between bg-white/15 px-5 py-4">
      <p className="text-base tracking-wide sm:text-lg">
        {card.cardNumber}
      </p>

      <div className="flex items-center">
        <span className="h-[26px] w-[26px] rounded-full bg-white/50" />
        <span className="-ml-2.5 h-[26px] w-[26px] rounded-full bg-white/50" />
      </div>
    </div>
  </div>
</div>
    </section>
  );
};

/* ---------- 4. Debit & Credit Overview ---------- */

const weekData = [
  { day: 'Sat', debit: 57, credit: 100 },
  { day: 'Sun', debit: 45, credit: 79 },
  { day: 'Mon', debit: 43, credit: 59 },
  { day: 'Tue', debit: 91, credit: 52 },
  { day: 'Wed', debit: 64, credit: 91 },
  { day: 'Thu', debit: 68, credit: 45 },
  { day: 'Fri', debit: 76, credit: 92 },
];

const DebitCredit: React.FC = () => (
  <section className="flex min-w-0 flex-col">
    <h2 className={sectionTitle}>Debit &amp; Credit Overview</h2>

    <div className="flex flex-1 flex-col rounded-[25px] bg-white p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-[#718EBF] sm:text-sm">
        <p>
          <span className="text-[#343C6A]">$7,560</span> Debited &amp;{' '}
          <span className="text-[#343C6A]">$5,420</span> Credited in this Week
        </p>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-[3px] bg-[#1814F3]" />
            Debit
          </span>

          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-[3px] bg-[#FF82AC]" />
            Credit
          </span>
        </div>
      </div>

      <div className="grid min-h-[170px] flex-1 grid-cols-7 gap-1 sm:gap-3">
        {weekData.map((item) => (
          <div
            key={item.day}
            className="flex items-end justify-center gap-1 sm:gap-2"
          >
            <div
              title={`${item.day} debit`}
              className="w-3 rounded-[8px] bg-[#1814F3] sm:w-4 lg:w-5"
              style={{ height: `${item.debit}%` }}
            />

            <div
              title={`${item.day} credit`}
              className="w-3 rounded-[8px] bg-[#FFAB09] sm:w-4 lg:w-5"
              style={{ height: `${item.credit}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 text-center text-[11px] text-[#718EBF] sm:text-xs">
        {weekData.map((item) => (
          <span key={item.day}>{item.day}</span>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- 5. Invoices Sent ---------- */

const invoices = [
  {
    name: 'Apple Store',
    time: '5h ago',
    amount: '$450',
    icon: FaApple,
    bg: 'bg-[#DCFAF8]',
    color: 'text-[#16DBCC]',
  },
  {
    name: 'Michael',
    time: '2 days ago',
    amount: '$160',
    icon: User,
    bg: 'bg-[#FFF5D9]',
    color: 'text-[#FFBB38]',
  },
  {
    name: 'Playstation',
    time: '5 days ago',
    amount: '$1085',
    icon: FaPlaystation,
    bg: 'bg-[#E7EDFF]',
    color: 'text-[#396AFF]',
  },
  {
    name: 'William',
    time: '10 days ago',
    amount: '$90',
    icon: User,
    bg: 'bg-[#FFE0EB]',
    color: 'text-[#FF82AC]',
  },
];

const InvoicesSent: React.FC = () => (
  <section className="flex min-w-0 flex-col">
    <h2 className={sectionTitle}>Invoices Sent</h2>

    <div className="flex flex-1 flex-col justify-center gap-5 rounded-[25px] bg-white p-5 sm:p-6">
      {invoices.map((item) => (
        <div key={item.name} className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${item.bg}`}
          >
            <item.icon size={22} className={item.color} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[#505887]">
              {item.name}
            </p>

            <p className="text-xs text-[#718EBF]">
              {item.time}
            </p>
          </div>

          <p className="shrink-0 text-sm font-medium text-[#718EBF]">
            {item.amount}
          </p>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- The Accounts page ---------- */
interface AccountsProps {
  filter?: string;
}

const Accounts: React.FC<AccountsProps> = ({ filter = '' }) => {
  const shouldShow = (name: string) => !filter || name.toLowerCase().includes(filter.toLowerCase());

  return (
    <div className="flex w-full flex-col gap-6 xl:gap-[30px]">
      <StatCards />

      <div className="grid w-full grid-cols-1 items-stretch gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] xl:gap-[30px]">
        {shouldShow('Last Transaction') && <LastTransaction />}
        {shouldShow('My Card') && <MyCardSection />}
        {shouldShow('Debit & Credit Overview') && <DebitCredit />}
        {shouldShow('Invoices Sent') && <InvoicesSent />}
      </div>
    </div>
  );
};

export default Accounts;
