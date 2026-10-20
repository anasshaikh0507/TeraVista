'use client';

import React, { useState } from 'react';
import { Compass, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
    }
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#040814] pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-teal-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Project Brief */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-orange-500 p-[1px]">
                <div className="w-full h-full bg-[#070e1e] rounded-[11px] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                TERRA<span className="text-cyan-400">VISTA</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              TerraVista is a spatial travel-technology platform engineered to revolutionize tourism discovery through precision 3D geospatial elevation modeling, microclimate telemetry, and low-impact expedition planning.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <Badge variant="teal" size="sm">
                College Project Phase 1
              </Badge>
              <Badge variant="pulse" size="sm">
                Spatial GIS Engine Online
              </Badge>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Curated Biomes
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#expeditions" className="hover:text-cyan-300 transition-colors">
                  Alpine Fjords & Peaks
                </a>
              </li>
              <li>
                <a href="#expeditions" className="hover:text-cyan-300 transition-colors">
                  Hyper-Arid Plateaus
                </a>
              </li>
              <li>
                <a href="#expeditions" className="hover:text-cyan-300 transition-colors">
                  Karst Archipelagos
                </a>
              </li>
              <li>
                <a href="#expeditions" className="hover:text-cyan-300 transition-colors">
                  Basalt Highlands
                </a>
              </li>
            </ul>
          </div>

          {/* Academic & Engineering Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Engineering Pillars
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#capabilities" className="hover:text-cyan-300 transition-colors">
                  Elevation Mesh Shaders
                </a>
              </li>
              <li>
                <a href="#spatial-viewport" className="hover:text-cyan-300 transition-colors">
                  3D Viewport Staging
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-cyan-300 transition-colors">
                  Phase 2 & 3 Milestones
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyan-300 transition-colors">
                  Sustainable Eco Ratings
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Telemetry Dispatch */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Field Dispatch
            </h4>
            <p className="text-xs text-slate-400">
              Receive notifications for newly rendered 3D expedition terrains and spatial telemetry updates.
            </p>

            {isSubmitted ? (
              <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center gap-2 text-xs text-cyan-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-400" />
                <span>Subscription recorded for academic telemetry updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="explorer@institution.edu"
                    className="w-full bg-slate-900/90 text-xs text-slate-200 placeholder-slate-500 px-3 py-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white rounded-lg transition-all flex items-center justify-center cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Zero spam. Academic evaluation dispatch only.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Academic Disclosures */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>
              &copy; 2026 TerraVista — Smart Tourism & Travel Explorer.
            </p>
            <span className="hidden sm:inline text-slate-700">&bull;</span>
            <p className="text-slate-400">
              Academic Project &bull; Built with Next.js 16, React 19, TypeScript & Tailwind CSS
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Production-Ready Foundation</span>
            </div>
            <a
              href="#roadmap"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              View System Specs &rarr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
