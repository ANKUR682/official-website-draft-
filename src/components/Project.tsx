import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../data/studioData';
import { useCursor } from '../context/CursorContext';

interface ProjectProps {
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
}

export const Project: React.FC<ProjectProps> = ({ project, index, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const { setCursor, resetCursor } = useCursor();

  const isLightCard = project.theme === 'light';

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setCursorOffset({ x: nx * 24, y: ny * 24 });
  };

  return (
    <article
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setHovered(true);
        setCursor('project', 'VIEW PROJECT →');
      }}
      onMouseLeave={() => {
        setHovered(false);
        setCursorOffset({ x: 0, y: 0 });
        resetCursor();
      }}
      tabIndex={0}
      role="button"
      aria-label={`${project.number} ${project.title} — ${project.category}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className={`group relative w-full py-16 md:py-24 px-6 sm:px-12 transition-colors duration-500 cursor-pointer ${
        isLightCard
          ? 'bg-[#F4F3EF] text-[#09090D]'
          : 'bg-[#070709] text-white'
      }`}
    >
      <div className="mx-auto max-w-[1440px]">
        {/* 75% VISUAL / 25% TEXT Viewport-Dominating Layout */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end ${
            index % 2 === 1 ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* 75% Visual Column (9 of 12 columns) */}
          <div
            className={`lg:col-span-9 relative aspect-[16/10] w-full overflow-hidden ${
              index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <img
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              referrerPolicy="no-referrer"
              style={{
                transform: hovered
                  ? `scale(1.06) translate3d(${cursorOffset.x * 0.4}px, ${
                      cursorOffset.y * 0.4
                    }px, 0) skewX(${cursorOffset.x * 0.06}deg)`
                  : 'scale(1) translate3d(0,0,0) skewX(0deg)',
                filter: hovered ? 'contrast(1.08) saturate(1.1)' : 'contrast(1) saturate(1)',
              }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
            />

            {/* Subtle contrast scrim */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

            {/* Floating Cursor-Following Arrow Badge Inside Visual */}
            <div
              style={{
                transform: `translate3d(${cursorOffset.x * 1.4}px, ${cursorOffset.y * 1.4}px, 0)`,
              }}
              className="pointer-events-none absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-200 shadow-2xl"
            >
              <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* 25% Minimal Typography Column (3 of 12 columns) */}
          <div
            className={`lg:col-span-3 flex flex-col justify-between space-y-6 ${
              index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <div className="flex items-center gap-3 font-mono-tabular text-xs tracking-[0.2em]">
              <span className={isLightCard ? 'text-[#5E3BEE] font-semibold' : 'text-[#8B70FF]'}>
                {project.number}
              </span>
              <span aria-hidden="true">—</span>
              <span className={isLightCard ? 'text-zinc-600' : 'text-zinc-400'}>
                {project.year}
              </span>
            </div>

            <div>
              <h3 className="font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-[-0.03em] leading-none transition-transform duration-300 group-hover:translate-x-2">
                {project.title}
              </h3>
              <p
                className={`font-mono-tabular text-xs uppercase tracking-[0.16em] mt-3 ${
                  isLightCard ? 'text-[#5E3BEE]' : 'text-[#9D85FF]'
                }`}
              >
                {project.category}
              </p>
            </div>

            {/* Strictly 1 short one-line description */}
            <p
              className={`text-sm leading-relaxed ${
                isLightCard ? 'text-zinc-700' : 'text-zinc-300'
              }`}
            >
              {project.oneLiner}
            </p>

            <div
              className={`pt-4 border-t font-mono-tabular text-xs ${
                isLightCard
                  ? 'border-black/15 text-zinc-800'
                  : 'border-white/15 text-zinc-300'
              }`}
            >
              {project.metric}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
