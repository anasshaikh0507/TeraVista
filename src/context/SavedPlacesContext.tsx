'use client';

import React, { createContext, useContext, useState } from 'react';
import { DESTINATIONS } from '@/data/destinations';
import { Destination } from '@/types';

interface SavedPlacesContextType {
  savedIds: string[];
  savedDestinations: Destination[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  savedCount: number;
  isSavedModalOpen: boolean;
  setIsSavedModalOpen: (open: boolean) => void;
}

const SavedPlacesContext = createContext<SavedPlacesContextType | undefined>(undefined);

const STORAGE_KEY = 'terravista_saved_destinations';

export function SavedPlacesProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      } catch {
        // Fallback to default
      }
    }
    return ['mumbai-gateway-of-india', 'norway-sunnmore-fjords'];
  });
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage fallback
      }
      return next;
    });
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const savedDestinations = DESTINATIONS.filter((d) => savedIds.includes(d.id));

  return (
    <SavedPlacesContext.Provider
      value={{
        savedIds,
        savedDestinations,
        toggleSave,
        isSaved,
        savedCount: savedIds.length,
        isSavedModalOpen,
        setIsSavedModalOpen
      }}
    >
      {children}
    </SavedPlacesContext.Provider>
  );
}

export function useSavedPlaces() {
  const context = useContext(SavedPlacesContext);
  if (!context) {
    throw new Error('useSavedPlaces must be used within a SavedPlacesProvider');
  }
  return context;
}
