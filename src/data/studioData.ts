import realHeroArchitecture from '../assets/images/real_4k_hero_architecture_1791445547051.jpg';
import realAetherEditorial from '../assets/images/real_4k_aether_editorial_1791445557786.jpg';
import realOrbitProduct from '../assets/images/real_4k_orbit_product_1791445570462.jpg';
import realMonolithPavilion from '../assets/images/real_4k_monolith_pavilion_1791445581438.jpg';
import realFluxStudio from '../assets/images/real_4k_flux_studio_1791445591388.jpg';
import realAcousticHardware from '../assets/images/real_4k_acoustic_hardware_1791445600518.jpg';
import monoArchTwilight from '../assets/images/project_mono_arch_1791442788087.jpg';
import kairoTitaniumObject from '../assets/images/project_kairo_object_1791442797901.jpg';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  oneLiner: string;
  metric: string;
  theme: 'dark' | 'light';
}

export interface ServiceRowItem {
  number: string;
  title: string;
  caption: string;
  image: string;
}

export interface ProcessVisualStep {
  number: string;
  title: string;
  oneLiner: string;
  image: string;
}

export interface TechOrbitItem {
  id: string;
  label: string;
  caption: string;
  position: [number, number, number];
}

export interface TestimonialQuote {
  id: string;
  lines: [string, string];
  client: string;
  role: string;
  image: string;
}

export interface PricingRowItem {
  id: string;
  name: string;
  price: string;
  timeline: string;
  deliverables: string[];
}

export const VISUAL_ASSETS = {
  heroArchitecture: realHeroArchitecture,
  visualBreakLight: realAcousticHardware,
  aboutAtrium: realFluxStudio,
  ctaMonolith: realMonolithPavilion,
  caseStudyTransform: realOrbitProduct,
  kairoObject: kairoTitaniumObject,
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'aether',
    number: '01',
    title: 'AETHER',
    category: 'Immersive Brand Experience',
    year: '2026',
    image: realAetherEditorial,
    oneLiner: 'Milanese architectural couture flagship and spatial lookbook.',
    metric: '+210% Flagship Conversion',
    theme: 'dark',
  },
  {
    id: 'orbit',
    number: '02',
    title: 'ORBIT',
    category: 'Digital Product Experience',
    year: '2026',
    image: realOrbitProduct,
    oneLiner: 'Precision hardware and institutional private banking platform.',
    metric: '$42M Volume Onboarded',
    theme: 'light',
  },
  {
    id: 'monolith',
    number: '03',
    title: 'MONOLITH',
    category: 'Interactive Architecture',
    year: '2025',
    image: realMonolithPavilion,
    oneLiner: 'Kyoto architectural monograph and natural light simulator.',
    metric: 'Site of the Month Winner',
    theme: 'dark',
  },
  {
    id: 'flux',
    number: '04',
    title: 'FLUX',
    category: 'Creative Technology',
    year: '2026',
    image: realAcousticHardware,
    oneLiner: 'Bespoke acoustic industrial design and spatial audio web engine.',
    metric: '1.2M Interactive Sessions',
    theme: 'light',
  },
];

export const SERVICE_ROWS: ServiceRowItem[] = [
  {
    number: '01',
    title: 'STRATEGY',
    caption: 'Positioning, digital architecture & category narrative.',
    image: realHeroArchitecture,
  },
  {
    number: '02',
    title: 'DIGITAL DESIGN',
    caption: 'Editorial typography, spatial interfaces & design systems.',
    image: realAetherEditorial,
  },
  {
    number: '03',
    title: 'DEVELOPMENT',
    caption: 'High-frame-rate React, Next.js & headless commerce.',
    image: realOrbitProduct,
  },
  {
    number: '04',
    title: '3D & MOTION',
    caption: 'Three.js sculptures, GSAP choreography & physics.',
    image: realAcousticHardware,
  },
  {
    number: '05',
    title: 'CREATIVE TECHNOLOGY',
    caption: 'Custom GLSL shaders, WebGL worlds & interactive prototypes.',
    image: realMonolithPavilion,
  },
];

export const STORY_SEQUENCE = [
  { step: '01', word: 'IDEA', caption: 'Raw ambition distilled into a singular visual thesis.' },
  { step: '02', word: 'DESIGN', caption: 'Light, proportion, and high-contrast editorial tension.' },
  { step: '03', word: 'CODE', caption: 'Deterministic architecture engineered for zero latency.' },
  { step: '04', word: 'MOTION', caption: 'Velocity, inertia, and tactile physical response.' },
  { step: '05', word: 'EXPERIENCE', caption: 'Immersion that turns visitors into believers.' },
  { step: '06', word: 'NOVA', caption: 'Where digital craft becomes unforgettable.' },
];

export const PROCESS_VISUAL_STEPS: ProcessVisualStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    oneLiner: 'Uncovering the commercial and architectural opportunity.',
    image: realFluxStudio,
  },
  {
    number: '02',
    title: 'DEFINE',
    oneLiner: 'Establishing spatial direction, motion physics, and structure.',
    image: realHeroArchitecture,
  },
  {
    number: '03',
    title: 'DESIGN',
    oneLiner: 'Crafting high-contrast editorial systems and 3D prototypes.',
    image: realAetherEditorial,
  },
  {
    number: '04',
    title: 'BUILD',
    oneLiner: 'Engineering WebGL shaders, React systems, and fluid transitions.',
    image: realOrbitProduct,
  },
  {
    number: '05',
    title: 'LAUNCH',
    oneLiner: 'Global edge deployment calibrated for 60fps performance.',
    image: realMonolithPavilion,
  },
];

export const TECH_ORBIT_ITEMS: TechOrbitItem[] = [
  {
    id: 'threejs',
    label: 'THREE.JS',
    caption: 'Real-time 3D scenes, PBR lighting & spatial camera rigs.',
    position: [-2.4, 1.1, 0.8],
  },
  {
    id: 'react',
    label: 'REACT',
    caption: 'Concurrent UI orchestration paired with declarative 3D state.',
    position: [2.4, 1.2, 0.5],
  },
  {
    id: 'webgl',
    label: 'WEBGL',
    caption: 'Hardware-accelerated GPU rendering at 60 frames per second.',
    position: [-2.8, -0.3, -0.4],
  },
  {
    id: 'gsap',
    label: 'GSAP',
    caption: 'ScrollTrigger pinning, timeline scrubbing & kinetic typography.',
    position: [2.7, -0.4, 0.7],
  },
  {
    id: 'node',
    label: 'NODE',
    caption: 'Low-latency APIs, real-time streams & edge compute.',
    position: [-1.6, -1.5, 0.6],
  },
  {
    id: 'ai',
    label: 'AI',
    caption: 'Generative spatial workflows and intelligent interfaces.',
    position: [1.7, -1.4, -0.5],
  },
  {
    id: 'glsl',
    label: 'GLSL',
    caption: 'Custom vertex displacement, liquid chrome & optical refraction.',
    position: [-0.8, 1.7, -0.7],
  },
  {
    id: 'nextjs',
    label: 'NEXT.JS',
    caption: 'Global hybrid edge delivery and instant route transitions.',
    position: [0.9, 1.6, -0.6],
  },
];

export const TESTIMONIAL_QUOTES: TestimonialQuote[] = [
  {
    id: 'aether',
    lines: [
      'THEY DIDN’T JUST BUILD OUR WEBSITE.',
      'THEY BUILT OUR DIGITAL IDENTITY.',
    ],
    client: 'ALEX MORGAN',
    role: 'FOUNDER, AETHER MILAN · +210% CONVERSION',
    image: realAetherEditorial,
  },
  {
    id: 'orbit',
    lines: [
      'ENGINEERING AND ART DIRECTION',
      'AT A LEVEL WE HAD NEVER SEEN.',
    ],
    client: 'ELENA ROSTOVA',
    role: 'CPO, ORBIT FINANCIAL · $42M ONBOARDED',
    image: realOrbitProduct,
  },
  {
    id: 'monolith',
    lines: [
      'OUR DIGITAL FLAGSHIP BECAME',
      'OUR STRONGEST SALES ENGINE.',
    ],
    client: 'KENJI TAKAHASHI',
    role: 'PARTNER, MONOLITH KYOTO · SITE OF THE MONTH',
    image: monoArchTwilight,
  },
];

export const PRICING_ROWS: PricingRowItem[] = [
  {
    id: 'starter',
    name: 'STARTER',
    price: '₹75K+',
    timeline: '3–4 WEEKS',
    deliverables: ['Brand Direction', 'Bespoke UI/UX', 'Motion Choreography', 'Edge Deployment'],
  },
  {
    id: 'growth',
    name: 'GROWTH',
    price: '₹1.5L+',
    timeline: '5–7 WEEKS',
    deliverables: ['Custom 3D / WebGL', 'Interactive Storytelling', 'Headless CMS', 'Performance Profiling'],
  },
  {
    id: 'experience',
    name: 'EXPERIENCE',
    price: '₹3L+',
    timeline: '8–12 WEEKS',
    deliverables: ['Full WebGL World', 'Custom GLSL Shaders', 'Full-Stack Web App', 'Dedicated Retainer'],
  },
];
