import React from 'react';
import { Mountain, Sun, Leaf, Database, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export function FeatureHighlights() {
  const pillars = [
    {
      icon: <Mountain className="w-5 h-5 text-cyan-400" />,
      badge: 'Spatial Topography',
      title: 'Precision Elevation Modeling',
      description:
        'Continuous elevation mesh interpolation utilizing global LiDAR and synthetic heightmaps, yielding accurate slope gradients and ridge silhouettes.'
    },
    {
      icon: <Sun className="w-5 h-5 text-amber-400" />,
      badge: 'Atmospheric Physics',
      title: 'Solar & Climate Telemetry',
      description:
        'Simulates real-world sun angles, diurnal thermal drift, and golden-hour alpenglow on cliff faces to identify optimal visual and photographic windows.'
    },
    {
      icon: <Leaf className="w-5 h-5 text-emerald-400" />,
      badge: 'Eco Conservation',
      title: 'Carbon-Neutral Routing',
      description:
        'Audits expedition trails against fragile ecological zones and wildlife corridors to ensure low-impact travel and leave-no-trace adherence.'
    },
    {
      icon: <Database className="w-5 h-5 text-orange-400" />,
      badge: 'Geospatial Caching',
      title: 'Offline Field Reliability',
      description:
        'Engineered for deep-frontier explorers with vector tile pre-fetching and local spatial caching for areas beyond cellular infrastructure.'
    }
  ];

  return (
    <section id="capabilities" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="teal" size="md">
            <Cpu className="w-3.5 h-3.5 text-cyan-300" />
            <span>Platform Pillars</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for <span className="text-gradient-sunset">Next-Gen</span> Exploration
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            TerraVista unifies academic GIS precision with consumer travel aesthetics to deliver a high-performance, accessible spatial tourism platform.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <Badge variant="outline" size="sm">
                    {pillar.badge}
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>Architecture Verified</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
