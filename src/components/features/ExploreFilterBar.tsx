'use client';

import React from 'react';
import { Search, RotateCcw, Filter, Sparkles, X } from 'lucide-react';
import { BiomeType, FilterCategory, TravelFilterState } from '@/types';
import { Input } from '@/components/ui/Input';

export interface ExploreFilterBarProps {
  filters: TravelFilterState;
  onFilterChange: (filters: TravelFilterState) => void;
  resultCount: number;
  totalCount: number;
}

const CATEGORIES: FilterCategory[] = [
  'All',
  'Beaches',
  'Heritage',
  'Religious Places',
  'Nature',
  'Viewpoints'
];

const BIOMES: (BiomeType | 'All')[] = [
  'All',
  'Heritage Coastal',
  'Urban Coastal',
  'Coastal',
  'Alpine',
  'Desert',
  'Forest Sanctuary'
];

export function ExploreFilterBar({
  filters,
  onFilterChange,
  resultCount,
  totalCount
}: ExploreFilterBarProps) {
  const handleReset = () => {
    onFilterChange({
      searchQuery: '',
      category: 'All',
      biome: 'All',
      season: 'All',
      difficulty: 'All'
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.category !== 'All' ||
    filters.biome !== 'All' ||
    filters.season !== 'All' ||
    filters.difficulty !== 'All';

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 space-y-4 border border-slate-800 shadow-xl">
      {/* Category Pills Bar: Beaches, Heritage, Religious Places, Nature, Viewpoints */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          Categories:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onFilterChange({ ...filters, category: cat })}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              filters.category === cat
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-[0_0_16px_rgba(20,184,166,0.35)]'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Input & Reset Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-800/60">
        <div className="w-full flex-1 relative">
          <Input
            value={filters.searchQuery}
            onChange={(e) =>
              onFilterChange({ ...filters, searchQuery: e.target.value })
            }
            placeholder="Search by name, area, or category (e.g. Gateway of India, Marine Drive, Caves, Beach)..."
            icon={<Search className="w-4 h-4 text-cyan-400" />}
            className="bg-slate-900/90 text-sm"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              aria-label="Clear search text"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Biome Sub-Filter Pills & Live Counter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
        <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-cyan-400" />
            Biome:
          </span>
          {BIOMES.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => onFilterChange({ ...filters, biome: b })}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                filters.biome === b
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Live Filter Count Indicator */}
        <div className="shrink-0 text-xs text-slate-400 font-mono flex items-center gap-1.5 self-end sm:self-center">
          <span className="text-cyan-400 font-bold">{resultCount}</span> of{' '}
          <span>{totalCount} destinations matched</span>
        </div>
      </div>

      {/* Active Filter Chips indicator */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px] font-mono">Active Filters:</span>
          {filters.category !== 'All' && (
            <span className="px-2.5 py-0.5 rounded-lg bg-teal-950 text-teal-300 border border-teal-500/40 flex items-center gap-1">
              Category: {filters.category}
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, category: 'All' })}
                aria-label="Remove category filter"
                className="hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.biome !== 'All' && (
            <span className="px-2.5 py-0.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
              Biome: {filters.biome}
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, biome: 'All' })}
                aria-label="Remove biome filter"
                className="hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.searchQuery && (
            <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
              Query: &quot;{filters.searchQuery}&quot;
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                aria-label="Clear query filter"
                className="hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
