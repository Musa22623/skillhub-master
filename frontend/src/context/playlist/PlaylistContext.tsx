
'use client';

import { createContext, useState } from 'react';

interface PlaylistContextType {
  showPlaylist: boolean;
  setShowPlaylist: (show: boolean) => void;
}

export const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [showPlaylist, setShowPlaylist] = useState(false);

  return (
    <PlaylistContext.Provider value={{ showPlaylist, setShowPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}
