'use client';

import React, { useState, useMemo } from 'react';
import {
  Compass,
  Sparkles,
  Navigation,
  Search,
  ChevronDown,
  MapPin,
  X,
  ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CinematicTerrainCanvas } from '@/components/3d/CinematicTerrainCanvas';
import { DESTINATIONS } from '@/data/destinations';
import { Destination } from '@/types';

export interface HeroSectionProps {
  onSearchSubmit?: (query: string) => void;
  searchQuery?: string;
  onSelectDestination?: (dest: Destination) => void;
}

export function HeroSection({
  onSearchSubmit,
  searchQuery = '',
  onSelectDestination
}: HeroSectionProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);

  // Filter matching destinations while typing
  const liveResults = useMemo(() => {
    if (!localQuery.trim()) return [];
    const q = localQuery.toLowerCase();
    return DESTINATIONS.filter((d) => {
      const nameMatch = d.name.toLowerCase().includes(q);
      const categoryMatch = d.category.toLowerCase().includes(q);
      const regionMatch = d.region.toLowerCase().includes(q);
      const countryMatch = d.country.toLowerCase().includes(q);
      const featureMatch = d.terrainFeatures.some((f) => f.toLowerCase().includes(q));
      return nameMatch || categoryMatch || regionMatch || countryMatch || featureMatch;
    }).slice(0, 5);
  }, [localQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(localQuery);
    }
    const destSection = document.getElementById('destinations');
    if (destSection) {
      destSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickTag = (tag: string) => {
    setLocalQuery(tag);
    if (onSearchSubmit) {
      onSearchSubmit(tag);
    }
    const destSection = document.getElementById('destinations');
    if (destSection) {
      destSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectResult = (dest: Destination) => {
    setIsFocused(false);
    if (onSelectDestination) {
      onSelectDestination(dest);
    }
    // Scroll to interactive map and focus
    const mapElement = document.getElementById('interactive-map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    if (onSearchSubmit) {
      onSearchSubmit('');
    }
  };

  const handleScrollDown = () => {
    const target = document.getElementById('destinations');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-exploration"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-28 pb-12 overflow-hidden"
    >
      {/* Immersive 3D Landscape Canvas (Mountains, Ocean, Cliffs, Clouds, Sunlight) */}
      <CinematicTerrainCanvas />

      {/* Atmospheric Vignette & Color Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#040814]/80 via-transparent to-transparent pointer-events-none" />

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto space-y-6 sm:space-y-8">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Badge variant="teal" size="md" className="backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Cinematic Spatial Exploration &bull; 3D Terrain Engine</span>
          </Badge>
        </div>

        {/* Required Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-md">
          Discover Places{' '}
          <span className="text-gradient-teal">Beyond the</span>{' '}
          <span className="text-gradient-sunset">Ordinary.</span>
        </h1>

        {/* Concise Supporting Text */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
          Immerse yourself in precision 3D topography, real-time microclimate modeling, and hand-curated expeditions from Mumbai’s coastal heritage to remote alpine crags.
        </p>

        {/* Destination Search Form with Live Dropdown Results */}
        <div className="max-w-2xl mx-auto pt-2 relative">
          <form
            onSubmit={handleSearch}
            className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full glass-panel border border-slate-700/80 shadow-[0_8px_32px_rgba(4,8,20,0.85)] flex flex-col sm:flex-row items-center gap-2 backdrop-blur-xl transition-all focus-within:border-cyan-400 focus-within:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
          >
            <div className="flex items-center gap-3 w-full px-3 py-1.5 flex-1 relative">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                id="hero-location-search"
                type="text"
                value={localQuery}
                onFocus={() => setIsFocused(true)}
                onChange={(e) => {
                  setLocalQuery(e.target.value);
                  if (onSearchSubmit) onSearchSubmit(e.target.value);
                }}
                placeholder="Where to? (e.g. Gateway of India, Marine Drive, Siddhivinayak...)"
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search text"
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white font-semibold text-sm shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_28px_rgba(249,115,22,0.6)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Explore</span>
            </button>
          </form>

          {/* Useful Live Results Dropdown while typing */}
          {isFocused && localQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 glass-panel rounded-2xl border border-slate-700/90 shadow-2xl overflow-hidden text-left backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2.5 px-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Matching Destinations</span>
                <span>{liveResults.length} found</span>
              </div>

              {liveResults.length > 0 ? (
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                  {liveResults.map((dest) => (
                    <div
                      key={dest.id}
                      onClick={() => handleSelectResult(dest)}
                      className="p-3 px-4 hover:bg-slate-800/80 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-700"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                              {dest.name}
                            </span>
                            <Badge variant="teal" size="sm">
                              {dest.category}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {dest.region}, {dest.country}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono text-cyan-400">
                          {dest.elevationMeters}m
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center space-y-2">
                  <p className="text-xs text-slate-300 font-medium">
                    No destinations match &quot;{localQuery}&quot;
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Try searching for <span className="text-cyan-400">Gateway of India</span>, <span className="text-cyan-400">Marine Drive</span>, <span className="text-cyan-400">Siddhivinayak</span>, or <span className="text-cyan-400">Heritage</span>.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="text-xs text-orange-400 hover:text-orange-300 underline font-medium cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick-Search Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
            <span className="text-slate-400 font-medium">Trending:</span>
            {[
              'Gateway of India',
              'Marine Drive',
              'Bandra Fort',
              'Juhu Beach',
              'Siddhivinayak Temple',
              'Elephanta Caves'
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleQuickTag(tag)}
                className="px-2.5 py-1 rounded-full bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/60 transition-all cursor-pointer backdrop-blur-md"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Prominent Action Buttons */}
        <div className="pt-2 flex items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            href="#destinations"
            icon={<Navigation className="w-4 h-4" />}
          >
            Explore Destinations
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href="#interactive-map"
            icon={<Compass className="w-4 h-4 text-cyan-400" />}
          >
            Open Interactive Map
          </Button>
        </div>
      </div>

      {/* Scroll Indicator & Visually Refined Transition to Next Section */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 cursor-pointer select-none">
        <button
          type="button"
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors group cursor-pointer"
          aria-label="Scroll down to destinations"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-cyan-300">
            Scroll to Explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-600/80 group-hover:border-cyan-400 flex items-start justify-center p-1 transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 -mt-1 group-hover:translate-y-0.5 transition-transform text-cyan-400" />
        </button>
      </div>

      {/* Atmospheric Fog Blend into next section */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#040814] via-[#040814]/70 to-transparent pointer-events-none" />
    </section>
  );
}
