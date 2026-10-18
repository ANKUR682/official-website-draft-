import React, { useRef, useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { ProjectItem } from '../data/studioData';
import { useCursor } from '../context/CursorContext';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect }) => {
  const cardRef = useRef<HTMLElement>(null);
  const [imgError, setImgError] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: nx * 10, y: ny * -10 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursor('view', 'VIEW');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    resetCursor();
  };

  // Asymmetric editorial vertical offset on even cards for desktop rhythm
  const isOffset = index % 2 === 1;

  return (
    <article
      ref={cardRef}
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={`Inspect project ${project.number} ${project.title} — ${project.subtitle}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      style={{
        backgroundColor: isHovered ? 'rgba(20, 18, 34, 0.85)' : 'rgba(12, 12, 18, 0.7)',
      }}
      className={`group relative border border-white/10 hover:border-[#7C5CFF]/60 transition-colors duration-500 p-5 sm:p-7 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#7C5CFF] ${
        isOffset ? 'lg:mt-20' : ''
      }`}
    >
      {/* Top Unboxed Metadata Row (Zero-Pill Discipline) */}
      <div className="flex items-center justify-between text-xs font-mono-tabular text-zinc-400 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">{project.number}</span>
          <span aria-hidden="true">—</span>
          <span className="text-zinc-300 uppercase tracking-wider">{project.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* Large Cinematic Image Viewport with Subtle Hover Distortion & Scale */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#09090F] mb-6">
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.title} — ${project.subtitle}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              transform: isHovered
                ? `scale(1.06) translate3d(${tilt.x * 0.8}px, ${tilt.y * 0.8}px, 0) skewX(${
                    tilt.x * 0.12
                  }deg)`
                : 'scale(1) translate3d(0, 0, 0) skewX(0deg)',
            }}
            className="w-full h-full object-cover transition-transform duration-500 ease-out will-change-transform"
          />
        ) : (
          /* Resilient Styled Fallback Container (Zero-Broken-Image Policy) */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#131124] via-[#0B0B12] to-[#1D163B] p-8 text-center">
            <Layers className="w-10 h-10 text-[#7C5CFF] mb-3" />
            <span className="font-display text-2xl font-bold text-white">{project.title}</span>
            <span className="text-xs text-zinc-400 mt-1">{project.subtitle}</span>
          </div>
        )}

        {/* Measured Contrast Scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Subtle Bottom Metric Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-tabular text-zinc-200">
          <span>{project.impactMetric}</span>
          <span className="inline-flex items-center gap-1 text-white group-hover:translate-x-1 transition-transform">
            <span>CASE STUDY</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8B70FF]" />
          </span>
        </div>
      </div>

      {/* Project Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight transition-transform duration-300 group-hover:translate-x-2">
            {project.number} — {project.title}
          </h3>
          <p className="text-sm font-medium text-[#9D85FF] mt-1">{project.subtitle}</p>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
};
