import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import MyCards from './components/MyCards/MyCards';
import MyExpense from './components/MyExpense/MyExpense';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';
import Accounts from './components/Accounts/Accounts';
import Investments from './components/Investments/Investments';
import CreditCards from './components/CreditCards/CreditCards';
import Loans from './components/Loans/Loans';
import Services from './components/Services/Services';
import Settings from './components/Settings/Settings';
import RecentTransactions from './components/RecentTransactions/RecentTransactions';
import WeeklyActivity from './components/WeeklyActivity/WeeklyActivity';
import ExpenseStatistics from './components/ExpenseStatistics/ExpenseStatistics';
import QuickTransfer from './components/QuickTransfer/QuickTransfer';
import BalanceHistory from './components/BalanceHistory/BalanceHistory';

// Header text for each page. Anything not listed here shows "Overview".
const pageTitles: Record<string, string> = {
  Transactions: 'Transactions',
  Accounts: 'Accounts',
  Investments: 'Investments',
  'Credit Cards': 'Credit Cards',
  Loans: 'Loans',
  Services: 'Services',
  Settings: 'Settings',
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [searchFilter, setSearchFilter] = useState('');

  const isTransactions = activeItem === 'Transactions';
  const isAccounts = activeItem === 'Accounts';
  const isInvestments = activeItem === 'Investments';
  const isCreditCards = activeItem === 'Credit Cards';
  const isLoans = activeItem === 'Loans';
  const isServices = activeItem === 'Services';
  const isSettings = activeItem === 'Settings';

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <Sidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeItem={activeItem}
        onNavigate={setActiveItem}
      />

      {/* lg:border-l draws the line between the sidebar and the header/main page */}
      <div className="min-w-0 flex-1 lg:border-l lg:border-[#DFEAF2]">
        <Header
          onMenuClick={() => setIsMenuOpen(true)}
          onNavigate={setActiveItem}
          onSearchFilter={setSearchFilter}
          title={pageTitles[activeItem] ?? 'Overview'}
          activeItem={activeItem}
        />

        <main className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 xl:gap-[30px]">
          {isTransactions ? (
            /* ---------- Transactions page ---------- */
            <>
              {/* My Cards on the left, My Expense on the right */}
              <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:gap-[30px]">
                <div className="min-w-0 xl:col-start-1 xl:row-start-1">
                  <MyCards filter={searchFilter} />
                </div>

                <div className="flex min-w-0 xl:col-start-2 xl:row-start-1">
                  <MyExpense filter={searchFilter} />
                </div>
              </div>

              {/* Full-width Recent Transactions table under them */}
              <TransactionsTable filter={searchFilter} />
            </>
          ) : isAccounts ? (
            /* ---------- Accounts page ---------- */
            <Accounts filter={searchFilter} />
          ) : isInvestments ? (
            /* ---------- Investments page ---------- */
            <Investments filter={searchFilter} />
          ) : isCreditCards ? (
            /* ---------- Credit Cards page ---------- */
            <CreditCards filter={searchFilter} />
          ) : isLoans ? (
            /* ---------- Loans page ---------- */
            <Loans filter={searchFilter} />
          ) : isServices ? (
            /* ---------- Services page ---------- */
            <Services filter={searchFilter} />
          ) : isSettings ? (
            /* ---------- Settings page ---------- */
            <Settings />
          ) : (
            /* ---------- Dashboard page (unchanged) ---------- */
            <>
              {/* Rows 1 and 2 */}
              <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:gap-[30px]">
                {/* Row 1, left: My Cards */}
                <div className="min-w-0 xl:col-start-1 xl:row-start-1">
                  <MyCards filter={searchFilter} />
                </div>

                {/* Row 1, right: Recent Transactions */}
                <div className="min-w-0 xl:col-start-2 xl:row-start-1">
                  <RecentTransactions filter={searchFilter} />
                </div>

                {/* Row 2, left: Weekly Activity */}
                <div className="flex min-w-0 xl:col-start-1 xl:row-start-2">
                  <WeeklyActivity filter={searchFilter} />
                </div>

                {/* Row 2, right: Expense Statistics */}
                <div className="flex min-w-0 xl:col-start-2 xl:row-start-2">
                  <ExpenseStatistics filter={searchFilter} />
                </div>
              </div>

              {/* Row 3: Quick Transfer fixed at 445px, Balance History fills the rest */}
              <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-[445px_minmax(0,1fr)] xl:gap-[30px]">
                <div className="flex min-w-0">
                  <QuickTransfer filter={searchFilter} />
                </div>

                <div className="flex min-w-0">
                  <BalanceHistory filter={searchFilter} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;