import React, { useState } from 'react';
import { useShowcase, ViewSection } from '../context/ShowcaseContext';
import { Search, Bookmark, SlidersHorizontal, Menu, X, Shield, Layers } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, setIsSearchOpen, favorites, compareItems } = useShowcase();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: ViewSection }[] = [
    { label: 'Dashboard', view: 'dashboard' },
    { label: 'Forces', view: 'forces' },
    { label: 'Ranks', view: 'ranks' },
    { label: 'Equipment', view: 'equipment' },
    { label: 'Careers', view: 'careers' },
    { label: 'Simulator', view: 'simulator' },
  ];

  const handleNavClick = (view: ViewSection) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-800/80 bg-[#060a08]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059] transition-colors">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold tracking-wider text-stone-100 font-display whitespace-nowrap">
              TACTICAL <span className="text-[#c5a059] font-normal">//</span> BD
            </div>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-300">
            {navLinks.map((link) => {
              const isActive = activeView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
                    isActive ? 'text-[#c5a059] font-semibold' : 'text-stone-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a059] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Utility Triggers */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Global Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 text-xs text-stone-300 hover:text-white transition-colors cursor-pointer shadow-sm"
              title="Search Defense Catalog (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Search Catalog</span>
              <kbd className="hidden md:inline text-[10px] bg-stone-800 px-1.5 py-0.5 rounded text-stone-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Compare items badge trigger */}
            <button
              onClick={() => setActiveView('compare')}
              className={`relative p-2 rounded-lg border transition-colors cursor-pointer ${
                activeView === 'compare'
                  ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059]'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:text-white'
              }`}
              title="Comparison Matrix"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {compareItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c5a059] text-stone-950 font-bold text-[10px] flex items-center justify-center">
                  {compareItems.length}
                </span>
              )}
            </button>

            {/* Favorites Counter Trigger */}
            <button
              onClick={() => setActiveView('favorites')}
              className={`relative p-2 rounded-lg border transition-colors cursor-pointer ${
                activeView === 'favorites'
                  ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059]'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:text-white'
              }`}
              title="Saved Favorites"
            >
              <Bookmark className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-stone-950 font-bold text-[10px] flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-[#090f0c] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => handleNavClick(link.view)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeView === link.view
                  ? 'bg-emerald-950 text-[#c5a059] font-medium'
                  : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-800/80 flex gap-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-center py-2 px-3 text-xs bg-stone-900 hover:bg-stone-800 rounded-lg text-stone-300"
            >
              Showcase Editor (Admin)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
