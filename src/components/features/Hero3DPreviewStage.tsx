'use client';

import React, { useState } from 'react';
import { Layers, Sun, Mountain, Compass, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function Hero3DPreviewStage() {
  const [viewMode, setViewMode] = useState<'contour' | 'solar' | 'bathymetry'>('contour');
  const [solarAngle, setSolarAngle] = useState<'dawn' | 'noon' | 'sunset'>('sunset');

  return (
    <div
      id="spatial-viewport"
      className="relative rounded-3xl glass-panel p-6 sm:p-8 overflow-hidden border border-slate-700/50 shadow-2xl transition-all"
    >
      {/* Viewport Top Bar / Telemetry Metadata */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Spatial Viewport Staging
              </span>
              <Badge variant="teal" size="sm">
                Phase 1 Simulation
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              Topographic elevation projection &bull; WebGL / R3F Canvas Bridge
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('contour')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'contour'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Contour Grid
          </button>
          <button
            type="button"
            onClick={() => setViewMode('solar')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'solar'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Solar Horizon
          </button>
          <button
            type="button"
            onClick={() => setViewMode('bathymetry')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'bathymetry'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Deep Relief
          </button>
        </div>
      </div>

      {/* Main 3D Perspective Stage Container */}
      <div className="relative h-[340px] sm:h-[420px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#030712] via-[#071329] to-[#040814] my-6 border border-slate-800/60 viewport-3d-stage">
        {/* Dynamic Atmospheric Light source based on solarAngle & viewMode */}
        <div
          className={`absolute transition-all duration-700 pointer-events-none rounded-full blur-[90px] ${
            solarAngle === 'sunset' || viewMode === 'solar'
              ? 'top-4 right-12 w-64 h-64 bg-orange-500/30'
              : solarAngle === 'dawn'
              ? 'top-8 left-12 w-64 h-64 bg-amber-400/25'
              : 'top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-400/20'
          }`}
        />

        {/* CSS 3D Topographic Terrain Plane with Isometric Depth */}
        <div className="relative w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] terrain-wireframe-plane transition-all duration-700">
          {/* Wireframe Elevation Grid */}
          <div
            className={`absolute inset-0 rounded-2xl border transition-colors duration-500 ${
              viewMode === 'contour'
                ? 'border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_40px_rgba(6,182,212,0.2)]'
                : viewMode === 'solar'
                ? 'border-orange-500/40 bg-orange-950/20 shadow-[0_0_40px_rgba(249,115,22,0.2)]'
                : 'border-blue-500/40 bg-blue-950/20 shadow-[0_0_40px_rgba(59,130,246,0.2)]'
            }`}
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* Concentric Elevation Contour Rings representing mountain ridges */}
            <div className="absolute inset-8 rounded-full border border-teal-400/30 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full border border-teal-400/40 flex items-center justify-center">
                <div className="w-1/2 h-1/2 rounded-full border border-orange-400/50 flex items-center justify-center">
                  <div className="w-1/4 h-1/4 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 shadow-[0_0_15px_#f97316]" />
                </div>
              </div>
            </div>

            {/* Peak Elevation Flag Marker */}
            <div className="absolute top-[36%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className="px-2 py-0.5 rounded bg-orange-500 text-[10px] font-bold text-white shadow-lg flex items-center gap-1">
                <Mountain className="w-2.5 h-2.5" />
                <span>Summit +2,840m</span>
              </div>
              <div className="w-[1.5px] h-10 bg-gradient-to-b from-orange-400 to-transparent" />
            </div>

            {/* Fjord / Oceanic Trench Marker */}
            <div className="absolute bottom-[20%] right-[22%] flex flex-col items-center pointer-events-none">
              <div className="px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 shadow-lg">
                Fjord Depth -140m
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Telemetry HUD (Heads-Up Display) */}
        <div className="absolute top-4 left-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1 backdrop-blur-md">
          <div className="flex items-center gap-2 text-cyan-300">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '24s' }} />
            <span>LAT 62° 12&apos; 48&quot; N | LON 6° 31&apos; 12&quot; E</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Target Mesh: Alpine Fjord Ridge &bull; LiDAR Step: 1.2m
          </div>
        </div>

        {/* Solar Simulator Controller (Right side HUD) */}
        <div className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/85 border border-slate-800 flex items-center gap-1.5 text-[11px] backdrop-blur-md">
          <span className="text-slate-400 px-1 font-medium flex items-center gap-1">
            <Sun className="w-3 h-3 text-amber-400" />
            Solar:
          </span>
          {(['dawn', 'noon', 'sunset'] as const).map((angle) => (
            <button
              key={angle}
              type="button"
              onClick={() => setSolarAngle(angle)}
              className={`px-2 py-1 rounded capitalize font-medium transition-colors cursor-pointer ${
                solarAngle === angle
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {angle}
            </button>
          ))}
        </div>

        {/* Phase 2 WebGL Notice Banner */}
        <div className="absolute bottom-4 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 px-4 py-2 rounded-xl bg-slate-950/90 border border-teal-500/30 text-xs text-slate-300 flex items-center justify-between sm:justify-center gap-3 backdrop-blur-lg">
          <div className="flex items-center gap-2 text-teal-400">
            <Layers className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-200">Phase 2 Target:</span>
          </div>
          <span className="text-slate-400 text-[11px]">
            Three.js / React Three Fiber Real-Time GPU Shaders
          </span>
        </div>
      </div>

      {/* Stage Bottom Specifications */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <span className="text-slate-400 block mb-0.5">Atmospheric Scattering</span>
          <span className="font-semibold text-slate-200">Rayleigh & Mie Sun Radiance</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <span className="text-slate-400 block mb-0.5">Terrain Displacements</span>
          <span className="font-semibold text-slate-200">Quadtree LOD Mesh Ready</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <span className="text-slate-400 block mb-0.5">Spatial Coordinate Grid</span>
          <span className="font-semibold text-slate-200">WGS84 High-Precision Geoid</span>
        </div>
      </div>
    </div>
  );
}
