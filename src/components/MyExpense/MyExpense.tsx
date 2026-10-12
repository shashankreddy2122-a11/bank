import React, { useState } from 'react';

interface MonthData {
  month: string;
  amount: number;
}

const data: MonthData[] = [
  { month: 'Aug', amount: 8000 },
  { month: 'Sep', amount: 14200 },
  { month: 'Oct', amount: 8400 },
  { month: 'Nov', amount: 4000 },
  { month: 'Dec', amount: 12500 },
  { month: 'Jan', amount: 7600 },
];

const MAX_AMOUNT = Math.max(...data.map((d) => d.amount));
const MAX_BAR_PERCENT = 82; // leaves room above the tallest bar for the value label

const formatMoney = (value: number) => `$${value.toLocaleString('en-US')}`;

interface MyExpenseProps {
  filter?: string;
}

const MyExpense: React.FC<MyExpenseProps> = ({ filter = '' }) => {
  const sectionName = 'My Expense';
  const shouldShow = !filter || sectionName.toLowerCase().includes(filter.toLowerCase());

  if (!shouldShow) return null;

  const [selected, setSelected] = useState<string>('Dec');

  return (
    <section className="flex h-full w-full min-w-0 flex-col opacity-100">
      {/* Title */}
      <h2 className="mb-4 text-lg font-semibold text-[#343C6A] sm:text-[22px]">
        {sectionName}
      </h2>

      {/* White card: stretches to match the My Cards height */}
      <div className="flex min-h-[200px] flex-1 flex-col rounded-[25px] bg-white px-4 pb-4 pt-4 sm:px-6 sm:pb-5">
        {/* Bars */}
        <div className="grid min-h-[130px] flex-1 grid-cols-6 gap-2 sm:gap-4">
          {data.map((item) => {
            const isSelected = item.month === selected;
            const percent = (item.amount / MAX_AMOUNT) * MAX_BAR_PERCENT;

            return (
              <button
                key={item.month}
                type="button"
                onClick={() => setSelected(item.month)}
                aria-pressed={isSelected}
                aria-label={`${item.month}: ${formatMoney(item.amount)}`}
                className="relative flex h-full items-end justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#2D60FF]"
              >
                {/* Value label above the selected bar */}
                {isSelected && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-[#343C6A] sm:text-sm"
                    style={{ bottom: `calc(${percent}% + 8px)` }}
                  >
                    {formatMoney(item.amount)}
                  </span>
                )}

                {/* Bar */}
                <span
                  className={`w-full max-w-[34px] rounded-[10px] transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#16DBCC] shadow-[0_0_28px_rgba(22,219,204,0.45)]'
                      : 'bg-[#EDF1F9] hover:bg-[#DDE5F4]'
                  }`}
                  style={{ height: `${percent}%` }}
                />
              </button>
            );
          })}
        </div>

        {/* Month labels */}
        <div className="mt-3 grid grid-cols-6 gap-2 text-center text-xs text-[#718EBF] sm:gap-4 sm:text-sm">
          {data.map((item) => (
            <span key={item.month}>{item.month}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyExpense;