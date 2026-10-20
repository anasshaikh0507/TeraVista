'use client';

import React, { useState, useMemo } from 'react';
import { DESTINATIONS } from '@/data/destinations';
import { Destination, TravelFilterState } from '@/types';
import { ExploreFilterBar } from './ExploreFilterBar';
import { ExpeditionCard } from './ExpeditionCard';
import { ExpeditionDetailModal } from './ExpeditionDetailModal';
import { Compass, Sparkles, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ExpeditionExplorerProps {
  initialSearchQuery?: string;
  selectedDestination?: Destination | null;
  onSelectDestination?: (dest: Destination | null) => void;
  onShowOnMap?: (dest: Destination) => void;
}

export function ExpeditionExplorer({
  initialSearchQuery = '',
  selectedDestination: externalSelected,
  onSelectDestination: setExternalSelected,
  onShowOnMap
}: ExpeditionExplorerProps) {
  const [filters, setFilters] = useState<TravelFilterState>({
    searchQuery: initialSearchQuery,
    biome: 'All',
    category: 'All',
    season: 'All',
    difficulty: 'All'
  });

  const [internalSelected, setInternalSelected] = useState<Destination | null>(null);

  const selectedDestination = externalSelected !== undefined ? externalSelected : internalSelected;
  const handleSelectDestination = (dest: Destination | null) => {
    if (setExternalSelected) {
      setExternalSelected(dest);
    } else {
      setInternalSelected(dest);
    }
  };

  // Sync external search query if updated from hero during render
  const [prevPropQuery, setPrevPropQuery] = useState(initialSearchQuery);
  if (prevPropQuery !== initialSearchQuery) {
    setPrevPropQuery(initialSearchQuery);
    setFilters((prev) => ({ ...prev, searchQuery: initialSearchQuery }));
  }

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesRegion = item.region.toLowerCase().includes(query);
        const matchesCountry = item.country.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesSecondary = item.secondaryCategories?.some((cat) =>
          cat.toLowerCase().includes(query)
        );
        const matchesFeatures = item.terrainFeatures.some((f) =>
          f.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesRegion && !matchesCountry && !matchesFeatures && !matchesCategory && !matchesSecondary) {
          return false;
        }
      }

      // Category filter (e.g. 'Beaches', 'Heritage', 'Religious Places', 'Nature', 'Viewpoints')
      if (filters.category !== 'All') {
        const matchesDirect = item.category === filters.category;
        const matchesSecondary = item.secondaryCategories?.includes(filters.category);
        if (!matchesDirect && !matchesSecondary) {
          return false;
        }
      }

      // Biome filter
      if (filters.biome !== 'All' && item.biome !== filters.biome) {
        return false;
      }

      // Season filter
      if (filters.season !== 'All' && item.bestSeason !== filters.season) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty !== 'All' && item.difficulty !== filters.difficulty) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <section id="destinations" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
              <Landmark className="w-3.5 h-3.5" />
              <span>Curated Destination Preview</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Extraordinary <span className="text-gradient-teal">Destinations</span> & Mumbai Frontiers
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Explore legendary coastal heritage sites like Gateway of India and Marine Drive alongside remote global mountain pinnacles and coral archipelagos.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              type="button"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  category: prev.category === 'Heritage' ? 'All' : 'Heritage'
                }))
              }
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                filters.category === 'Heritage'
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/40 shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700/60 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>{filters.category === 'Heritage' ? 'Showing Heritage' : 'Quick Heritage Filter'}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <ExploreFilterBar
          filters={filters}
          onFilterChange={setFilters}
          resultCount={filteredDestinations.length}
          totalCount={DESTINATIONS.length}
        />

        {/* Expeditions Grid or Empty State */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDestinations.map((destination) => (
              <ExpeditionCard
                key={destination.id}
                destination={destination}
                onInspect={handleSelectDestination}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center space-y-4 border border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No Matching Destinations</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              No places match your active search &quot;{filters.searchQuery}&quot;. Try selecting a different collection or clearing your filters.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                setFilters({
                  searchQuery: '',
                  biome: 'All',
                  category: 'All',
                  season: 'All',
                  difficulty: 'All'
                })
              }
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <ExpeditionDetailModal
        destination={selectedDestination}
        onClose={() => handleSelectDestination(null)}
        onShowOnMap={onShowOnMap}
      />
    </section>
  );
}
