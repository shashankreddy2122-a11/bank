import React, { useState } from 'react';
import { ChevronRight, Send } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string; // put your photos in the /public/avatars folder
}

const contacts: Contact[] = [
  { id: 1, name: 'Livia Bator', role: 'CEO', avatar: '/assets/P1.png' },
  { id: 2, name: 'Randy Press', role: 'Director', avatar: '/assets/P2.png' },
  { id: 3, name: 'Workman', role: 'Designer', avatar: '/assets/P3.png' },
];

/* Photo with a fallback to initials if the image is missing */
const Avatar: React.FC<{ name: string; src: string }> = ({ name, src }) => {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#DCE4FF] text-lg font-semibold text-[#343C6A]">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
};

interface QuickTransferProps {
  onSend?: (contact: Contact, amount: string) => void;
  filter?: string;
}

const QuickTransfer: React.FC<QuickTransferProps> = ({ onSend, filter = '' }) => {
  const sectionName = 'Quick Transfer';
  const shouldShow = !filter || sectionName.toLowerCase().includes(filter.toLowerCase());

  if (!shouldShow) return null;
  const [selectedId, setSelectedId] = useState<number>(contacts[0].id);
  const [amount, setAmount] = useState<string>('');

  // Arrow button: select the next contact (goes back to the first after the last)
  const selectNext = () => {
    const index = contacts.findIndex((c) => c.id === selectedId);
    setSelectedId(contacts[(index + 1) % contacts.length].id);
  };

  const handleSend = () => {
    const contact = contacts.find((c) => c.id === selectedId);
    if (!contact || !amount.trim()) return;
    onSend?.(contact, amount);
    setAmount('');
  };

  return (
    <section className="w-full min-w-0 max-w-[445px] opacity-100">
      {/* Title */}
      <h2 className="mb-4 text-lg font-semibold text-[#343C6A] sm:text-[22px]">
        Quick Transfer
      </h2>

      {/* White card */}
      <div className="flex min-h-[282px] flex-col justify-between gap-6 rounded-[25px] bg-white p-5 sm:p-6">
        {/* Three equal contacts + next arrow */}
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="grid min-w-0 flex-1 grid-cols-3 gap-2 sm:gap-4">
            {contacts.map((contact) => {
              const isSelected = contact.id === selectedId;

              return (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => setSelectedId(contact.id)}
                  aria-pressed={isSelected}
                  className="flex min-w-0 flex-col items-center text-center"
                >
                  {/* Same size photo for all three */}
                  <span
                    className={`h-[64px] w-[64px] overflow-hidden rounded-full sm:h-[75px] sm:w-[75px] ${
                      isSelected ? 'ring-2 ring-[#2D60FF] ring-offset-2' : ''
                    }`}
                  >
                    <Avatar name={contact.name} src={contact.avatar} />
                  </span>

                  {/* Same text style for all three */}
                  <span className="mt-3 w-full truncate text-sm font-medium text-[#232323] sm:text-base">
                    {contact.name}
                  </span>
                  <span className="w-full truncate text-xs text-[#718EBF] sm:text-sm">
                    {contact.role}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Select next contact"
            onClick={selectNext}
            className="mt-5 flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-white text-[#718EBF] shadow-[0_4px_18px_rgba(0,0,0,0.1)] transition-colors hover:text-[#2D60FF] sm:mt-6 sm:h-[50px] sm:w-[50px]"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Write amount + Send */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <label
            htmlFor="transfer-amount"
            className="shrink-0 text-sm text-[#718EBF] sm:text-base"
          >
            Write Amount
          </label>

          <div className="flex h-[50px] min-w-0 flex-1 items-center rounded-full bg-[#EDF1F7]">
            <input
              id="transfer-amount"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="525.50"
              className="min-w-0 flex-1 bg-transparent pl-5 text-sm text-[#718EBF] outline-none placeholder:text-[#718EBF] sm:text-base"
            />
            <button
              type="button"
              onClick={handleSend}
              className="flex h-[50px] shrink-0 items-center gap-2 rounded-full bg-[#1814F3] px-5 text-sm font-medium text-white shadow-[0_6px_18px_rgba(24,20,243,0.35)] transition-colors hover:bg-[#2D60FF] sm:px-6 sm:text-base"
            >
              Send
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickTransfer;