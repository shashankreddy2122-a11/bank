import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';

type TabKey = 'all' | 'income' | 'expense';

interface Transaction {
  id: number;
  description: string;
  transactionId: string;
  type: string;
  card: string;
  date: string;
  amount: number; // negative = expense, positive = income
}

const tabs: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All Transactions' },
  { key: 'income', label: 'Income' },
  { key: 'expense', label: 'Expense' },
];

// First 5 rows are from your image. The rest are sample data so all 4 pages have rows.
const transactions: Transaction[] = [
  { id: 1, description: 'Spotify Subscription', transactionId: '#12548796', type: 'Shopping', card: '1234 ****', date: '28 Jan, 12.30 AM', amount: -2500 },
  { id: 2, description: 'Freepik Sales', transactionId: '#12548796', type: 'Transfer', card: '1234 ****', date: '25 Jan, 10.40 PM', amount: 750 },
  { id: 3, description: 'Mobile Service', transactionId: '#12548796', type: 'Service', card: '1234 ****', date: '20 Jan, 10.40 PM', amount: -150 },
  { id: 4, description: 'Wilson', transactionId: '#12548796', type: 'Transfer', card: '1234 ****', date: '15 Jan, 03.29 PM', amount: -1050 },
  { id: 5, description: 'Emilly', transactionId: '#12548796', type: 'Transfer', card: '1234 ****', date: '14 Jan, 10.40 PM', amount: 840 },

  { id: 6, description: 'Netflix', transactionId: '#12548797', type: 'Shopping', card: '1234 ****', date: '12 Jan, 09.15 AM', amount: -480 },
  { id: 7, description: 'Upwork Payment', transactionId: '#12548798', type: 'Transfer', card: '1234 ****', date: '10 Jan, 04.20 PM', amount: 1900 },
  { id: 8, description: 'Electricity Bill', transactionId: '#12548799', type: 'Service', card: '1234 ****', date: '08 Jan, 11.05 AM', amount: -320 },
  { id: 9, description: 'Jemi Wilson', transactionId: '#12548800', type: 'Transfer', card: '1234 ****', date: '06 Jan, 06.45 PM', amount: 5200 },
  { id: 10, description: 'Grocery Store', transactionId: '#12548801', type: 'Shopping', card: '1234 ****', date: '05 Jan, 01.10 PM', amount: -215 },

  { id: 11, description: 'Dribbble Sales', transactionId: '#12548802', type: 'Transfer', card: '1234 ****', date: '03 Jan, 08.30 PM', amount: 1250 },
  { id: 12, description: 'Internet Plan', transactionId: '#12548803', type: 'Service', card: '1234 ****', date: '02 Jan, 10.00 AM', amount: -90 },
  { id: 13, description: 'Apple Store', transactionId: '#12548804', type: 'Shopping', card: '1234 ****', date: '30 Dec, 05.25 PM', amount: -1299 },
  { id: 14, description: 'Randy Press', transactionId: '#12548805', type: 'Transfer', card: '1234 ****', date: '28 Dec, 02.40 PM', amount: 640 },
  { id: 15, description: 'Gym Membership', transactionId: '#12548806', type: 'Service', card: '1234 ****', date: '26 Dec, 07.15 AM', amount: -60 },

  { id: 16, description: 'Envato Earnings', transactionId: '#12548807', type: 'Transfer', card: '1234 ****', date: '24 Dec, 09.50 PM', amount: 980 },
  { id: 17, description: 'Coffee Shop', transactionId: '#12548808', type: 'Shopping', card: '1234 ****', date: '22 Dec, 08.05 AM', amount: -18 },
  { id: 18, description: 'Livia Bator', transactionId: '#12548809', type: 'Transfer', card: '1234 ****', date: '20 Dec, 03.35 PM', amount: 2100 },
  { id: 19, description: 'Water Bill', transactionId: '#12548810', type: 'Service', card: '1234 ****', date: '18 Dec, 12.20 PM', amount: -75 },
  { id: 20, description: 'Amazon Order', transactionId: '#12548811', type: 'Shopping', card: '1234 ****', date: '16 Dec, 06.10 PM', amount: -430 },
];

const PAGE_SIZE = 5;

const formatAmount = (amount: number) => {
  const sign = amount < 0 ? '-' : '+';
  return `${sign}$${Math.abs(amount).toLocaleString('en-US')}`;
};

interface TransactionsTableProps {
  filter?: string;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ filter = '' }) => {
  const sectionName = 'Recent Transactions';
  const shouldShow = !filter || sectionName.toLowerCase().includes(filter.toLowerCase());

  if (!shouldShow) return null;

  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [page, setPage] = useState<number>(1);

  const filtered = transactions.filter((t) => {
    if (activeTab === 'income') return t.amount > 0;
    if (activeTab === 'expense') return t.amount < 0;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changeTab = (key: TabKey) => {
    setActiveTab(key);
    setPage(1);
  };

  const handleDownload = (item: Transaction) => {
    // Connect your receipt download here
    console.log('Download receipt for', item.transactionId);
  };

  return (
    <section className="w-full min-w-0 opacity-100">
      {/* Title */}
      <h2 className="mb-4 text-lg font-semibold text-[#343C6A] sm:text-[22px]">
        Recent Transactions
      </h2>

      {/* Tabs */}
      <div
        role="tablist"
        className="mb-5 flex gap-6 overflow-x-auto border-b border-[#EBEEF2] sm:gap-12"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => changeTab(tab.key)}
              className={`-mb-px shrink-0 whitespace-nowrap border-b-[3px] px-2 pb-2 text-sm font-medium transition-colors sm:text-base ${
                isActive
                  ? 'border-[#1814F3] text-[#1814F3]'
                  : 'border-transparent text-[#718EBF] hover:text-[#1814F3]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Table card (scrolls sideways on small screens) */}
      <div className="overflow-x-auto rounded-[25px] bg-white px-4 py-3 sm:px-6 sm:py-4">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#EBEEF2] text-sm text-[#718EBF] sm:text-base">
              <th className="py-3 pr-4 font-medium">Description</th>
              <th className="py-3 pr-4 font-medium">Transaction ID</th>
              <th className="py-3 pr-4 font-medium">Type</th>
              <th className="py-3 pr-4 font-medium">Card</th>
              <th className="py-3 pr-4 font-medium">Date</th>
              <th className="py-3 pr-4 font-medium">Amount</th>
              <th className="py-3 font-medium">Receipt</th>
            </tr>
          </thead>

          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[#718EBF]">
                  No transactions found.
                </td>
              </tr>
            )}

            {visible.map((item, index) => {
              const isExpense = item.amount < 0;

              return (
                <tr
                  key={item.id}
                  className={`text-sm text-[#232323] sm:text-base ${
                    index !== visible.length - 1 ? 'border-b border-[#EBEEF2]' : ''
                  }`}
                >
                  {/* Description with arrow icon */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-[#718EBF] text-[#718EBF]">
                        {isExpense ? <ArrowUp size={15} /> : <ArrowDown size={15} />}
                      </span>
                      <span className="whitespace-nowrap">{item.description}</span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-4 pr-4">{item.transactionId}</td>
                  <td className="whitespace-nowrap py-4 pr-4">{item.type}</td>
                  <td className="whitespace-nowrap py-4 pr-4">{item.card}</td>
                  <td className="whitespace-nowrap py-4 pr-4">{item.date}</td>

                  <td
                    className={`whitespace-nowrap py-4 pr-4 font-medium ${
                      isExpense ? 'text-[#FE5C73]' : 'text-[#16DBAA]'
                    }`}
                  >
                    {formatAmount(item.amount)}
                  </td>

                  <td className="py-4">
                    <button
                      type="button"
                      onClick={() => handleDownload(item)}
                      className="rounded-full border border-[#123288] px-4 py-1.5 text-sm text-[#123288] transition-colors hover:bg-[#123288] hover:text-white"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav
        aria-label="Pagination"
        className="mt-5 flex items-center justify-center gap-1 sm:justify-end sm:gap-2"
      >
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-[#1814F3] disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setPage(n)}
            aria-current={n === page ? 'page' : undefined}
            className={`h-9 min-w-[36px] rounded-[10px] px-2 text-sm font-medium transition-colors sm:text-base ${
              n === page ? 'bg-[#1814F3] text-white' : 'text-[#1814F3] hover:bg-[#E7EDFF]'
            }`}
          >
            {n}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-[#1814F3] disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </nav>
    </section>
  );
};

export default TransactionsTable;