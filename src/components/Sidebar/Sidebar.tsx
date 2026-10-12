import React from 'react';
import {
  PiHouseFill,
  PiArrowsLeftRightFill,
  PiUserFill,
  PiTrendUpFill,
  PiCreditCardFill,
  PiHandCoinsFill,
  PiWrenchFill,
  PiGearFill,
  PiXBold,
} from 'react-icons/pi';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string; // which menu item is selected
  onNavigate: (label: string) => void; // called when a menu item is clicked
}

const menuItems = [
  { icon: PiHouseFill, label: 'Dashboard' },
  { icon: PiArrowsLeftRightFill, label: 'Transactions' },
  { icon: PiUserFill, label: 'Accounts' },
  { icon: PiTrendUpFill, label: 'Investments' },
  { icon: PiCreditCardFill, label: 'Credit Cards' },
  { icon: PiHandCoinsFill, label: 'Loans' },
  { icon: PiWrenchFill, label: 'Services' },

  { icon: PiGearFill, label: 'Settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeItem, onNavigate }) => {
  const handleItemClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    onNavigate(label);
    onClose(); // closes the menu on mobile after a click
  };

  return (
    <>
      {/* Sidebar */}
      {/* Mobile: slide-in menu.
          Desktop: stays on screen (sticky) and is as tall as the screen, so it never adds extra white space under the page. */}
      <aside
        className={`
          fixed top-0 left-0 z-40
          h-full w-[220px] shrink-0
          lg:sticky lg:h-screen lg:self-start
          bg-white shadow-lg lg:shadow-none opacity-100
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo + BankDash text (same height as the header) */}
          <div className="flex items-center gap-2 h-20 px-5">
            <img
              src="/assets/l.png"
              alt="Bank Logo"
              className="w-8 h-8 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h1 className="text-xl font-bold text-[#343C6A]">BankDash.</h1>

            {/* Close button (mobile only) */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="lg:hidden ml-auto p-1.5 rounded-lg text-[#718EBF] hover:bg-gray-100"
            >
              <PiXBold size={20} />
            </button>
          </div>

          {/* Navigation menu */}
          <nav className="flex-1 overflow-y-auto py-2">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeItem === item.label;

                return (
                  <li key={item.label}>
                    <a
                      href="#"
                      onClick={(e) => handleItemClick(e, item.label)}
                      className={`relative flex items-center gap-4 px-5 py-3 text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-[#2D60FF] bg-blue-50'
                          : 'text-[#B1B1B1] hover:bg-gray-100 hover:text-[#2D60FF]'
                      }`}
                    >
                      {/* blue bar on the active item */}
                      {isActive && (
                        <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-[#2D60FF]" />
                      )}
                      <item.icon size={22} className="shrink-0" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Dark overlay behind the menu (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;