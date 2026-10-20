'use client';

import React, { useEffect } from 'react';
import { X, Bookmark, Trash2, ArrowUpRight, Compass } from 'lucide-react';
import { useSavedPlaces } from '@/context/SavedPlacesContext';
import { Destination } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export interface SavedPlacesModalProps {
  onSelectDestination?: (dest: Destination) => void;
}

export function SavedPlacesModal({ onSelectDestination }: SavedPlacesModalProps) {
  const { isSavedModalOpen, setIsSavedModalOpen, savedDestinations, toggleSave } = useSavedPlaces();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSavedModalOpen(false);
      }
    };
    if (isSavedModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isSavedModalOpen, setIsSavedModalOpen]);

  if (!isSavedModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsSavedModalOpen(false)}
    >
      <div
        className="relative w-full max-w-xl glass-panel rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 id="saved-modal-title" className="text-lg font-bold text-white tracking-tight">
                Saved Places & Expeditions
              </h2>
              <p className="text-xs text-slate-400">
                {savedDestinations.length} destination{savedDestinations.length === 1 ? '' : 's'} bookmarked in your explorer kit
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSavedModalOpen(false)}
            aria-label="Close saved places"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {savedDestinations.length > 0 ? (
            <div className="space-y-3">
              {savedDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-700/60"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white truncate block">
                          {dest.name}
                        </span>
                        {dest.isMumbai && (
                          <Badge variant="orange" size="sm">
                            Mumbai
                          </Badge>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block truncate">
                        {dest.region}, {dest.country}
                      </span>
                      <span className="text-[10px] text-teal-400 font-mono">
                        Elevation: {dest.elevationMeters}m &bull; {dest.biome}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {onSelectDestination && (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectDestination(dest);
                          setIsSavedModalOpen(false);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-teal-950/80 hover:bg-teal-900 text-teal-300 border border-teal-500/30 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleSave(dest.id)}
                      aria-label={`Remove ${dest.name} from saved`}
                      className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800/80 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Compass className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-300">No Saved Destinations Yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore Mumbai highlights and global biomes and click the bookmark icon on any card to save places here.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-end">
          <Button variant="secondary" size="sm" onClick={() => setIsSavedModalOpen(false)}>
            Close Kit
          </Button>
        </div>
      </div>
    </div>
  );
}
