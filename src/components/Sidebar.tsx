import React from 'react';
import { useShowcase, ViewSection } from '../context/ShowcaseContext';
import {
  LayoutDashboard,
  Shield,
  Award,
  Users,
  Shirt,
  Plane,
  Globe2,
  Compass,
  SlidersHorizontal,
  Bookmark,
  Settings,
  ChevronLeft,
  ChevronRight,
  Anchor,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const {
    activeView,
    setActiveView,
    selectedForceId,
    navigateToForce,
    favorites,
    compareItems,
  } = useShowcase();

  const handleForceClick = (forceId: string) => {
    navigateToForce(forceId);
  };

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-stone-800/80 bg-[#060a08]/95 backdrop-blur-md transition-all duration-300 z-30 shrink-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Bar */}
      <div className="flex items-center justify-between p-3 border-b border-stone-800/80 text-stone-400">
        {!isCollapsed && (
          <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
            Showcase Modules
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer ml-auto"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1 scrollbar-none">
        {/* Main Dashboard */}
        <button
          onClick={() => setActiveView('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeView === 'dashboard'
              ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
              : 'text-stone-300 hover:bg-stone-900 hover:text-white'
          }`}
          title="Command Dashboard"
        >
          <LayoutDashboard className="w-4 h-4 text-emerald-400 shrink-0" />
          {!isCollapsed && <span>Dashboard</span>}
        </button>

        {/* Forces Group */}
        <div className="pt-3 pb-1">
          {!isCollapsed && (
            <div className="px-3 text-[10px] font-mono text-stone-500 uppercase tracking-wider">
              Forces & Services
            </div>
          )}
          <div className="space-y-0.5 mt-1">
            <button
              onClick={() => handleForceClick('army')}
              className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'force-detail' && selectedForceId === 'army'
                  ? 'bg-emerald-950 text-emerald-300 font-semibold border border-emerald-800/50'
                  : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
              }`}
              title="Bangladesh Army"
            >
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              {!isCollapsed && <span className="truncate">Bangladesh Army</span>}
            </button>

            <button
              onClick={() => handleForceClick('navy')}
              className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'force-detail' && selectedForceId === 'navy'
                  ? 'bg-sky-950 text-sky-300 font-semibold border border-sky-800/50'
                  : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
              }`}
              title="Bangladesh Navy"
            >
              <Anchor className="w-4 h-4 text-sky-400 shrink-0" />
              {!isCollapsed && <span className="truncate">Bangladesh Navy</span>}
            </button>

            <button
              onClick={() => handleForceClick('air-force')}
              className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'force-detail' && selectedForceId === 'air-force'
                  ? 'bg-indigo-950 text-indigo-300 font-semibold border border-indigo-800/50'
                  : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
              }`}
              title="Bangladesh Air Force"
            >
              <Plane className="w-4 h-4 text-indigo-400 shrink-0" />
              {!isCollapsed && <span className="truncate">Bangladesh Air Force</span>}
            </button>
          </div>
        </div>

        {/* Catalogs Group */}
        <div className="pt-3 pb-1">
          {!isCollapsed && (
            <div className="px-3 text-[10px] font-mono text-stone-500 uppercase tracking-wider">
              Catalogs & Explorer
            </div>
          )}
          <div className="space-y-0.5 mt-1">
            <button
              onClick={() => setActiveView('ranks')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'ranks'
                  ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                  : 'text-stone-300 hover:bg-stone-900 hover:text-white'
              }`}
              title="Rank Explorer"
            >
              <Award className="w-4 h-4 text-[#c5a059] shrink-0" />
              {!isCollapsed && <span>Rank Explorer</span>}
            </button>

            <button
              onClick={() => setActiveView('posts')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'posts'
                  ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                  : 'text-stone-300 hover:bg-stone-900 hover:text-white'
              }`}
              title="Posts & Roles"
            >
              <Users className="w-4 h-4 text-emerald-400 shrink-0" />
              {!isCollapsed && <span>Posts & Roles</span>}
            </button>

            <button
              onClick={() => setActiveView('uniforms')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'uniforms'
                  ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                  : 'text-stone-300 hover:bg-stone-900 hover:text-white'
              }`}
              title="Uniform Explorer"
            >
              <Shirt className="w-4 h-4 text-sky-400 shrink-0" />
              {!isCollapsed && <span>Uniforms</span>}
            </button>

            <button
              onClick={() => setActiveView('badges')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'badges'
                  ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                  : 'text-stone-300 hover:bg-stone-900 hover:text-white'
              }`}
              title="Badges & Insignia"
            >
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              {!isCollapsed && <span>Badges & Insignia</span>}
            </button>

            <button
              onClick={() => setActiveView('equipment')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'equipment'
                  ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                  : 'text-stone-300 hover:bg-stone-900 hover:text-white'
              }`}
              title="Equipment Explorer"
            >
              <Plane className="w-4 h-4 text-indigo-400 shrink-0" />
              {!isCollapsed && <span>Equipment & Fleet</span>}
            </button>

            <button
              onClick={() => setActiveView('capabilities')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'capabilities'
                  ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                  : 'text-stone-300 hover:bg-stone-900 hover:text-white'
              }`}
              title="Strategic Capabilities"
            >
              <Globe2 className="w-4 h-4 text-teal-400 shrink-0" />
              {!isCollapsed && <span>Capabilities</span>}
            </button>

            <button
              onClick={() => setActiveView('careers')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'careers'
                  ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                  : 'text-stone-300 hover:bg-stone-900 hover:text-white'
              }`}
              title="Career & ISSB Explorer"
            >
              <Compass className="w-4 h-4 text-rose-400 shrink-0" />
              {!isCollapsed && <span>Careers & ISSB</span>}
            </button>
          </div>
        </div>

        {/* Workbench & Tools */}
        <div className="pt-3 pb-1 border-t border-stone-800/80">
          {!isCollapsed && (
            <div className="px-3 text-[10px] font-mono text-stone-500 uppercase tracking-wider">
              Workbench
            </div>
          )}
          <div className="space-y-0.5 mt-1">
            <button
              onClick={() => setActiveView('compare')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'compare'
                  ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                  : 'text-stone-300 hover:bg-stone-900 hover:text-white'
              }`}
              title="Comparison Matrix"
            >
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-4 h-4 text-[#c5a059] shrink-0" />
                {!isCollapsed && <span>Compare</span>}
              </div>
              {compareItems.length > 0 && !isCollapsed && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[#c5a059] text-stone-950 font-bold">
                  {compareItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('favorites')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'favorites'
                  ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                  : 'text-stone-300 hover:bg-stone-900 hover:text-white'
              }`}
              title="Saved Favorites"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 text-emerald-400 shrink-0" />
                {!isCollapsed && <span>Favorites</span>}
              </div>
              {favorites.length > 0 && !isCollapsed && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-500 text-stone-950 font-bold">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('admin')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                  : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
              }`}
              title="Showcase Content Editor"
            >
              <Settings className="w-4 h-4 text-stone-400 shrink-0" />
              {!isCollapsed && <span>Showcase Editor</span>}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
