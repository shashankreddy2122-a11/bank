import { useEffect, useState } from 'react';

export const DEFAULT_PHOTO = '/assets/P.png';

const PROFILE_KEY = 'bankdash-profile'; // same key the Settings page already uses
const PHOTO_EVENT = 'bankdash-photo-change';

// The saved picture, or the default one if nothing was saved yet
export const getSavedPhoto = (): string => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.photo === 'string' && parsed.photo) return parsed.photo;
    }
  } catch {
    // ignore broken or blocked storage
  }
  return DEFAULT_PHOTO;
};

// Tell the rest of the app that the picture changed
export const notifyPhotoChange = () => window.dispatchEvent(new Event(PHOTO_EVENT));

// Store only the picture (keeps the saved form data as it is) and tell the header
export const savePhoto = (photo: string) => {
  let current: Record<string, unknown> = {};
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) current = JSON.parse(raw);
  } catch {
    // start fresh if the old data was broken
  }
  localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...current, photo }));
  notifyPhotoChange();
};

// Use this in any component that should always show the current picture
export const useProfilePhoto = (): string => {
  const [photo, setPhoto] = useState<string>(getSavedPhoto);

  useEffect(() => {
    const sync = () => setPhoto(getSavedPhoto());
    window.addEventListener(PHOTO_EVENT, sync);
    window.addEventListener('storage', sync); // also works across browser tabs
    return () => {
      window.removeEventListener(PHOTO_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return photo;
};