'use client';

import React, { useEffect } from 'react';
import {
  X,
  Compass,
  ArrowUp,
  ArrowDown,
  Trash2,
  Navigation,
  MapPin,
  Info,
  Clock
} from 'lucide-react';
import { useTripPlanner } from '@/context/TripPlannerContext';
import { Destination } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export interface TripItineraryModalProps {
  onFocusDestinationOnMap?: (dest: Destination) => void;
  onInspectDetails?: (dest: Destination) => void;
}

export function TripItineraryModal({
  onFocusDestinationOnMap,
  onInspectDetails
}: TripItineraryModalProps) {
  const {
    itinerary,
    removeFromItinerary,
    moveUp,
    moveDown,
    clearItinerary,
    isItineraryOpen,
    setIsItineraryOpen,
    totalEstimatedDays,
    totalSequentialDistanceKm
  } = useTripPlanner();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsItineraryOpen(false);
      }
    };
    if (isItineraryOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isItineraryOpen, setIsItineraryOpen]);

  if (!isItineraryOpen) return null;

  const handleFocusOnMap = (dest: Destination) => {
    setIsItineraryOpen(false);
    if (onFocusDestinationOnMap) {
      onFocusDestinationOnMap(dest);
    }
    const mapElement = document.getElementById('interactive-map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openDirections = (dest: Destination) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dest.latitude},${dest.longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="itinerary-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsItineraryOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl glass-panel rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="itinerary-modal-title" className="text-lg font-bold text-white tracking-tight">
                  Trip Planner &bull; Itinerary Stops
                </h2>
                <Badge variant="teal" size="sm">
                  {itinerary.length} Stop{itinerary.length === 1 ? '' : 's'}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Organize and order your exploration journey with coordinate telemetry
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsItineraryOpen(false)}
            aria-label="Close itinerary planner"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry Bar (Cumulative metrics) */}
        {itinerary.length > 0 && (
          <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Est. Duration: <strong className="text-white">{totalEstimatedDays} Days</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Sequential Distance: <strong className="text-teal-300">{totalSequentialDistanceKm} km</strong></span>
              </div>
            </div>

            <button
              type="button"
              onClick={clearItinerary}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Itinerary</span>
            </button>
          </div>
        )}

        {/* Stops List */}
        <div className="p-6 space-y-3 overflow-y-auto flex-1">
          {itinerary.length > 0 ? (
            itinerary.map((dest, index) => {
              const isFirst = index === 0;
              const isLast = index === itinerary.length - 1;

              return (
                <div
                  key={dest.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Stop Number Circle */}
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md">
                      #{index + 1}
                    </div>

                    <div
                      onClick={() => onInspectDetails?.(dest)}
                      className={`flex items-center gap-3.5 min-w-0 ${onInspectDetails ? 'cursor-pointer group' : ''}`}
                    >
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-700/60 group-hover:border-cyan-400 transition-colors"
                      />

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                            {dest.name}
                          </h4>
                          <Badge variant="teal" size="sm">
                            {dest.category}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {dest.region}, {dest.country}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] text-cyan-300 font-mono mt-1">
                          <span>Alt: {dest.elevationMeters}m</span>
                          <span>&bull;</span>
                          <span>{dest.latitude.toFixed(4)}°, {dest.longitude.toFixed(4)}°</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Reordering Controls */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                    {/* Reorder Buttons */}
                    <div className="flex items-center bg-slate-950/80 rounded-xl border border-slate-800 p-0.5">
                      <button
                        type="button"
                        disabled={isFirst}
                        onClick={() => moveUp(index)}
                        aria-label={`Move ${dest.name} earlier in itinerary`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={isLast}
                        onClick={() => moveDown(index)}
                        aria-label={`Move ${dest.name} later in itinerary`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* View on Map */}
                    <button
                      type="button"
                      onClick={() => handleFocusOnMap(dest)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Focus Map</span>
                    </button>

                    {/* Open Directions */}
                    <button
                      type="button"
                      onClick={() => openDirections(dest)}
                      aria-label="Open directions"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5 text-teal-400" />
                    </button>

                    {/* Remove Stop */}
                    <button
                      type="button"
                      onClick={() => removeFromItinerary(dest.id)}
                      aria-label={`Remove ${dest.name} from itinerary`}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800/80 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Compass className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-300">No Itinerary Stops Added Yet</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Add places like Gateway of India, Marine Drive, or Siddhivinayak Temple by clicking &quot;Add to Itinerary&quot; on any card or map popup.
              </p>
            </div>
          )}
        </div>

        {/* Footer & Methodology Transparency */}
        <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <Info className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>Curated Sequence • Straight-line Haversine distance, not road traffic routing</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsItineraryOpen(false)}
            >
              Close Planner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
