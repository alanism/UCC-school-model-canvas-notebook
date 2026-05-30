import React from 'react';

interface BookTab {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface BookLayoutProps {
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
  tabs?: BookTab[];
  mobileNav?: React.ReactNode;
}

export default function BookLayout({
  leftPage,
  rightPage,
  tabs = [],
  mobileNav
}: BookLayoutProps) {
  return (
    <div className="w-full flex flex-col">
      {/* Mobile-only selector nav */}
      {mobileNav && (
        <div className="block lg:hidden mb-4 select-none">
          {mobileNav}
        </div>
      )}

      {/* The Physical Archival Book Binder Deck */}
      <div 
        id="archival-book-binder"
        className="w-full relative shadow-[0_28px_70px_rgba(40,30,30,0.18)] bg-bg-binder border border-border-binder rounded-3xl p-[7px] md:p-[10px] overflow-visible transition-all duration-300"
      >
        {/* Paper Double Leaf Sheet */}
        <div 
          id="book-paper-leaves"
          className="relative bg-white border border-border-accent/60 rounded-2xl flex flex-col lg:flex-row min-h-[720px] lg:min-h-[820px] overflow-visible shadow-[inset_0_0_50px_rgba(40,25,25,0.03)] pb-10 lg:pb-0"
        >
          {/* Left Page Column */}
          <div 
            id="book-left-page"
            className="w-full lg:w-1/2 p-6 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between relative z-10 text-left border-b lg:border-b-0 lg:border-r border-neutral-100"
          >
            {leftPage}
          </div>

          {/* Book Spine Crease Fold Shadow Overlay (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-16 -ml-8 z-20 pointer-events-none bg-gradient-to-r from-black/[0.015] via-black/[0.08] to-black/[0.015]" />
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 z-20 pointer-events-none bg-gradient-to-r from-transparent via-black/[0.04] to-transparent border-r border-border-accent/40" />
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] z-30 pointer-events-none bg-black/[0.07]" />

          {/* Right Page Column */}
          <div 
            id="book-right-page"
            className="w-full lg:w-1/2 p-6 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between relative z-10 text-left"
          >
            {rightPage}
          </div>

          {/* Overlapping 3D Folder Tabs Sticking out of the book (Desktop Only) */}
          {tabs.length > 0 && (
            <div 
              id="book-divider-tabs"
              className="hidden lg:flex absolute left-full top-6 flex-col gap-1.5 select-none overflow-visible z-0"
            >
              {tabs.map((tab, idx) => {
                const isCompact = tabs.length > 6;
                const heightClass = tab.isActive 
                  ? (isCompact ? 'h-18 px-1 w-11' : 'h-32 w-11') 
                  : (isCompact ? 'h-14 px-1 w-10' : 'h-28 w-10');
                
                return (
                  <button
                    key={tab.id}
                    onClick={tab.onClick}
                    className={`vertical-text font-mono text-[8px] xl:text-[9px] uppercase tracking-widest cursor-pointer select-none transition-all duration-200 flex items-center justify-center text-center leading-none ${heightClass} ${
                      tab.isActive 
                      ? 'bg-white text-primary font-bold border-y border-r border-border-accent shadow-[5px_2px_10px_rgba(0,0,0,0.06)] -ml-[1px] translate-x-[2px] z-20' 
                      : 'bg-bg-tab-inactive/80 hover:bg-white text-on-surface-variant/85 border-y border-r border-border-tab-inactive hover:text-primary -ml-[2px] z-10 shadow-[inset_4px_0_12px_rgba(0,0,0,0.06)]'
                    }`}
                    style={{
                      zIndex: tab.isActive ? 20 : 10 - idx
                    }}
                  >
                    <span className="truncate max-w-[120px]">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
