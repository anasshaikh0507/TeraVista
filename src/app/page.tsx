'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/features/HeroSection';
import { ExpeditionExplorer } from '@/components/features/ExpeditionExplorer';
import { InteractiveMapSection } from '@/components/features/InteractiveMapSection';
import { Hero3DPreviewStage } from '@/components/features/Hero3DPreviewStage';
import { FeatureHighlights } from '@/components/features/FeatureHighlights';
import { ArchitectureRoadmap } from '@/components/features/ArchitectureRoadmap';
import { SavedPlacesModal } from '@/components/features/SavedPlacesModal';
import { TripItineraryModal } from '@/components/features/TripItineraryModal';
import { Destination } from '@/types';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [focusedMapDestination, setFocusedMapDestination] = useState<Destination | null>(null);

  const handleFocusDestinationOnMap = (dest: Destination) => {
    setFocusedMapDestination(dest);
    const mapSection = document.getElementById('interactive-map');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Cinematic 3D Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchSubmit={setSearchQuery}
      />

      {/* Destination Preview (Mumbai Highlights & Global Frontiers) */}
      <div className="section-boundary-divider">
        <ExpeditionExplorer
          initialSearchQuery={searchQuery}
          selectedDestination={selectedDestination}
          onSelectDestination={setSelectedDestination}
          onShowOnMap={handleFocusDestinationOnMap}
        />
      </div>

      {/* Interactive Geographic Radar Map */}
      <div className="section-boundary-divider">
        <InteractiveMapSection
          onSelectDestination={setSelectedDestination}
          focusedDestination={focusedMapDestination}
        />
      </div>

      {/* Spatial Viewport Staging (LiDAR Heightmap & Solar Angle Simulator) */}
      <section className="py-8 sm:py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero3DPreviewStage />
        </div>
      </section>

      {/* Engineering Capabilities & Architecture Highlights */}
      <FeatureHighlights />

      {/* College Project Architecture Roadmap */}
      <ArchitectureRoadmap />

      {/* Saved Places Kit Modal */}
      <SavedPlacesModal
        onSelectDestination={setSelectedDestination}
      />

      {/* Trip Itinerary Planner Modal */}
      <TripItineraryModal
        onFocusDestinationOnMap={handleFocusDestinationOnMap}
        onInspectDetails={setSelectedDestination}
      />
    </div>
  );
}
