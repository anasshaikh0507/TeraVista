'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Destination } from '@/types';

export interface LeafletMapProps {
  destinations: Destination[];
  selectedDestination: Destination | null;
  onSelectDestination: (dest: Destination) => void;
  className?: string;
  zoom?: number;
  center?: [number, number];
}

const DEFAULT_CENTER: [number, number] = [18.98, 72.83]; // Mumbai central coordinates
const DEFAULT_ZOOM = 12;

export function LeafletMap({
  destinations,
  selectedDestination,
  onSelectDestination,
  className = '',
  zoom = DEFAULT_ZOOM,
  center = DEFAULT_CENTER
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create map instance
    const map = L.map(mapContainerRef.current, {
      center,
      zoom,
      zoomControl: false, // We'll add custom positioned zoom control
      attributionControl: true
    });

    // Add high-contrast OpenStreetMap CartoDB Dark Matter tiles (or standard OSM tiles)
    // CartoDB Dark Matter with full legal attribution to OpenStreetMap contributors
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Add zoom control top-right
    L.control
      .zoom({
        position: 'topright'
      })
      .addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [center, zoom]);

  // 2. Render and Sync Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => {
      marker.remove();
    });
    markersRef.current = {};

    destinations.forEach((dest) => {
      const isSelected = selectedDestination?.id === dest.id;

      // Color based on category
      const color = dest.category === 'Heritage'
        ? '#f97316' // Sunset orange
        : dest.category === 'Beaches'
        ? '#06b6d4' // Cyan
        : dest.category === 'Religious Places'
        ? '#eab308' // Amber
        : dest.category === 'Viewpoints'
        ? '#38bdf8' // Sky blue
        : '#10b981'; // Emerald for Nature

      const pinHtml = `
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${isSelected ? '38px' : '30px'};
          height: ${isSelected ? '38px' : '30px'};
          transition: all 0.25s ease;
        ">
          ${isSelected ? `
            <div style="
              position: absolute;
              inset: -6px;
              border-radius: 9999px;
              background-color: ${color};
              opacity: 0.35;
              animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
          ` : ''}
          <div style="
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 9999px;
            background-color: #091124;
            border: 2px solid ${isSelected ? '#ffffff' : color};
            box-shadow: 0 4px 14px rgba(0,0,0,0.8), 0 0 10px ${color};
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${isSelected ? '#ffffff' : color};
          ">
            <svg width="${isSelected ? '18' : '14'}" height="${isSelected ? '18' : '14'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'terravista-custom-marker',
        html: pinHtml,
        iconSize: [isSelected ? 38 : 30, isSelected ? 38 : 30],
        iconAnchor: [isSelected ? 19 : 15, isSelected ? 38 : 30],
        popupAnchor: [0, isSelected ? -38 : -30]
      });

      const marker = L.marker([dest.latitude, dest.longitude], { icon: customIcon });

      // Build Rich Cinematic Popup Content
      const popupHtml = `
        <div style="width: 240px; font-family: inherit; overflow: hidden; border-radius: 16px; background-color: #071126; color: #f8fafc;">
          <div style="position: relative; height: 110px; width: 100%; overflow: hidden;">
            <img src="${dest.imageUrl}" alt="${dest.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; inset: 0; background: linear-gradient(to top, #071126 10%, transparent 100%);"></div>
            <span style="position: absolute; top: 8px; left: 8px; background: rgba(9,17,36,0.85); color: #22d3ee; border: 1px solid rgba(34,211,238,0.3); font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 9999px;">
              ${dest.category}
            </span>
          </div>
          <div style="padding: 12px;">
            <h4 style="margin: 0 0 4px; font-size: 14px; font-weight: 700; color: #ffffff; line-height: 1.2;">
              ${dest.name}
            </h4>
            <p style="margin: 0 0 8px; font-size: 11px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${dest.region}
            </p>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 11px; color: #22d3ee; font-family: monospace;">
              <span>Alt: ${dest.elevationMeters}m</span>
              <span style="color: #fb923c;">${dest.bestSeason}</span>
            </div>
            <button id="popup-btn-${dest.id}" style="width: 100%; background: linear-gradient(to right, #0d9488, #06b6d4); color: #ffffff; border: none; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;">
              View Details & Specs
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 260,
        className: 'terravista-glass-popup'
      });

      marker.on('click', () => {
        onSelectDestination(dest);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${dest.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectDestination(dest);
          };
        }
      });

      marker.addTo(map);
      markersRef.current[dest.id] = marker;
    });
  }, [destinations, selectedDestination, onSelectDestination]);

  // 3. Pan and Center when selectedDestination changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedDestination) return;

    map.flyTo([selectedDestination.latitude, selectedDestination.longitude], 14, {
      duration: 1.2,
      easeLinearity: 0.25
    });

    const marker = markersRef.current[selectedDestination.id];
    if (marker) {
      marker.openPopup();
    }
  }, [selectedDestination]);

  return (
    <div className={`relative w-full h-full min-h-[460px] rounded-3xl overflow-hidden ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full min-h-[460px]" />
    </div>
  );
}
