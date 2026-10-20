import { PhaseDeliverable, TelemetryMetric } from '@/types';

export const PROJECT_METRICS: TelemetryMetric[] = [
  {
    id: 'topo-fidelity',
    label: 'Elevation Mesh Precision',
    value: '1.2m',
    subValue: 'LiDAR Synthetic Grid',
    status: 'optimal'
  },
  {
    id: 'active-biomes',
    label: 'Indexed Global Biomes',
    value: '5 Regions',
    subValue: 'Alpine, Desert, Archipelago...',
    status: 'optimal'
  },
  {
    id: 'render-pipeline',
    label: 'Spatial 3D Engine',
    value: 'Phase 1 Ready',
    subValue: 'WebGL & R3F Foundation',
    status: 'optimal'
  },
  {
    id: 'eco-audit',
    label: 'Carbon Telemetry Index',
    value: '94.8%',
    subValue: 'Sustainable Route Rating',
    status: 'optimal'
  }
];

export const ROADMAP_DELIVERABLES: {
  phase: string;
  name: string;
  badge: string;
  deliverables: PhaseDeliverable[];
}[] = [
  {
    phase: 'Phase 1',
    name: 'Foundation, Cinematic Design System & Spatial Architecture',
    badge: 'Completed & Active',
    deliverables: [
      {
        title: 'Next.js 16 App Router & TypeScript Architecture',
        description: 'Robust modern React 19 structure with strict typings, responsive layouts, modular component hierarchy, and zero hydration warnings.',
        status: 'completed',
        tags: ['Next.js 16', 'TypeScript', 'App Router']
      },
      {
        title: 'Cinematic Travel-Tech Design System',
        description: 'Palette composed of deep navy, midnight blue, teal, turquoise, warm sunset orange, and delicate glassmorphism with layered shadows.',
        status: 'completed',
        tags: ['Tailwind CSS v4', 'Glassmorphism', 'Design Tokens']
      },
      {
        title: 'Interactive Travel & Destination Explorer',
        description: 'Multi-criteria dynamic filtering by Biome, Season, and Difficulty, complete with elevation metrics and real coordinates.',
        status: 'completed',
        tags: ['Interactive Filter', 'Real Telemetry', 'State Management']
      },
      {
        title: '3D Spatial Staging & Atmospheric Depth Backing',
        description: 'Layered atmospheric depth with horizon sunlight glow, topographic contour grid backing, and 3D preview viewport stage.',
        status: 'completed',
        tags: ['3D Staging', 'CSS Depth Effects', 'Atmospheric Haze']
      }
    ]
  },
  {
    phase: 'Phase 2',
    name: 'Interactive 3D Terrain Engine (Three.js & React Three Fiber)',
    badge: 'Next Milestone',
    deliverables: [
      {
        title: 'Interactive 3D WebGL Terrain Renderer',
        description: 'Integration of Three.js / React Three Fiber inside the Hero 3D Viewport with real-time camera orbits and altitude contour shaders.',
        status: 'planned',
        tags: ['Three.js', 'React Three Fiber', 'GLSL Shaders']
      },
      {
        title: 'Volumetric Clouds & Dynamic Solar Angles',
        description: 'Atmospheric raymarching for sunlight scattering, drifting mist, and diurnal cycle simulations across mountains and cliff formations.',
        status: 'planned',
        tags: ['Volumetric Clouds', 'Lighting Shader', 'Skybox']
      },
      {
        title: 'LiDAR Elevation Tile Streaming',
        description: 'Dynamic Level-of-Detail (LOD) quadtree tile streaming for realistic terrain elevation rendering.',
        status: 'planned',
        tags: ['GeoTIFF', 'LOD System', 'Heightmaps']
      }
    ]
  },
  {
    phase: 'Phase 3',
    name: 'Autonomous Travel AI & Environmental Routing',
    badge: 'Final Milestone',
    deliverables: [
      {
        title: 'AI-Powered Eco Route Synthesizer',
        description: 'Topographic difficulty calculation, weather predictive modeling, and lowest-carbon footprint itinerary generator.',
        status: 'planned',
        tags: ['AI Routing', 'Carbon Modeling', 'GIS Data']
      },
      {
        title: 'Live Sensor & Satellite Telemetry Ingestion',
        description: 'Integration of real-time Copernicus climate feeds, trail safety notices, and park preservation guidelines.',
        status: 'planned',
        tags: ['Copernicus API', 'Telemetry', 'Trail Safety']
      }
    ]
  }
];
