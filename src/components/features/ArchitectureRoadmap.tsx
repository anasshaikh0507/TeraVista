import React from 'react';
import { ROADMAP_DELIVERABLES, PROJECT_METRICS } from '@/data/projectRoadmap';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Clock, Layers, ShieldCheck } from 'lucide-react';

export function ArchitectureRoadmap() {
  return (
    <section id="roadmap" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="teal" size="md">
            <Layers className="w-3.5 h-3.5 text-cyan-300" />
            <span>Academic Project Lifecycle</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering &bull; <span className="text-gradient-teal">Roadmap</span> &bull; Telemetry
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            TerraVista development is partitioned into structured architectural milestones. Phase 1 delivers the production-ready Next.js 16 design foundation, responsive layouts, and spatial staging.
          </p>
        </div>

        {/* Live Project Metrics HUD */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECT_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  {metric.label}
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                </span>
              </div>
              <div className="text-2xl font-bold text-white font-mono">{metric.value}</div>
              <div className="text-[11px] text-teal-400/90 font-mono">{metric.subValue}</div>
            </div>
          ))}
        </div>

        {/* Milestone Timeline Columns */}
        <div className="space-y-8">
          {ROADMAP_DELIVERABLES.map((phaseItem, index) => {
            const isPhase1 = index === 0;

            return (
              <div
                key={phaseItem.phase}
                className={`rounded-3xl glass-panel p-6 sm:p-8 border transition-all ${
                  isPhase1
                    ? 'border-teal-500/40 shadow-[0_0_30px_rgba(20,184,166,0.12)]'
                    : 'border-slate-800/80'
                }`}
              >
                {/* Phase Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isPhase1
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                          : 'bg-slate-800/60 text-slate-400 border border-slate-700/60'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                          {phaseItem.phase}
                        </span>
                        <Badge
                          variant={isPhase1 ? 'teal' : 'default'}
                          size="sm"
                        >
                          {phaseItem.badge}
                        </Badge>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                        {phaseItem.name}
                      </h3>
                    </div>
                  </div>

                  {isPhase1 && (
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Phase 1 Verified & Active</span>
                    </div>
                  )}
                </div>

                {/* Deliverables List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  {phaseItem.deliverables.map((item) => (
                    <div
                      key={item.title}
                      className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/70 space-y-2.5"
                    >
                      <div className="flex items-start gap-2.5">
                        {item.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <h4 className="text-sm font-semibold text-slate-100">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1 pl-6">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
