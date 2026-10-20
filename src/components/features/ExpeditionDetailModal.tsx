'use client';

import React, { useEffect } from 'react';
import {
  X,
  Compass,
  Thermometer,
  Leaf,
  MapPin,
  Navigation,
  Bookmark,
  Plus,
  Check,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Destination } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useSavedPlaces } from '@/context/SavedPlacesContext';
import { useTripPlanner } from '@/context/TripPlannerContext';

export interface ExpeditionDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onShowOnMap?: (dest: Destination) => void;
}

export function ExpeditionDetailModal({
  destination,
  onClose,
  onShowOnMap
}: ExpeditionDetailModalProps) {
  const { isSaved, toggleSave } = useSavedPlaces();
  const { addToItinerary, isInItinerary } = useTripPlanner();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (destination) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [destination, onClose]);

  if (!destination) return null;

  const saved = isSaved(destination.id);
  const inItinerary = isInItinerary(destination.id);

  const handleShowOnMap = () => {
    onClose();
    if (onShowOnMap) {
      onShowOnMap(destination);
    }
    const mapElement = document.getElementById('interactive-map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl glass-panel rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Scenic Image & Close Button */}
        <div className="relative h-56 sm:h-64 w-full shrink-0">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091124] via-[#091124]/40 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Destination Header Title & Badges */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="teal" size="sm">
                  {destination.category}
                </Badge>
                {destination.isMumbai && (
                  <Badge variant="orange" size="sm">
                    Mumbai Attraction
                  </Badge>
                )}
                <Badge variant="default" size="sm">
                  {destination.biome}
                </Badge>
              </div>
              <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {destination.name}
              </h2>
              <p className="text-xs text-slate-300">
                {destination.region}, {destination.country}
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-right backdrop-blur-md">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">
                Elevation
              </span>
              <span className="text-base font-bold text-cyan-300 font-mono">
                {destination.elevationMeters.toLocaleString()}m
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Action Ribbon: Directions, Map, Save, Itinerary */}
          <div className="flex flex-wrap items-center gap-2.5 pb-2">
            <button
              type="button"
              onClick={handleShowOnMap}
              className="px-3.5 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Show on Map</span>
            </button>

            <button
              type="button"
              onClick={handleOpenDirections}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-orange-400" />
              <span>Open Directions</span>
            </button>

            <button
              type="button"
              onClick={() => toggleSave(destination.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                saved
                  ? 'bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              <span>{saved ? 'Saved in Favourites' : 'Save Destination'}</span>
            </button>

            <button
              type="button"
              onClick={() => addToItinerary(destination)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                inItinerary
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80'
              }`}
            >
              {inItinerary ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>In Trip Itinerary</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>Add to Itinerary</span>
                </>
              )}
            </button>
          </div>

          {/* Overview Description */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Destination Overview
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span className="font-semibold">Coordinates</span>
              </div>
              <span className="font-mono text-slate-200">
                {destination.latitude.toFixed(4)}° N, {destination.longitude.toFixed(4)}° E
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                <Thermometer className="w-3.5 h-3.5" />
                <span className="font-semibold">Climate</span>
              </div>
              <span className="text-slate-200 truncate block" title={destination.climateSummary}>
                {destination.climateSummary}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                <Leaf className="w-3.5 h-3.5" />
                <span className="font-semibold">Eco Rating</span>
              </div>
              <span className="text-slate-200 font-medium">
                {destination.ecoRating} / 5 Low Impact
              </span>
            </div>
          </div>

          {/* Terrain Features */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Key Terrain & Cultural Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {destination.terrainFeatures.map((feat) => (
                <span
                  key={feat}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 flex items-center gap-1.5"
                >
                  <Check className="w-3 h-3 text-teal-400" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Catalog Transparency Notice */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              {destination.curatedNotice || 'Curated Sample Guide • Verified Cultural Information'}
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3 bg-[#070e1e]/90">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Specifications
          </Button>

          <Button
            variant="teal"
            size="sm"
            onClick={handleShowOnMap}
            icon={<MapPin className="w-3.5 h-3.5" />}
          >
            Show on Interactive Map
          </Button>
        </div>
      </div>
    </div>
  );
}
