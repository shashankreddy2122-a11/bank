import React, { useEffect, useRef, useState } from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

const iconBase = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  className,
  'aria-hidden': true as const,
});

/* Pencil: body, tip and a lighter eraser band */
const PencilIcon: React.FC<IconProps> = ({ size = 14, className }) => (
  <svg {...iconBase(size, className)}>
    <path d="m4 20 1-4.500L16.500 4a2.100 2.100 0 0 1 3 3L8 18.500z" fill="currentColor" />
    <path d="m14.500 6 3.500 3.500" stroke="#1814F3" strokeWidth="1.600" strokeLinecap="round" />
    <path d="m4 20 1-4.500 3.500 3.500z" fill="currentColor" fillOpacity="0.6" />
  </svg>
);

const ChevronDownIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg {...iconBase(size, className)}>
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Eye (password is hidden, click to show it) */
const EyeIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...iconBase(size, className)}>
    <path
      d="M2.500 12S6 5.500 12 5.500 21.500 12 21.500 12 18 18.500 12 18.500 2.500 12 2.500 12z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.800"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3.200" fill="currentColor" />
  </svg>
);

/* Eye with a slash (password is showing, click to hide it) */
const EyeOffIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...iconBase(size, className)}>
    <path
      d="M2.500 12S6 5.500 12 5.500 21.500 12 21.500 12 18 18.500 12 18.500 2.500 12 2.500 12z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.800"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3.200" fill="currentColor" />
    <path d="m4 4 16 16" stroke="#FFFFFF" strokeWidth="4.200" strokeLinecap="round" />
    <path d="m4 4 16 16" stroke="currentColor" strokeWidth="1.900" strokeLinecap="round" />
  </svg>
);

/* Default profile picture, shown until you choose your own */
const DefaultAvatar: React.FC = () => (
  <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
    <rect width="96" height="96" fill="#DCE4FF" />
    <path d="M12 96c2-22 16-32 36-32s34 10 36 32z" fill="#2D60FF" />
    <circle cx="48" cy="38" r="17" fill="#343C6A" />
  </svg>
);

/* =====================================================================
   Shared bits
   ===================================================================== */
type Message = { type: 'success' | 'error'; text: string } | null;

// A short message (like "Profile saved.") that hides itself after 3 seconds
const useMessage = () => {
  const [message, setMessage] = useState<Message>(null);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 3000);
    return () => window.clearTimeout(timer);
  }, [message]);

  return [message, setMessage] as const;
};

const MessageText: React.FC<{ message: Message }> = ({ message }) =>
  message ? (
    <p
      role="status"
      className={`text-sm ${message.type === 'success' ? 'text-[#16DBAA]' : 'text-[#FE5C73]'}`}
    >
      {message.text}
    </p>
  ) : null;

const inputClass =
  'h-[50px] w-full rounded-[15px] border border-[#DFEAF2] bg-white px-5 text-sm text-[#343C6A] outline-none placeholder:text-[#718EBF] focus:border-[#2D60FF] focus:ring-2 focus:ring-[#2D60FF]/20';

/* On / off switch (used in Preferences and Security) */
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={`relative h-[26px] w-[45px] shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D60FF] ${
      checked ? 'bg-[#16DBCC]' : 'bg-[#E7EDF4]'
    }`}
  >
    <span
      className={`absolute left-[3px] top-[3px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
        checked ? 'translate-x-[19px]' : 'translate-x-0'
      }`}
    />
  </button>
);

/* =====================================================================
   Saved data (localStorage), so a browser refresh keeps everything
   ===================================================================== */
interface ProfileForm {
  yourName: string;
  userName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

interface SavedProfile {
  form: ProfileForm;
  photo: string | null; // the chosen picture, stored as a small image string
}

const PROFILE_KEY = 'bankdash-profile';

// All fields start empty, so the placeholders show
const emptyForm: ProfileForm = {
  yourName: '',
  userName: '',
  email: '',
  password: '',
  dateOfBirth: '',
  presentAddress: '',
  permanentAddress: '',
  city: '',
  postalCode: '',
  country: '',
};

const loadProfile = (): SavedProfile => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SavedProfile>;
      return {
        form: { ...emptyForm, ...(parsed.form ?? {}) },
        photo: typeof parsed.photo === 'string' ? parsed.photo : null,
      };
    }
  } catch {
    console.error('Failed to load saved profile');
  }
  return { form: emptyForm, photo: null };
};

/* Shrink the chosen picture so it fits in browser storage */
const resizeImage = (file: File, maxSize = 400): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not load the image'));
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not process the image'));
          return;
        }

        ctx.fillStyle = '#FFFFFF'; // white behind transparent pictures
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

/* =====================================================================
   Edit Profile tab
   ===================================================================== */
const placeholders: Record<keyof ProfileForm, string> = {
  yourName: 'Enter your name',
  userName: 'Enter your user name',
  email: 'Enter your email',
  password: 'Enter your password',
  dateOfBirth: 'Select your date of birth',
  presentAddress: 'Enter your present address',
  permanentAddress: 'Enter your permanent address',
  city: 'Enter your city',
  postalCode: 'Enter your postal code',
  country: 'Enter your country',
};

interface FieldProps {
  id: keyof ProfileForm;
  label: string;
  type?: string;
  value: string;
  onChange: (id: keyof ProfileForm, value: string) => void;
}

const Field: React.FC<FieldProps> = ({ id, label, type = 'text', value, onChange }) => {
  // The date field is plain text (so the placeholder shows) until you click it or it has a value
  const [focused, setFocused] = useState(false);
  const isDate = type === 'date';
  const inputType = isDate ? (focused || value ? 'date' : 'text') : type;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-sm text-[#232323] sm:text-base">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          placeholder={placeholders[id]}
          onChange={(e) => onChange(id, e.target.value)}
          onFocus={() => isDate && setFocused(true)}
          onBlur={() => isDate && setFocused(false)}
          autoComplete={type === 'password' ? 'new-password' : 'off'}
          className={
            isDate
              ? `${inputClass} appearance-none pr-12 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`
              : inputClass
          }
        />

        {isDate && (
          <ChevronDownIcon
            size={18}
            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#718EBF]"
          />
        )}
      </div>
    </div>
  );
};

const EditProfile: React.FC = () => {
  // Start from whatever was saved before (so a browser refresh keeps your data)
  const [form, setForm] = useState<ProfileForm>(() => loadProfile().form);
  const [photo, setPhoto] = useState<string | null>(() => loadProfile().photo || '/assets/P.png');
  const [message, setMessage] = useMessage();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (id: keyof ProfileForm, value: string) =>
    setForm((prev) => ({ ...prev, [id]: value }));

  // Edit icon: open the file explorer
  const handleChangePhoto = () => fileInputRef.current?.click();

  // A picture was chosen: show it in place of the profile picture
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // lets you pick the same file again later
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please choose an image file.' });
      return;
    }

    try {
      setPhoto(await resizeImage(file));
    } catch {
      setMessage({ type: 'error', text: 'Could not use that picture. Try another one.' });
    }
  };

  // Save: store everything so it is still there after a refresh
  const handleSave = () => {
    try {
      const data: SavedProfile = { form, photo };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
      setMessage({ type: 'success', text: 'Profile saved.' });
    } catch {
      setMessage({ type: 'error', text: 'Could not save. Browser storage is full or blocked.' });
    }
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-10">
      {/* Profile picture with the edit badge (centered on mobile, left on desktop) */}
      <div className="flex shrink-0 justify-center md:justify-start">
        <div className="relative h-[90px] w-[90px]">
          <div className="h-full w-full overflow-hidden rounded-full bg-[#DCE4FF]">
            {photo ? (
              <img src={photo} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <DefaultAvatar />
            )}
          </div>

          <button
            type="button"
            aria-label="Change profile picture"
            onClick={handleChangePhoto}
            className="absolute bottom-0 right-0 flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white bg-[#1814F3] text-white transition-colors hover:bg-[#2D60FF]"
          >
            <PencilIcon size={14} />
          </button>

          {/* Hidden file picker, opened by the edit icon */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Fields + Save */}
      <div className="min-w-0 flex-1">
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:gap-x-12">
          <Field id="yourName" label="Your Name" value={form.yourName} onChange={update} />
          <Field id="userName" label="User Name" value={form.userName} onChange={update} />

          <Field id="email" label="Email" type="email" value={form.email} onChange={update} />
          <Field id="password" label="Password" type="password" value={form.password} onChange={update} />

          <Field id="dateOfBirth" label="Date of Birth" type="date" value={form.dateOfBirth} onChange={update} />
          <Field id="presentAddress" label="Present Address" value={form.presentAddress} onChange={update} />

          <Field id="permanentAddress" label="Permanent Address" value={form.permanentAddress} onChange={update} />
          <Field id="city" label="City" value={form.city} onChange={update} />

          <Field id="postalCode" label="Postal Code" value={form.postalCode} onChange={update} />
          <Field id="country" label="Country" value={form.country} onChange={update} />
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-5">
          <MessageText message={message} />

          <button
            type="button"
            onClick={handleSave}
            className="h-[50px] w-full rounded-[15px] bg-[#1814F3] px-10 text-sm font-medium text-white transition-colors hover:bg-[#2D60FF] sm:w-[190px] sm:text-base"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

/* =====================================================================
   Preferences tab
   ===================================================================== */
interface PreferencesData {
  currency: string;
  timeZone: string;
  digitalCurrency: boolean;
  merchantOrder: boolean;
  recommendations: boolean;
}

const PREFERENCES_KEY = 'bankdash-preferences';

// Same starting positions as your design: first and third switches on, second off
const defaultPreferences: PreferencesData = {
  currency: '',
  timeZone: '',
  digitalCurrency: true,
  merchantOrder: false,
  recommendations: true,
};

const loadPreferences = (): PreferencesData => {
  try {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PreferencesData>;
      return {
        currency: typeof parsed.currency === 'string' ? parsed.currency : '',
        timeZone: typeof parsed.timeZone === 'string' ? parsed.timeZone : '',
        digitalCurrency:
          typeof parsed.digitalCurrency === 'boolean'
            ? parsed.digitalCurrency
            : defaultPreferences.digitalCurrency,
        merchantOrder:
          typeof parsed.merchantOrder === 'boolean'
            ? parsed.merchantOrder
            : defaultPreferences.merchantOrder,
        recommendations:
          typeof parsed.recommendations === 'boolean'
            ? parsed.recommendations
            : defaultPreferences.recommendations,
      };
    }
  } catch {
    // ignore broken or blocked storage and start fresh
  }
  return defaultPreferences;
};

const notificationOptions: { key: 'digitalCurrency' | 'merchantOrder' | 'recommendations'; label: string }[] = [
  { key: 'digitalCurrency', label: 'I send or receive digital currency' },
  { key: 'merchantOrder', label: 'I receive merchant order' },
  { key: 'recommendations', label: 'There are recommendation for my account' },
];

const Preferences: React.FC = () => {
  // Start from whatever was saved before (so a browser refresh keeps your choices)
  const [prefs, setPrefs] = useState<PreferencesData>(loadPreferences);
  const [message, setMessage] = useMessage();

  const handleSave = () => {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
      setMessage({ type: 'success', text: 'Preferences saved.' });
    } catch {
      setMessage({ type: 'error', text: 'Could not save. Browser storage is full or blocked.' });
    }
  };

  return (
    <div>
      {/* Currency + Time Zone */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:gap-x-12">
        <div className="min-w-0">
          <label htmlFor="currency" className="mb-2 block text-sm text-[#232323] sm:text-base">
            Currency
          </label>
          <input
            id="currency"
            type="text"
            value={prefs.currency}
            placeholder="Enter your currency"
            onChange={(e) => setPrefs((p) => ({ ...p, currency: e.target.value }))}
            autoComplete="off"
            className={inputClass}
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="time-zone" className="mb-2 block text-sm text-[#232323] sm:text-base">
            Time Zone
          </label>
          <input
            id="time-zone"
            type="text"
            value={prefs.timeZone}
            placeholder="Enter your time zone"
            onChange={(e) => setPrefs((p) => ({ ...p, timeZone: e.target.value }))}
            autoComplete="off"
            className={inputClass}
          />
        </div>
      </div>

      {/* Notification switches */}
      <h3 className="mb-5 mt-8 text-base font-medium text-[#343C6A] sm:text-lg">Notification</h3>

      <div className="flex flex-col gap-4">
        {notificationOptions.map((option) => (
          <div key={option.key} className="flex items-center gap-4">
            <Toggle
              checked={prefs[option.key]}
              onChange={(value) => setPrefs((p) => ({ ...p, [option.key]: value }))}
              label={option.label}
            />
            <span className="text-sm text-[#232323] sm:text-base">{option.label}</span>
          </div>
        ))}
      </div>

      {/* Save */}
      <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-5">
        <MessageText message={message} />

        <button
          type="button"
          onClick={handleSave}
          className="h-[50px] w-full rounded-[15px] bg-[#1814F3] px-10 text-sm font-medium text-white transition-colors hover:bg-[#2D60FF] sm:w-[190px] sm:text-base"
        >
          Save
        </button>
      </div>
    </div>
  );
};

/* =====================================================================
   Security tab
   ===================================================================== */
interface SecurityData {
  twoFactor: boolean;
  currentPassword: string;
  newPassword: string;
}

const SECURITY_KEY = 'bankdash-security';

// Same starting position as your design: two-factor switch on
const defaultSecurity: SecurityData = {
  twoFactor: true,
  currentPassword: '',
  newPassword: '',
};

const loadSecurity = (): SecurityData => {
  try {
    const raw = localStorage.getItem(SECURITY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SecurityData>;
      return {
        twoFactor:
          typeof parsed.twoFactor === 'boolean' ? parsed.twoFactor : defaultSecurity.twoFactor,
        currentPassword: typeof parsed.currentPassword === 'string' ? parsed.currentPassword : '',
        newPassword: typeof parsed.newPassword === 'string' ? parsed.newPassword : '',
      };
    }
  } catch {
    // ignore broken or blocked storage and start fresh
  }
  return defaultSecurity;
};

/* Password input with an eye button on its right side */
interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ id, label, placeholder, value, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-sm text-[#232323] sm:text-base">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="new-password"
          className={`${inputClass} pr-14`}
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#718EBF] transition-colors hover:bg-[#F5F7FA] hover:text-[#1814F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2D60FF]"
        >
          {visible ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
        </button>
      </div>
    </div>
  );
};

const Security: React.FC = () => {
  // Start from whatever was saved before (so a browser refresh keeps your changes)
  const [data, setData] = useState<SecurityData>(loadSecurity);
  const [message, setMessage] = useMessage();

  const handleSave = () => {
    try {
      localStorage.setItem(SECURITY_KEY, JSON.stringify(data));
      setMessage({ type: 'success', text: 'Security settings saved.' });
    } catch {
      setMessage({ type: 'error', text: 'Could not save. Browser storage is full or blocked.' });
    }
  };

  return (
    <div>
      {/* Two-factor Authentication */}
      <h3 className="mb-5 text-base font-medium text-[#343C6A] sm:text-lg">
        Two-factor Authentication
      </h3>

      <div className="flex items-center gap-4">
        <Toggle
          checked={data.twoFactor}
          onChange={(value) => setData((d) => ({ ...d, twoFactor: value }))}
          label="Enable or disable two factor authentication"
        />
        <span className="text-sm text-[#232323] sm:text-base">
          Enable or disable two factor authentication
        </span>
      </div>

      {/* Change Password */}
      <h3 className="mb-4 mt-8 text-base font-medium text-[#343C6A] sm:text-lg">Change Password</h3>

      <div className="flex max-w-[340px] flex-col gap-5">
        <PasswordField
          id="current-password"
          label="Current Password"
          placeholder="Enter your current password"
          value={data.currentPassword}
          onChange={(value) => setData((d) => ({ ...d, currentPassword: value }))}
        />

        <PasswordField
          id="new-password"
          label="New Password"
          placeholder="Enter your new password"
          value={data.newPassword}
          onChange={(value) => setData((d) => ({ ...d, newPassword: value }))}
        />
      </div>

      {/* Save */}
      <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-5">
        <MessageText message={message} />

        <button
          type="button"
          onClick={handleSave}
          className="h-[50px] w-full rounded-[15px] bg-[#1814F3] px-10 text-sm font-medium text-white transition-colors hover:bg-[#2D60FF] sm:w-[190px] sm:text-base"
        >
          Save
        </button>
      </div>
    </div>
  );
};

/* =====================================================================
   The Settings page (tabs + content)
   ===================================================================== */
type TabKey = 'profile' | 'preferences' | 'security';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'profile', label: 'Edit Profile' },
  { key: 'preferences', label: 'Preferences' },
  { key: 'security', label: 'Security' },
];

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('profile');

  return (
    <section className="min-w-0 rounded-[25px] bg-white px-4 pb-8 pt-5 sm:px-8 sm:pt-6">
      {/* Tabs: on phones the three tabs share the full width, so all are visible without scrolling */}
      <div
        role="tablist"
        className="mb-8 flex w-full border-b border-[#EBEEF2] sm:gap-14"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={`-mb-px flex-1 whitespace-nowrap border-b-[3px] px-1 pb-3 text-center text-[13px] font-medium transition-colors sm:flex-none sm:px-2 sm:text-base ${
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

      {/* All three tabs stay mounted (just hidden), so what you type is kept when you switch tabs */}
      <div className={activeTab === 'profile' ? '' : 'hidden'}>
        <EditProfile />
      </div>

      <div className={activeTab === 'preferences' ? '' : 'hidden'}>
        <Preferences />
      </div>

      <div className={activeTab === 'security' ? '' : 'hidden'}>
        <Security />
      </div>
    </section>
  );
};

export default Settings;