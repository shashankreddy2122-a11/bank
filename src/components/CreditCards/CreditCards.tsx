import React, { useState } from 'react';
import { PiCreditCardFill, PiLockKeyFill, PiCaretDownBold } from 'react-icons/pi';
import { FaApple, FaGoogle, FaAppStoreIos } from 'react-icons/fa';

const sectionTitle = 'mb-4 text-lg font-semibold text-[#343C6A] sm:text-[22px]';

/* =====================================================================
   1. My Cards (three cards in a row)
   ===================================================================== */
type CardVariant = 'lightBlue' | 'blue' | 'white';

interface CardData {
  balance: string;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
  variant: CardVariant;
}

const cards: CardData[] = [
  { balance: '$5,756', cardHolder: 'Eddy Cusuma', validThru: '12/22', cardNumber: '3778 **** **** 1234', variant: 'lightBlue' },
  { balance: '$5,756', cardHolder: 'Eddy Cusuma', validThru: '12/22', cardNumber: '3778 **** **** 1234', variant: 'blue' },
  { balance: '$5,756', cardHolder: 'Eddy Cusuma', validThru: '12/22', cardNumber: '3778 **** **** 1234', variant: 'white' },
];

const cardStyles: Record<
  CardVariant,
  { wrapper: string; label: string; strip: string; circle: string; chipBody: string; chipLine: string }
> = {
  lightBlue: {
    wrapper: 'bg-gradient-to-br from-[#2D60FF] to-[#539BFF] text-white',
    label: 'text-white/80',
    strip: 'bg-white/15',
    circle: 'bg-white/50',
    chipBody: 'fill-white',
    chipLine: 'stroke-[#3F7BFF]',
  },
  blue: {
    wrapper: 'bg-gradient-to-br from-[#4C49ED] to-[#0A06F4] text-white',
    label: 'text-white/80',
    strip: 'bg-white/15',
    circle: 'bg-white/50',
    chipBody: 'fill-white',
    chipLine: 'stroke-[#2A27EE]',
  },
  white: {
    wrapper: 'border border-[#DFEAF2] bg-white text-[#343C6A]',
    label: 'text-[#718EBF]',
    strip: 'border-t border-[#DFEAF2]',
    circle: 'bg-[#9199AF]/50',
    chipBody: 'fill-[#B8BDC9]',
    chipLine: 'stroke-white',
  },
};

const ChipIcon: React.FC<{ bodyClass: string; lineClass: string }> = ({ bodyClass, lineClass }) => (
  <svg viewBox="0 0 34 34" fill="none" className="h-[30px] w-[30px]" aria-hidden="true">
    <rect x="1" y="1" width="32" height="32" rx="9" className={bodyClass} />
    <path
      d="M1 12h10c2 0 3 1 3 3v4c0 2-1 3-3 3H1M33 12H23c-2 0-3 1-3 3v4c0 2 1 3 3 3h10M12 1v6c0 1 1 2 2 2h6c1 0 2-1 2-2V1M12 33v-6c0-1 1-2 2-2h6c1 0 2 1 2 2v6"
      strokeWidth="1.6"
      className={lineClass}
    />
  </svg>
);

const BankCard: React.FC<CardData> = ({ balance, cardHolder, validThru, cardNumber, variant }) => {
  const s = cardStyles[variant];

  return (
    <div className={`flex h-[185px] w-full flex-col overflow-hidden rounded-[25px] ${s.wrapper}`}>
      <div className="flex-1 px-5 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <p className={`text-[11px] ${s.label}`}>Balance</p>
            <p className="text-lg font-semibold">{balance}</p>
          </div>
          <ChipIcon bodyClass={s.chipBody} lineClass={s.chipLine} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className={`text-[11px] ${s.label}`}>CARD HOLDER</p>
            <p className="text-sm font-semibold">{cardHolder}</p>
          </div>
          <div>
            <p className={`text-[11px] ${s.label}`}>VALID THRU</p>
            <p className="text-sm font-semibold">{validThru}</p>
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-between px-5 py-3 ${s.strip}`}>
        <p className="text-base tracking-wide sm:text-lg">{cardNumber}</p>
        <div className="flex items-center">
          <span className={`h-[26px] w-[26px] rounded-full ${s.circle}`} />
          <span className={`-ml-2.5 h-[26px] w-[26px] rounded-full ${s.circle}`} />
        </div>
      </div>
    </div>
  );
};

const MyCardsRow: React.FC = () => (
  <section className="min-w-0">
    <h2 className={sectionTitle}>My Cards</h2>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[30px]">
      {cards.map((card, index) => (
        <BankCard key={index} {...card} />
      ))}
    </div>
  </section>
);

/* =====================================================================
   2a. Card Expense Statistics (radial chart)
   ===================================================================== */
const CX = 100;
const CY = 100;
const HOLE = 30;
const INNER_RING = 42;

const polar = (r: number, angle: number) => {
  const rad = (angle * Math.PI) / 180; // 0deg = top, clockwise
  return { x: CX + r * Math.sin(rad), y: CY - r * Math.cos(rad) };
};

const sector = (r0: number, r1: number, a0: number, a1: number) => {
  const largeArc = a1 - a0 > 180 ? 1 : 0;
  const o0 = polar(r1, a0);
  const o1 = polar(r1, a1);
  const i0 = polar(r0, a0);
  const i1 = polar(r0, a1);
  return `M ${o0.x} ${o0.y} A ${r1} ${r1} 0 ${largeArc} 1 ${o1.x} ${o1.y} L ${i1.x} ${i1.y} A ${r0} ${r0} 0 ${largeArc} 0 ${i0.x} ${i0.y} Z`;
};

// Each bank is one quarter; the outer radius shows its share
const bankSlices = [
  { bank: 'ABM Bank', color: '#16DBCC', start: 0, end: 90, radius: 88 },
  { bank: 'BRC Bank', color: '#FF82AC', start: 90, end: 180, radius: 64 },
  { bank: 'MCP Bank', color: '#FFBB38', start: 180, end: 270, radius: 74 },
  { bank: 'DBL Bank', color: '#396AFF', start: 270, end: 360, radius: 78 },
];

const legend = [
  { bank: 'DBL Bank', color: 'bg-[#396AFF]' },
  { bank: 'BRC Bank', color: 'bg-[#FF82AC]' },
  { bank: 'ABM Bank', color: 'bg-[#16DBCC]' },
  { bank: 'MCP Bank', color: 'bg-[#FFBB38]' },
];

const CardExpenseStatistics: React.FC = () => (
  <section className="flex min-w-0 flex-col">
    <h2 className={sectionTitle}>Card Expense Statistics</h2>

    <div className="flex flex-1 flex-col items-center justify-center gap-5 rounded-[25px] bg-white p-5 sm:p-6">
      <svg
        viewBox="0 0 200 200"
        className="h-auto w-full max-w-[200px]"
        role="img"
        aria-label="Card expense statistics by bank"
      >
        <defs>
          <filter id="slice-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1B2559" floodOpacity="0.18" />
          </filter>
        </defs>

        <g filter="url(#slice-shadow)">
          {bankSlices.map((slice) => (
            <g key={slice.bank}>
              <path
                d={sector(HOLE, slice.radius, slice.start, slice.end)}
                fill={slice.color}
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              {/* Darker inner ring */}
              <path
                d={sector(HOLE, INNER_RING, slice.start, slice.end)}
                fill="#000000"
                fillOpacity="0.1"
              />
            </g>
          ))}
        </g>

        <circle cx={CX} cy={CY} r={HOLE} fill="#FFFFFF" />
      </svg>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[#718EBF]">
        {legend.map((item) => (
          <div key={item.bank} className="flex items-center gap-2">
            <span className={`h-3 w-3 shrink-0 rounded-full ${item.color}`} />
            <span className="whitespace-nowrap">{item.bank}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* =====================================================================
   2b. Card List
   ===================================================================== */
const cardList = [
  { type: 'Secondary', bank: 'DBL Bank', number: '**** **** 5600', name: 'William', bg: 'bg-[#E7EDFF]', color: 'text-[#396AFF]' },
  { type: 'Secondary', bank: 'BRC Bank', number: '**** **** 4300', name: 'Michel', bg: 'bg-[#FFE0EB]', color: 'text-[#FF82AC]' },
  { type: 'Secondary', bank: 'ABM Bank', number: '**** **** 7560', name: 'Edward', bg: 'bg-[#FFF5D9]', color: 'text-[#FFBB38]' },
];

const Field: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="min-w-0">
    <p className="truncate text-sm font-semibold text-[#232323]">{label}</p>
    <p className="truncate text-xs text-[#718EBF] sm:text-sm">{value}</p>
  </div>
);

const CardList: React.FC = () => (
  <section className="flex min-w-0 flex-col">
    <h2 className={sectionTitle}>Card List</h2>

    <div className="flex flex-1 flex-col gap-4">
      {cardList.map((item) => (
        <div
          key={item.number}
          className="grid flex-1 grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-3 rounded-[20px] bg-white px-4 py-4 sm:px-5 md:grid-cols-[48px_1fr_1fr_1.4fr_1fr_auto] md:gap-4"
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${item.bg}`}>
            <PiCreditCardFill size={24} className={item.color} />
          </div>

          {/* Phones: only the card number. Larger screens: all fields. */}
          <div className="md:hidden">
            <Field label={item.bank} value={item.number} />
          </div>
          <div className="hidden md:block">
            <Field label="Card Type" value={item.type} />
          </div>
          <div className="hidden md:block">
            <Field label="Bank" value={item.bank} />
          </div>
          <div className="hidden md:block">
            <Field label="Card Number" value={item.number} />
          </div>
          <div className="hidden md:block">
            <Field label="Name on Card" value={item.name} />
          </div>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="whitespace-nowrap text-xs font-medium text-[#1814F3] hover:underline sm:text-sm"
          >
            View Details
          </a>
        </div>
      ))}
    </div>
  </section>
);

/* =====================================================================
   3a. Add New Card (form)
   ===================================================================== */
const inputClass =
  'h-[50px] w-full rounded-[15px] border border-[#DFEAF2] bg-white px-5 text-sm text-[#343C6A] outline-none placeholder:text-[#718EBF] focus:border-[#2D60FF] focus:ring-2 focus:ring-[#2D60FF]/20';

const AddNewCard: React.FC = () => {
  const [cardType, setCardType] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');

  const handleAddCard = () => {
    // Connect your "add card" logic here
    console.log({ cardType, nameOnCard, cardNumber, expiration });
    setCardType('');
    setNameOnCard('');
    setCardNumber('');
    setExpiration('');
  };

  return (
    <section className="flex min-w-0 flex-col">
      <h2 className={sectionTitle}>Add New Card</h2>

      <div className="flex-1 rounded-[25px] bg-white p-5 sm:p-6">
        <p className="mb-6 text-sm leading-6 text-[#718EBF]">
          Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned
          to a Cardholder, with a credit limit, that can be used to purchase goods and services on
          credit or obtain cash advances.
        </p>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          {/* Card Type */}
          <div>
            <label htmlFor="card-type" className="mb-2 block text-sm text-[#232323]">
              Card Type
            </label>
            <div className="relative">
              <select
                id="card-type"
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                className={`${inputClass} appearance-none pr-10 ${cardType ? '' : 'text-[#718EBF]'}`}
              >
                <option value="" disabled>
                  Classic
                </option>
                <option value="Classic">Classic</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
              <PiCaretDownBold
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718EBF]"
              />
            </div>
          </div>

          {/* Name on Card */}
          <div>
            <label htmlFor="name-on-card" className="mb-2 block text-sm text-[#232323]">
              Name On Card
            </label>
            <input
              id="name-on-card"
              type="text"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              placeholder="My Cards"
              className={inputClass}
            />
          </div>

          {/* Card Number */}
          <div>
            <label htmlFor="card-number" className="mb-2 block text-sm text-[#232323]">
              Card Number
            </label>
            <input
              id="card-number"
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="**** **** **** ****"
              className={inputClass}
            />
          </div>

          {/* Expiration Date */}
          <div>
            <label htmlFor="expiration" className="mb-2 block text-sm text-[#232323]">
              Expiration Date
            </label>
            <input
              id="expiration"
              type="text"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              placeholder="25 January 2025"
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddCard}
          className="mt-6 h-[50px] w-full rounded-[15px] bg-[#1814F3] px-8 text-sm font-medium text-white transition-colors hover:bg-[#2D60FF] sm:w-auto sm:text-base"
        >
          Add Card
        </button>
      </div>
    </section>
  );
};

/* =====================================================================
   3b. Card Setting
   ===================================================================== */
const settings = [
  {
    title: 'Block Card',
    note: 'Instantly block your card',
    icon: <PiCreditCardFill size={24} className="text-[#FFBB38]" />,
    bg: 'bg-[#FFF5D9]',
  },
  {
    title: 'Change Pin Code',
    note: 'Withdraw without any card',
    icon: <PiLockKeyFill size={24} className="text-[#396AFF]" />,
    bg: 'bg-[#E7EDFF]',
  },
  {
    title: 'Add to Google Pay',
    note: 'Withdraw without any card',
    icon: <FaGoogle size={22} className="text-[#FF82AC]" />,
    bg: 'bg-[#FFE0EB]',
  },
  {
    title: 'Add to Apple Pay',
    note: 'Withdraw without any card',
    icon: <FaApple size={24} className="text-[#16DBCC]" />,
    bg: 'bg-[#DCFAF8]',
  },
  {
    title: 'Add to Apple Store',
    note: 'Withdraw without any card',
    icon: <FaAppStoreIos size={24} className="text-[#16DBCC]" />,
    bg: 'bg-[#DCFAF8]',
  },
];

const CardSetting: React.FC = () => (
  <section className="flex min-w-0 flex-col">
    <h2 className={sectionTitle}>Card Setting</h2>

    <div className="flex flex-1 flex-col justify-between gap-4 rounded-[25px] bg-white p-5 sm:p-6">
      {settings.map((item) => (
        <button
          key={item.title}
          type="button"
          className="flex items-center gap-4 rounded-xl text-left transition-opacity hover:opacity-80"
        >
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${item.bg}`}
          >
            {item.icon}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-[#333B69]">{item.title}</span>
            <span className="block truncate text-xs text-[#718EBF]">{item.note}</span>
          </span>
        </button>
      ))}
    </div>
  </section>
);

/* =====================================================================
   The Credit Cards page
   ===================================================================== */
interface CreditCardsProps {
  filter?: string;
}

const CreditCards: React.FC<CreditCardsProps> = ({ filter = '' }) => {
  const shouldShow = (name: string) => !filter || name.toLowerCase().includes(filter.toLowerCase());

  return (
    <div className="flex flex-col gap-6 xl:gap-[30px]">
      <MyCardsRow />

      {/* Row 2: narrow chart on the left, wide Card List on the right */}
      <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)] xl:gap-[30px]">
        {shouldShow('Card Expense Statistics') && <CardExpenseStatistics />}
        {shouldShow('Card List') && <CardList />}
      </div>

      {/* Row 3: wide form on the left, narrow Card Setting on the right */}
      <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] xl:gap-[30px]">
        {shouldShow('Add New Card') && <AddNewCard />}
        {shouldShow('Card Setting') && <CardSetting />}
      </div>
    </div>
  );
};

export default CreditCards;