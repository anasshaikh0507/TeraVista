import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasSupabase = Boolean(supabaseUrl && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return NextResponse.json({
    status: 'online',
    version: '1.0.0',
    service: 'TerraVista Smart Tourism API',
    mode: 'local-portable',
    database: {
      type: hasSupabase ? 'supabase-cloud' : 'in-memory-curated',
      connected: hasSupabase,
      offlineFallbackReady: true
    },
    capabilities: [
      'geospatial-telemetry',
      'osm-leaflet-mapping',
      'procedural-3d-terrain',
      'trip-itinerary-haversine',
      'offline-localstorage-sync'
    ],
    timestamp: new Date().toISOString()
  });
}
