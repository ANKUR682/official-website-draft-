import React, { useRef } from 'react';
import { useCursor, CursorVariant } from '../context/CursorContext';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  cursorVariant?: CursorVariant;
  cursorLabel?: string;
  strength?: number;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  cursorVariant = 'button',
  cursorLabel = '',
  strength = 0.28,
  type = 'button',
  ariaLabel,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const { setCursor, resetCursor } = useCursor();

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const handleMouseEnter = () => {
    setCursor(cursorVariant, cursorLabel);
  };

  const handleMouseLeave = () => {
    resetCursor();
    if (ref.current) {
      ref.current.style.transform = 'translate3d(0px, 0px, 0px)';
    }
  };

  const sharedClasses = `inline-flex items-center justify-center whitespace-nowrap shrink-0 transition-transform duration-200 ease-out will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF] ${className}`;

  if (href) {
    return (
      <a
        ref={(node) => {
          ref.current = node;
        }}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel}
        className={sharedClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={(node) => {
        ref.current = node;
      }}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      className={sharedClasses}
    >
      {children}
    </button>
  );
};
