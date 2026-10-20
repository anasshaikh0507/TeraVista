import React from 'react';

export function AtmosphericBackdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Deep Space / Midnight Sky Base */}
      <div className="absolute inset-0 bg-[#040814]" />

      {/* Atmospheric Horizon Light Scattering (Warm Sunset Amber meets Cold High-Altitude Turquoise) */}
      <div
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[140vw] max-w-[1600px] h-[550px] rounded-[100%] opacity-25 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, #f97316 0%, #0d9488 45%, #082f49 70%, transparent 85%)'
        }}
      />

      {/* Subtle secondary turquoise aura for spatial depth */}
      <div
        className="absolute top-[28%] -right-[15%] w-[800px] h-[600px] rounded-full opacity-15 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, #0d1938 60%, transparent 80%)'
        }}
      />

      {/* Deep navy atmospheric density floor */}
      <div
        className="absolute top-[55%] -left-[10%] w-[700px] h-[700px] rounded-full opacity-15 blur-[160px]"
        style={{
          background: 'radial-gradient(circle, #ea580c 0%, #0d1938 55%, transparent 75%)'
        }}
      />

      {/* Topographic elevation contour grid overlay */}
      <div className="absolute inset-0 topo-grid-pattern opacity-30" />

      {/* Subtle horizon silhouette & vignette */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#040814] via-[#040814]/80 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,8,20,0.6)_100%)]" />
    </div>
  );
}
