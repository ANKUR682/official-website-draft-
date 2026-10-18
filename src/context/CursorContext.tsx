import React, { createContext, useContext, useState } from 'react';

export type CursorVariant = 'default' | 'project' | 'service' | 'button' | 'link' | 'glow';

interface CursorContextValue {
  variant: CursorVariant;
  label: string;
  setCursor: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextValue>({
  variant: 'default',
  label: '',
  setCursor: () => {},
  resetCursor: () => {},
});

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [label, setLabel] = useState<string>('');

  const setCursor = (nextVariant: CursorVariant, nextLabel = '') => {
    setVariant(nextVariant);
    setLabel(nextLabel);
  };

  const resetCursor = () => {
    setVariant('default');
    setLabel('');
  };

  return (
    <CursorContext.Provider value={{ variant, label, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
