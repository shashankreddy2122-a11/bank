import React, { useState, useEffect } from 'react';
import {
  PiMagnifyingGlassBold,
  PiGearFill,
  PiListBold,
  PiUserFill,
  PiXBold,
} from 'react-icons/pi';
import { useProfilePhoto } from '../../profilePhoto';

interface HeaderProps {
  onMenuClick: () => void;
  onNavigate: (item: string) => void;
  onSearchFilter: (filter: string) => void;
  title?: string; // text on the left, default "Overview"
  activeItem?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onNavigate, onSearchFilter, title = 'Overview', activeItem = 'Dashboard' }) => {
  const [searchText, setSearchText] = useState('');
  const [imgFailed, setImgFailed] = useState(false);

  // The picture chosen in Settings (P.png until you change it)
  const photo = useProfilePhoto();

  // Try again whenever the picture changes
  useEffect(() => {
    setImgFailed(false);
  }, [photo]);

  // Clear the search whenever you move to another page
  useEffect(() => {
    setSearchText('');
  }, [activeItem]);

  // Handle search input - pass filter to parent
  useEffect(() => {
    onSearchFilter(searchText);
  }, [searchText, onSearchFilter]);

  return (
    <header
      className="
        sticky top-0 z-20 lg:static
        flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4
        w-full max-w-[1441px] sm:h-20
        bg-white px-4 py-3 sm:px-6 sm:py-0 lg:px-8
        shadow-sm lg:shadow-none
        opacity-100
      "
    >
      {/* Left side: hamburger (mobile) + title text */}
      <div className="flex items-center gap-3 sm:mr-auto min-w-0">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-[#F5F7FA] text-[#343C6A] hover:text-[#2D60FF] transition-colors"
        >
          <PiListBold size={22} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-[#343C6A] truncate">
          {title}
        </h2>
      </div>

      {/* Settings, Profile */}
      <div className="order-2 sm:order-3 ml-auto sm:ml-0 flex items-center gap-2 sm:gap-3 lg:gap-4">
        {/* Settings icon in a circle */}
        <button
          type="button"
          aria-label="Settings"
          onClick={() => onNavigate('Settings')}
          className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F5F7FA] text-[#718EBF] hover:text-[#2D60FF] transition-colors"
        >
          <PiGearFill size={20} />
        </button>

        {/* Profile picture in a circle */}
        <button
          type="button"
          aria-label="Profile"
          onClick={() => onNavigate('Settings')}
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#DCE4FF] text-[#343C6A] hover:bg-[#C5D4FF] transition-colors"
        >
          {imgFailed ? (
            <PiUserFill size={20} />
          ) : (
            <img
              src={photo}
              alt="Profile"
              onError={() => setImgFailed(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
            />
          )}
        </button>
      </div>

      {/* Search bar */}
      <div className="order-3 sm:order-2 flex items-center gap-2 w-full sm:w-44 md:w-52 lg:w-60 h-10 sm:h-11 px-4 rounded-full bg-[#F5F7FA] focus-within:ring-2 focus-within:ring-[#2D60FF]">
        <PiMagnifyingGlassBold size={18} className="text-[#718EBF] shrink-0" />
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for something"
          aria-label="Search sections on this page"
          className="w-full min-w-0 bg-transparent text-sm text-[#343C6A] placeholder:text-[#718EBF] outline-none"
        />

        {/* Clear button, shown only when something is typed */}
        {searchText && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setSearchText('')}
            className="shrink-0 text-[#718EBF] hover:text-[#2D60FF] transition-colors"
          >
            <PiXBold size={16} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;