import React from 'react';
import { PiCreditCardFill, PiCurrencyDollarFill } from 'react-icons/pi';
import { FaPaypal } from 'react-icons/fa';

interface Transaction {
  title: string;
  date: string;
  amount: string;
  type: 'debit' | 'credit';
  icon: React.ReactNode;
  iconBg: string;
}

const transactions: Transaction[] = [
  {
    title: 'Deposit from my Card',
    date: '28 January 2026',
    amount: '-$850',
    type: 'debit',
    icon: <PiCreditCardFill size={22} className="text-[#FFBB38]" />,
    iconBg: 'bg-[#FFF5D9]',
  },
  {
    title: 'Deposit Paypal',
    date: '25 January 2026',
    amount: '+$2,500',
    type: 'credit',
    icon: <FaPaypal size={20} className="text-[#2D60FF]" />,
    iconBg: 'bg-[#E7EDFF]',
  },
  {
    title: 'Jemi Wilson',
    date: '21 January 2026',
    amount: '+$5,200',
    type: 'credit',
    icon: <PiCurrencyDollarFill size={22} className="text-[#16DBCC]" />,
    iconBg: 'bg-[#DCFAF8]',
  },
];

interface RecentTransactionsProps {
  filter?: string;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ filter = '' }) => {
  const sectionName = 'Recent Transactions';
  const shouldShow = !filter || sectionName.toLowerCase().includes(filter.toLowerCase());

  if (!shouldShow) return null;

  return (
    // No max-width now, so it fills the wider column
    <section className="flex h-full w-full min-w-0 flex-col opacity-100">
      {/* Title */}
      <h2 className="mb-4 text-lg font-semibold text-[#343C6A] sm:text-[22px]">
        {sectionName}
      </h2>

      {/* White card: same 200px height as the My Cards cards */}
      <div className="flex min-h-[200px] flex-1 flex-col justify-center gap-3 rounded-[25px] bg-white px-5 py-4 sm:px-6">
        {transactions.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            {/* Icon in a circle */}
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
            >
              {item.icon}
            </div>

            {/* Title + date */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#232323] sm:text-base">
                {item.title}
              </p>
              <p className="text-xs text-[#718EBF]">{item.date}</p>
            </div>

            {/* Amount */}
            <p
              className={`shrink-0 text-sm font-medium sm:text-base ${
                item.type === 'debit' ? 'text-[#FF4B4A]' : 'text-[#41D4A8]'
              }`}
            >
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentTransactions;