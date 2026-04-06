
'use client';

import { createContext, useState } from 'react';

interface NotificationContextType {
  showNotification: boolean;
  setShowNotification: (show: boolean) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <NotificationContext.Provider value={{ showNotification, setShowNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
