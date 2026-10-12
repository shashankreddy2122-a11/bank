import React from 'react';

interface DayData {
  day: string;
  withdraw: number;
  deposit: number;
}

const MAX_VALUE = 500;
const TICKS = [0, 100, 200, 300, 400, 500];

const data: DayData[] = [
  { day: 'Sat', withdraw: 480, deposit: 245 },
  { day: 'Sun', withdraw: 350, deposit: 130 },
  { day: 'Mon', withdraw: 330, deposit: 265 },
  { day: 'Tue', withdraw: 480, deposit: 370 },
  { day: 'Wed', withdraw: 150, deposit: 245 },
  { day: 'Thu', withdraw: 390, deposit: 245 },
  { day: 'Fri', withdraw: 395, deposit: 340 },
];

const toPercent = (value: number) => `${(value / MAX_VALUE) * 100}%`;

interface WeeklyActivityProps {
  filter?: string;
}

const WeeklyActivity: React.FC<WeeklyActivityProps> = ({ filter = '' }) => {
  const sectionName = 'Weekly Activity';
  const shouldShow = !filter || sectionName.toLowerCase().includes(filter.toLowerCase());

  if (!shouldShow) return null;

  return (
    <section className="flex w-full min-w-0 flex-col opacity-100">
      {/* Title */}
      <h2 className="mb-4 text-lg font-semibold text-[#343C6A] sm:text-[22px]">
        {sectionName}
      </h2>

      {/* White card */}
        <div className="flex-1 rounded-[25px] bg-white p-4 sm:p-6">
        {/* Legend (right side) */}
        <div className="mb-4 flex items-center justify-end gap-4 text-xs text-[#718EBF] sm:gap-6 sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-full bg-[#16DBCC] sm:h-4 sm:w-4" />
            Deposit
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-full bg-[#1814F3] sm:h-4 sm:w-4" />
            Withdraw
          </div>
        </div>

        {/* Chart */}
        <div role="img" aria-label="Weekly deposits and withdrawals bar chart">
          {/* Plot area */}
          <div className="relative h-[200px] sm:h-[240px]">
            {/* Y-axis labels + grid lines */}
            {TICKS.map((tick) => (
              <div
                key={tick}
                className="absolute inset-x-0 flex translate-y-1/2 items-center"
                style={{ bottom: toPercent(tick) }}
              >
                <span className="w-8 shrink-0 text-[11px] text-[#718EBF] sm:w-10 sm:text-xs">
                  {tick}
                </span>
                <span className="h-px flex-1 bg-[#F3F3F5]" />
              </div>
            ))}

            {/* Bars: 7 equal columns, pushed right of the y-axis labels */}
            <div className="absolute inset-y-0 left-8 right-0 grid grid-cols-7 sm:left-10">
              {data.map((item) => (
                <div
                  key={item.day}
                  className="flex h-full items-end justify-center gap-1 sm:gap-2"
                >
                  <div
                    title={`${item.day} withdraw: ${item.withdraw}`}
                    className="w-2.5 rounded-full bg-[#1814F3] sm:w-3.5 lg:w-[15px]"
                    style={{ height: toPercent(item.withdraw) }}
                  />
                  <div
                    title={`${item.day} deposit: ${item.deposit}`}
                    className="w-2.5 rounded-full bg-[#16DBCC] sm:w-3.5 lg:w-[15px]"
                    style={{ height: toPercent(item.deposit) }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* X-axis day labels */}
          <div className="mt-3 grid grid-cols-7 pl-8 text-center text-[11px] text-[#718EBF] sm:pl-10 sm:text-xs">
            {data.map((item) => (
              <span key={item.day}>{item.day}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyActivity;