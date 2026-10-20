'use client';

import React from 'react';
import { ArrowRight, Layers, Bookmark, Plus, Check } from 'lucide-react';
import { Destination } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useSavedPlaces } from '@/context/SavedPlacesContext';
import { useTripPlanner } from '@/context/TripPlannerContext';

export interface ExpeditionCardProps {
  destination: Destination;
  onInspect: (destination: Destination) => void;
}

export function ExpeditionCard({ destination, onInspect }: ExpeditionCardProps) {
  const { isSaved, toggleSave } = useSavedPlaces();
  const { addToItinerary, removeFromItinerary, isInItinerary } = useTripPlanner();
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const saved = isSaved(destination.id);
  const inItinerary = isInItinerary(destination.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`Inspect ${destination.name}, ${destination.category}`}
      onClick={() => onInspect(destination)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onInspect(destination);
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.x !== 0 || tilt.y !== 0
          ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-3px)`
          : undefined,
        transition: 'transform 0.18s ease-out, border-color 0.25s ease, box-shadow 0.25s ease'
      }}
      className="glass-panel rounded-3xl overflow-hidden flex flex-col group border border-slate-800/80 cursor-pointer hover:border-cyan-400/50 hover:shadow-[0_20px_48px_rgba(4,8,20,0.9),0_0_24px_rgba(20,184,166,0.18)] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 select-none"
    >
      {/* Card Image & Overlay */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091124] via-transparent to-black/40" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Badge variant="teal" size="sm">
              {destination.category}
            </Badge>
            {destination.isMumbai && (
              <Badge variant="orange" size="sm">
                Mumbai
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Add to Itinerary Quick Action */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (inItinerary) {
                  removeFromItinerary(destination.id);
                } else {
                  addToItinerary(destination);
                }
              }}
              aria-label={inItinerary ? `Remove ${destination.name} from itinerary` : `Add ${destination.name} to itinerary`}
              title={inItinerary ? 'Remove from Itinerary' : 'Add to Trip Itinerary'}
              className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                inItinerary
                  ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              {inItinerary ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Save / Favorite Action */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(destination.id);
              }}
              aria-label={saved ? `Remove ${destination.name} from favourites` : `Save ${destination.name} to favourites`}
              title={saved ? 'Remove from Favourites' : 'Save to Favourites'}
              className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                saved
                  ? 'bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.6)]'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Highlight Tag & Location Subtext */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider block">
            {destination.highlightTag}
          </span>
          <span className="text-xs text-slate-300">
            {destination.region}, {destination.country}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight line-clamp-1">
              {destination.name}
            </h3>
            <span className="px-2 py-0.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-[10px] font-mono text-cyan-300 shrink-0">
              {destination.elevationMeters}m Alt
            </span>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Terrain Features Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {destination.terrainFeatures.slice(0, 2).map((feat) => (
            <span
              key={feat}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
            >
              {feat}
            </span>
          ))}
          {destination.terrainFeatures.length > 2 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-400">
              +{destination.terrainFeatures.length - 2} more
            </span>
          )}
        </div>

        {/* Card Footer Action */}
        <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-teal-400 font-medium">
            <Layers className="w-3 h-3" />
            <span>3D Spatial Telemetry</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInspect(destination);
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors cursor-pointer group/btn"
          >
            <span>Explore Specs</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
}
