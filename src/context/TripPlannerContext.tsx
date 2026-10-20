'use client';

import React, { createContext, useContext, useState } from 'react';
import { DESTINATIONS } from '@/data/destinations';
import { Destination, ToastMessage } from '@/types';

interface TripPlannerContextType {
  itinerary: Destination[];
  addToItinerary: (dest: Destination) => void;
  removeFromItinerary: (destId: string) => void;
  moveStop: (fromIndex: number, toIndex: number) => void;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  clearItinerary: () => void;
  isInItinerary: (destId: string) => boolean;
  itineraryCount: number;
  isItineraryOpen: boolean;
  setIsItineraryOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  totalEstimatedDays: number;
  totalSequentialDistanceKm: number;
}

const ITINERARY_STORAGE_KEY = 'terravista_trip_itinerary';

const TripPlannerContext = createContext<TripPlannerContextType | undefined>(undefined);

// Haversine direct coordinate distance in km between two lat/lng points
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function TripPlannerProvider({ children }: { children: React.ReactNode }) {
  // Initialize with initial curated Mumbai highlights stops
  const [itinerary, setItinerary] = useState<Destination[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(ITINERARY_STORAGE_KEY);
        if (stored) {
          const ids: string[] = JSON.parse(stored);
          if (Array.isArray(ids)) {
            const mapped = ids
              .map((id) => DESTINATIONS.find((d) => d.id === id))
              .filter((d): d is Destination => Boolean(d));
            if (mapped.length > 0) return mapped;
          }
        }
      } catch {
        // Fallback
      }
    }
    // Default starter stops
    const defaultIds = ['mumbai-gateway-of-india', 'mumbai-marine-drive', 'mumbai-bandra-fort'];
    return defaultIds
      .map((id) => DESTINATIONS.find((d) => d.id === id))
      .filter((d): d is Destination => Boolean(d));
  });

  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    title: string,
    description?: string,
    type: 'success' | 'info' | 'warning' = 'success'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev.slice(-3), { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const syncStorage = (items: Destination[]) => {
    try {
      localStorage.setItem(
        ITINERARY_STORAGE_KEY,
        JSON.stringify(items.map((i) => i.id))
      );
    } catch {
      // Storage fallback
    }
  };

  const addToItinerary = (dest: Destination) => {
    setItinerary((prev) => {
      if (prev.some((item) => item.id === dest.id)) {
        addToast('Already in Itinerary', `${dest.name} is already included in your trip.`, 'info');
        return prev;
      }
      const next = [...prev, dest];
      syncStorage(next);
      addToast('Added to Itinerary', `Stop #${next.length}: ${dest.name} added.`, 'success');
      return next;
    });
  };

  const removeFromItinerary = (destId: string) => {
    setItinerary((prev) => {
      const removed = prev.find((item) => item.id === destId);
      const next = prev.filter((item) => item.id !== destId);
      syncStorage(next);
      if (removed) {
        addToast('Removed from Itinerary', `${removed.name} removed from your stops.`, 'info');
      }
      return next;
    });
  };

  const moveStop = (fromIndex: number, toIndex: number) => {
    setItinerary((prev) => {
      if (toIndex < 0 || toIndex >= prev.length) return prev;
      const updated = [...prev];
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedItem);
      syncStorage(updated);
      return updated;
    });
  };

  const moveUp = (index: number) => {
    moveStop(index, index - 1);
  };

  const moveDown = (index: number) => {
    moveStop(index, index + 1);
  };

  const clearItinerary = () => {
    setItinerary([]);
    syncStorage([]);
    addToast('Itinerary Cleared', 'All destinations removed from your plan.', 'info');
  };

  const isInItinerary = (destId: string) => {
    return itinerary.some((item) => item.id === destId);
  };

  const totalEstimatedDays = itinerary.reduce((acc, curr) => acc + curr.estimatedDurationDays, 0);

  // Calculate sequential straight-line distance across ordered stops
  const totalSequentialDistanceKm = Math.round(
    itinerary.reduce((acc, curr, index) => {
      if (index === 0) return 0;
      const prev = itinerary[index - 1];
      return acc + haversineDistance(prev.latitude, prev.longitude, curr.latitude, curr.longitude);
    }, 0) * 10
  ) / 10;

  return (
    <TripPlannerContext.Provider
      value={{
        itinerary,
        addToItinerary,
        removeFromItinerary,
        moveStop,
        moveUp,
        moveDown,
        clearItinerary,
        isInItinerary,
        itineraryCount: itinerary.length,
        isItineraryOpen,
        setIsItineraryOpen,
        toasts,
        addToast,
        removeToast,
        totalEstimatedDays,
        totalSequentialDistanceKm
      }}
    >
      {children}
    </TripPlannerContext.Provider>
  );
}

export function useTripPlanner() {
  const context = useContext(TripPlannerContext);
  if (!context) {
    throw new Error('useTripPlanner must be used within a TripPlannerProvider');
  }
  return context;
}
