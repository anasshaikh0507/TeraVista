'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Menu, X, Bookmark, Search, Map, Globe, Sparkles, Route } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useSavedPlaces } from '@/context/SavedPlacesContext';
import { useTripPlanner } from '@/context/TripPlannerContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { savedCount, setIsSavedModalOpen } = useSavedPlaces();
  const { itineraryCount, setIsItineraryOpen } = useTripPlanner();

  const handleSearchClick = () => {
    const searchInput = document.getElementById('hero-location-search');
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const explore = document.getElementById('destinations');
      if (explore) explore.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 via-cyan-600 to-orange-500 p-[1.5px] shadow-[0_0_16px_rgba(20,184,166,0.3)] group-hover:shadow-[0_0_24px_rgba(249,115,22,0.4)] transition-all duration-300">
                <div className="w-full h-full bg-[#070e1e] rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-cyan-300 group-hover:rotate-45 transition-transform duration-500 ease-out" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                    TERRA<span className="text-cyan-400">VISTA</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400 mt-0.5">
                  Smart Tourism Explorer
                </span>
              </div>
            </Link>

            <div className="hidden lg:block pl-2 border-l border-slate-800">
              <Badge variant="teal" size="sm">
                <Sparkles className="w-3 h-3 mr-0.5 text-cyan-300" />
                3D Engine Active
              </Badge>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#hero-exploration"
              className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors py-1 relative group"
            >
              Explore
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300" />
            </a>

            <a
              href="#interactive-map"
              className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors py-1 relative group flex items-center gap-1.5"
            >
              <Map className="w-3.5 h-3.5 text-teal-400" />
              <span>Map</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300" />
            </a>

            <a
              href="#destinations"
              className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors py-1 relative group"
            >
              Destinations
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300" />
            </a>

            {/* Trip Itinerary Button */}
            <button
              type="button"
              onClick={() => setIsItineraryOpen(true)}
              className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors py-1 flex items-center gap-1.5 cursor-pointer relative group"
            >
              <Route className="w-3.5 h-3.5 text-cyan-400" />
              <span>Itinerary</span>
              {itineraryCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {itineraryCount}
                </span>
              )}
            </button>

            {/* Saved Places Button */}
            <button
              type="button"
              onClick={() => setIsSavedModalOpen(true)}
              className="text-sm font-medium text-slate-300 hover:text-orange-300 transition-colors py-1 flex items-center gap-1.5 cursor-pointer relative group"
            >
              <Bookmark className="w-3.5 h-3.5 text-orange-400" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Search Control & Quick Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Bar Trigger Control */}
            <button
              type="button"
              onClick={handleSearchClick}
              aria-label="Search destinations"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Find Location</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">
                /
              </kbd>
            </button>

            <Button
              variant="primary"
              size="sm"
              href="#destinations"
              icon={<Globe className="w-3.5 h-3.5" />}
            >
              Explore All
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsItineraryOpen(true)}
              aria-label="View trip itinerary"
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 relative cursor-pointer"
            >
              <Route className="w-4 h-4 text-cyan-400" />
              {itineraryCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[9px] font-bold flex items-center justify-center">
                  {itineraryCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsSavedModalOpen(true)}
              aria-label="View saved places"
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 relative cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-orange-400" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel border-t border-slate-800/80 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Navigation
            </span>
            <Badge variant="teal" size="sm">
              3D Spatial Active
            </Badge>
          </div>

          <a
            href="#hero-exploration"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/80 rounded-lg hover:text-cyan-300 transition-colors"
          >
            Explore
          </a>
          <a
            href="#interactive-map"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/80 rounded-lg hover:text-cyan-300 transition-colors flex items-center gap-2"
          >
            <Map className="w-4 h-4 text-teal-400" />
            <span>Interactive Map</span>
          </a>
          <a
            href="#destinations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/80 rounded-lg hover:text-cyan-300 transition-colors"
          >
            Destinations & Mumbai Highlights
          </a>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setIsItineraryOpen(true);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/80 rounded-lg hover:text-cyan-300 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Route className="w-4 h-4 text-cyan-400" />
              <span>Trip Itinerary</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {itineraryCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSavedModalOpen(true);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/80 rounded-lg hover:text-orange-300 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-orange-400" />
              <span>Saved Places</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
              {savedCount}
            </span>
          </button>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              href="#destinations"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Destinations
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
