import React from 'react';

interface CardData {
  balance: string;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
  variant: 'blue' | 'white';
}

const cards: CardData[] = [
  {
    balance: '$5,756',
    cardHolder: 'Eddy Cusuma',
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234',
    variant: 'blue',
  },
  {
    balance: '$5,756',
    cardHolder: 'Eddy Cusuma',
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234',
    variant: 'white',
  },
];

interface ChipIconProps {
  bodyClass: string;
  lineClass: string;
}

const ChipIcon: React.FC<ChipIconProps> = ({ bodyClass, lineClass }) => (
  <svg viewBox="0 0 34 34" fill="none" className="h-[30px] w-[30px]" aria-hidden="true">
    <rect x="1" y="1" width="32" height="32" rx="9" className={bodyClass} />
    <path
      d="M1 12h10c2 0 3 1 3 3v4c0 2-1 3-3 3H1M33 12H23c-2 0-3 1-3 3v4c0 2 1 3 3 3h10M12 1v6c0 1 1 2 2 2h6c1 0 2-1 2-2V1M12 33v-6c0-1 1-2 2-2h6c1 0 2 1 2 2v6"
      strokeWidth="1.6"
      className={lineClass}
    />
  </svg>
);

const BankCard: React.FC<CardData> = ({
  balance,
  cardHolder,
  validThru,
  cardNumber,
  variant,
}) => {
  const isBlue = variant === 'blue';

  return (
    // Card height reduced: 235px -> 200px
    <div
      className={`flex h-[200px] w-full flex-col overflow-hidden rounded-[25px] ${
        isBlue
          ? 'bg-gradient-to-br from-[#4C49ED] to-[#0A06F4] text-white'
          : 'border border-[#DFEAF2] bg-white text-[#343C6A]'
      }`}
    >
      {/* Top part */}
      <div className="flex-1 px-5 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <p className={`text-[11px] ${isBlue ? 'text-white/80' : 'text-[#718EBF]'}`}>
              Balance
            </p>
            <p className="text-lg font-semibold">{balance}</p>
          </div>

          <ChipIcon
            bodyClass={isBlue ? 'fill-white' : 'fill-[#343C6A]'}
            lineClass={isBlue ? 'stroke-[#2A27EE]' : 'stroke-white'}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className={`text-[11px] ${isBlue ? 'text-white/80' : 'text-[#718EBF]'}`}>
              CARD HOLDER
            </p>
            <p className="text-sm font-semibold">{cardHolder}</p>
          </div>
          <div>
            <p className={`text-[11px] ${isBlue ? 'text-white/80' : 'text-[#718EBF]'}`}>
              VALID THRU
            </p>
            <p className="text-sm font-semibold">{validThru}</p>
          </div>
        </div>
      </div>

      {/* Bottom strip: card number + two circles */}
      <div
        className={`flex items-center justify-between px-5 py-3 ${
          isBlue ? 'bg-white/15' : 'border-t border-[#DFEAF2]'
        }`}
      >
        <p className="text-base tracking-wide sm:text-lg">{cardNumber}</p>

        <div className="flex items-center">
          <span
            className={`h-[26px] w-[26px] rounded-full ${
              isBlue ? 'bg-white/50' : 'bg-[#9199AF]/50'
            }`}
          />
          <span
            className={`-ml-2.5 h-[26px] w-[26px] rounded-full ${
              isBlue ? 'bg-white/50' : 'bg-[#9199AF]/50'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

interface MyCardsProps {
  filter?: string;
}

const MyCards: React.FC<MyCardsProps> = ({ filter = '' }) => {
  const sectionName = 'My Cards';
  const shouldShow = !filter || sectionName.toLowerCase().includes(filter.toLowerCase());

  if (!shouldShow) return null;

  return (
    <section className="flex h-full w-full min-w-0 flex-col opacity-100">
      {/* Title row */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#343C6A] sm:text-[22px]">{sectionName}</h2>
        <a
          href="#"
          className="text-sm font-semibold text-[#343C6A] hover:text-[#2D60FF] sm:text-base"
        >
          See All
        </a>
      </div>

      {/* Cards: stacked on mobile, side by side from sm */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {cards.map((card, index) => (
          <BankCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
};

export default MyCards;