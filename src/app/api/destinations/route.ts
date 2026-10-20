import { NextResponse } from 'next/server';
import { DESTINATIONS } from '@/data/destinations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase().trim() || '';
  const category = searchParams.get('category') || 'All';
  const biome = searchParams.get('biome') || 'All';
  const mumbaiOnly = searchParams.get('mumbai') === 'true';

  let filtered = [...DESTINATIONS];

  if (mumbaiOnly) {
    filtered = filtered.filter((d) => d.isMumbai);
  }

  if (q) {
    filtered = filtered.filter((d) => {
      const matchName = d.name.toLowerCase().includes(q);
      const matchRegion = d.region.toLowerCase().includes(q);
      const matchCategory = d.category.toLowerCase().includes(q);
      const matchSecondary = d.secondaryCategories?.some((c) => c.toLowerCase().includes(q));
      const matchFeatures = d.terrainFeatures.some((f) => f.toLowerCase().includes(q));
      return matchName || matchRegion || matchCategory || matchSecondary || matchFeatures;
    });
  }

  if (category !== 'All') {
    filtered = filtered.filter((d) => {
      return d.category === category || d.secondaryCategories?.includes(category as any);
    });
  }

  if (biome !== 'All') {
    filtered = filtered.filter((d) => d.biome === biome);
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    total: DESTINATIONS.length,
    data: filtered,
    meta: {
      source: 'local-curated',
      supabaseConnected: false,
      timestamp: new Date().toISOString()
    }
  });
}
