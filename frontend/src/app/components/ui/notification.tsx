// components/Notification.tsx
'use client';
import { useEffect, useRef, useState } from 'react';

type NotificationType = 'success' | 'error' | 'info';

type NotificationProps = {
  message: string;
  type: NotificationType;
};

let notify: (message: string, type?: NotificationType) => void;

export const showNotification = (message: string, type: NotificationType = 'success') => {
  if (notify) notify(message, type);
};

export default function Notification() {
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    notify = (message, type = 'success') => {
      setNotification({ message, type });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setNotification(null);
      }, 3000);
    };
  }, []);

  if (!notification) return null;

  const { message, type } = notification;

  const styles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-md shadow-md z-50 transition-transform transform ${
        styles[type]
      }`}
    >
      {message}
    </div>
  );
}
