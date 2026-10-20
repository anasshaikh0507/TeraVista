'use client';

import React, { useState, useMemo } from 'react';
import { DESTINATIONS } from '@/data/destinations';
import { Destination, FilterCategory } from '@/types';
import { DynamicLeafletMap } from '@/components/map/DynamicLeafletMap';
import {
  Map,
  Compass,
  MapPin,
  Search,
  Navigation,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Bookmark,
  SlidersHorizontal,
  Info,
  Plus,
  Check
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useSavedPlaces } from '@/context/SavedPlacesContext';
import { useTripPlanner } from '@/context/TripPlannerContext';

export interface InteractiveMapSectionProps {
  onSelectDestination: (dest: Destination) => void;
  focusedDestination?: Destination | null;
}

const MUMBAI_CATEGORIES: FilterCategory[] = [
  'All',
  'Beaches',
  'Heritage',
  'Religious Places',
  'Nature',
  'Viewpoints'
];

export function InteractiveMapSection({
  onSelectDestination,
  focusedDestination
}: InteractiveMapSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  // Default to 'map' on mobile / 'both' on desktop with responsive detection
  const [viewMode, setViewMode] = useState<'both' | 'map' | 'list'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'map';
    }
    return 'both';
  });
  const { isSaved, toggleSave } = useSavedPlaces();
  const { addToItinerary, isInItinerary } = useTripPlanner();

  // Curated Mumbai destinations
  const mumbaiDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => d.isMumbai);
  }, []);

  // Filtered destinations
  const filteredDestinations = useMemo(() => {
    return mumbaiDestinations.filter((dest) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(query);
        const matchesRegion = dest.region.toLowerCase().includes(query);
        const matchesCategory = dest.category.toLowerCase().includes(query);
        const matchesSecondary = dest.secondaryCategories?.some((cat) =>
          cat.toLowerCase().includes(query)
        );
        const matchesFeatures = dest.terrainFeatures.some((f) => f.toLowerCase().includes(query));
        if (!matchesName && !matchesRegion && !matchesCategory && !matchesFeatures && !matchesSecondary) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All') {
        const matchesDirect = dest.category === selectedCategory;
        const matchesSecondary = dest.secondaryCategories?.includes(selectedCategory);
        if (!matchesDirect && !matchesSecondary) {
          return false;
        }
      }

      return true;
    });
  }, [mumbaiDestinations, searchQuery, selectedCategory]);

  const [selectedDest, setSelectedDest] = useState<Destination>(
    filteredDestinations[0] || mumbaiDestinations[0]
  );

  // Sync focusedDestination when triggered externally
  const [prevFocusedId, setPrevFocusedId] = useState<string | undefined>(focusedDestination?.id);
  if (focusedDestination && focusedDestination.id !== prevFocusedId) {
    setPrevFocusedId(focusedDestination.id);
    setSelectedDest(focusedDestination);
  }

  const handleSelect = (dest: Destination) => {
    setSelectedDest(dest);
  };

  const handleResetView = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDest(mumbaiDestinations[0]);
  };

  const openExternalDirections = (dest: Destination) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dest.latitude},${dest.longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const saved = selectedDest ? isSaved(selectedDest.id) : false;

  return (
    <section id="interactive-map" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
              <Map className="w-3.5 h-3.5" />
              <span>Geographic Map &bull; OpenStreetMap Powered</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Mumbai <span className="text-gradient-teal">Interactive</span> Exploration Map
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Explore curated attractions across Mumbai using authentic geospatial tiles. Pan, zoom, select markers, and inspect verified elevation, coordinates, and navigation routes.
            </p>
          </div>

          {/* Map / List View Toggle & Reset */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              type="button"
              onClick={handleResetView}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reset to Mumbai View</span>
            </button>

            {/* Mobile / Desktop View Mode Switcher */}
            <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('both')}
                className={`hidden md:inline-flex px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  viewMode === 'both'
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Split View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Map Area
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Places List ({filteredDestinations.length})
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar (Search + Categories) */}
        <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full flex-1">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Mumbai destinations (e.g. Gateway of India, Marine Drive, Siddhivinayak, Juhu)..."
                className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-slate-400 shrink-0 px-2">
              Showing <span className="text-cyan-400 font-bold">{filteredDestinations.length}</span> of {mumbaiDestinations.length} attractions
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-800/60">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
              Category:
            </span>
            {MUMBAI_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-[0_0_12px_rgba(20,184,166,0.35)]'
                    : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Destination Sidebar (List of Places) */}
          {(viewMode === 'both' || viewMode === 'list') && (
            <div
              className={`rounded-3xl glass-panel p-5 border border-slate-800 flex flex-col space-y-4 ${
                viewMode === 'both'
                  ? 'lg:col-span-4 max-h-[640px]'
                  : 'lg:col-span-12 max-h-[700px]'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Curated Mumbai Attractions
                </span>
                <Badge variant="teal" size="sm">
                  {filteredDestinations.length} Selected
                </Badge>
              </div>

              {/* Scrollable Destinations List */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((dest) => {
                    const isSelected = selectedDest?.id === dest.id;

                    return (
                      <div
                        key={dest.id}
                        onClick={() => handleSelect(dest)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                          isSelected
                            ? 'bg-slate-900/95 border-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.2)]'
                            : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={dest.imageUrl}
                            alt={dest.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-700/60"
                          />
                          <div className="min-w-0">
                            <h4
                              className={`text-xs font-bold truncate transition-colors ${
                                isSelected ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
                              }`}
                            >
                              {dest.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 truncate">
                              {dest.region}
                            </p>
                            <span className="text-[10px] text-orange-400 font-mono">
                              {dest.category}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[11px] font-mono text-cyan-400 font-bold block">
                            {dest.elevationMeters}m
                          </span>
                          <span className="text-[10px] text-slate-500">Altitude</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    No attractions match &quot;{searchQuery}&quot;.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interactive Leaflet Map Area */}
          {(viewMode === 'both' || viewMode === 'map') && (
            <div
              className={`rounded-3xl glass-panel p-3 sm:p-4 border border-slate-800 flex flex-col justify-between relative overflow-hidden shadow-2xl min-h-[500px] lg:min-h-[640px] ${
                viewMode === 'both' ? 'lg:col-span-8' : 'lg:col-span-12'
              }`}
            >
              {/* Working Geographic Map Component */}
              <div className="w-full h-full min-h-[480px] lg:min-h-[600px] rounded-2xl overflow-hidden relative">
                <DynamicLeafletMap
                  destinations={filteredDestinations}
                  selectedDestination={selectedDest}
                  onSelectDestination={handleSelect}
                  zoom={12}
                  center={[18.98, 72.83]}
                />
              </div>
            </div>
          )}
        </div>

        {/* Selected Destination Inspector Panel */}
        {selectedDest && (
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-700/80 shadow-2xl transition-all">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <img
                  src={selectedDest.imageUrl}
                  alt={selectedDest.name}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-700/80 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="teal" size="sm">
                      {selectedDest.category}
                    </Badge>
                    <Badge variant="orange" size="sm">
                      Mumbai Heritage
                    </Badge>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedDest.name}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {selectedDest.region}, {selectedDest.country}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Itinerary, Directions, Save, & Details */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => addToItinerary(selectedDest)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isInItinerary(selectedDest.id)
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {isInItinerary(selectedDest.id) ? (
                    <>
                      <Check className="w-4 h-4 text-cyan-400" />
                      <span>In Itinerary</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-cyan-400" />
                      <span>Add to Itinerary</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => toggleSave(selectedDest.id)}
                  aria-label={saved ? 'Remove from saved places' : 'Save place'}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    saved
                      ? 'bg-orange-500 text-white shadow-[0_0_16px_rgba(249,115,22,0.5)]'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                  <span>{saved ? 'Saved in Kit' : 'Save Place'}</span>
                </button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => openExternalDirections(selectedDest)}
                  icon={<Navigation className="w-4 h-4" />}
                >
                  Open Directions
                </Button>

                <Button
                  variant="teal"
                  size="md"
                  onClick={() => onSelectDestination(selectedDest)}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  View Full Specs
                </Button>
              </div>
            </div>

            {/* Telemetry and Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Geographic Coordinates</span>
                </div>
                <div className="font-mono text-slate-200">
                  {selectedDest.latitude.toFixed(4)}° N, {selectedDest.longitude.toFixed(4)}° E
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-teal-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Elevation Profile</span>
                </div>
                <div className="font-mono text-slate-200 font-bold">
                  {selectedDest.elevationMeters} meters above sea level
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Best Visiting Season</span>
                </div>
                <div className="text-slate-200">
                  {selectedDest.bestSeason} &bull; {selectedDest.difficulty} Accessibility
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Info className="w-3.5 h-3.5" />
                  <span>Catalog Status</span>
                </div>
                <div className="text-slate-300">
                  {selectedDest.curatedNotice || 'Curated Sample Guide • Verified Cultural Information'}
                </div>
              </div>
            </div>

            {/* Description & Curated Notice Notice */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
              <p className="max-w-3xl leading-relaxed text-slate-300">
                {selectedDest.description}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 shrink-0 font-mono">
                <Info className="w-3.5 h-3.5 text-teal-400" />
                <span>Curated Sample Data • Not Live Transport Feeds</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
