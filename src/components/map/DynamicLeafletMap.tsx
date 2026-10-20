'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { LeafletMapProps } from './LeafletMap';

export const DynamicLeafletMap = dynamic<LeafletMapProps>(
  () => import('./LeafletMap').then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[460px] flex items-center justify-center bg-slate-950/80 rounded-3xl border border-slate-800 backdrop-blur-md">
        <div className="flex flex-col items-center gap-3 text-center p-6">
          <div className="w-9 h-9 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-slate-200 block">
              Initializing OpenStreetMap Tiles
            </span>
            <span className="text-[11px] text-slate-400 block">
              Calibrating Mumbai Geographic Coordinates...
            </span>
          </div>
        </div>
      </div>
    )
  }
);
