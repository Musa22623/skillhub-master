
'use client';

import { createContext, useState } from 'react';

interface ProfileContextType {
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <ProfileContext.Provider value={{ showProfile, setShowProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
