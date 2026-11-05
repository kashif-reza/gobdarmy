/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShowcaseProvider, useShowcase } from './context/ShowcaseContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Modals
import { RankDetailModal } from './components/modals/RankDetailModal';
import { PostDetailModal } from './components/modals/PostDetailModal';
import { UniformViewerModal } from './components/modals/UniformViewerModal';
import { BadgeDetailModal } from './components/modals/BadgeDetailModal';
import { EquipmentDetailModal } from './components/modals/EquipmentDetailModal';
import { CareerDetailModal } from './components/modals/CareerDetailModal';

// Views
import { DashboardView } from './views/DashboardView';
import { ForcesView } from './views/ForcesView';
import { ForceDetailView } from './views/ForceDetailView';
import { RanksView } from './views/RanksView';
import { PostsView } from './views/PostsView';
import { UniformsView } from './views/UniformsView';
import { BadgesView } from './views/BadgesView';
import { EquipmentView } from './views/EquipmentView';
import { CapabilitiesView } from './views/CapabilitiesView';
import { CareersView } from './views/CareersView';
import { CompareView } from './views/CompareView';
import { FavoritesView } from './views/FavoritesView';
import { AdminView } from './views/AdminView';
import { AptitudeSimulator } from './components/AptitudeSimulator';

const MainContent: React.FC = () => {
  const { activeView, setActiveView } = useShowcase();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#060907] text-stone-100 flex flex-col font-sans selection:bg-[#c5a059]/30 selection:text-white">
      {/* Top Bar */}
      <Navbar />

      {/* Main Workspace: Sidebar + Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Sidebar */}
        <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'forces' && <ForcesView />}
          {activeView === 'force-detail' && <ForceDetailView />}
          {activeView === 'ranks' && <RanksView />}
          {activeView === 'posts' && <PostsView />}
          {activeView === 'uniforms' && <UniformsView />}
          {activeView === 'badges' && <BadgesView />}
          {activeView === 'equipment' && <EquipmentView />}
          {activeView === 'capabilities' && <CapabilitiesView />}
          {activeView === 'careers' && <CareersView />}
          {activeView === 'simulator' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <AptitudeSimulator onClose={() => setActiveView('careers')} />
            </div>
          )}
          {activeView === 'compare' && <CompareView />}
          {activeView === 'favorites' && <FavoritesView />}
          {activeView === 'admin' && <AdminView />}

          {/* Footer */}
          <footer className="border-t border-stone-800/80 bg-[#050806] py-10 px-4 sm:px-6 lg:px-8 mt-16 text-xs text-stone-400">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-sm font-bold text-stone-200 font-display">
                  TACTICAL <span className="text-[#c5a059]">//</span> BD
                </div>
                <p className="text-stone-500">
                  Interactive Defense Forces Digital Showcase & Encyclopedia. Verified Public Information.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-stone-400">
                <button
                  onClick={() => setActiveView('forces')}
                  className="hover:text-stone-200 cursor-pointer"
                >
                  Forces
                </button>
                <button
                  onClick={() => setActiveView('ranks')}
                  className="hover:text-stone-200 cursor-pointer"
                >
                  Ranks
                </button>
                <button
                  onClick={() => setActiveView('equipment')}
                  className="hover:text-stone-200 cursor-pointer"
                >
                  Equipment
                </button>
                <button
                  onClick={() => setActiveView('capabilities')}
                  className="hover:text-stone-200 cursor-pointer"
                >
                  Capabilities
                </button>
                <button
                  onClick={() => setActiveView('careers')}
                  className="hover:text-stone-200 cursor-pointer"
                >
                  Careers
                </button>
                <button
                  onClick={() => setActiveView('admin')}
                  className="text-stone-500 hover:text-stone-300 cursor-pointer"
                >
                  Showcase Editor
                </button>
              </div>
            </div>

            <div className="max-w-7xl mx-auto pt-6 mt-6 border-t border-stone-900 text-center text-stone-600 text-[11px] font-mono">
              TACTICAL // BD · Educational Defense Encyclopedia · Built for Bangladesh Armed Forces Showcase
            </div>
          </footer>
        </main>
      </div>

      {/* Global Modals & Dialogs */}
      <RankDetailModal />
      <PostDetailModal />
      <UniformViewerModal />
      <BadgeDetailModal />
      <EquipmentDetailModal />
      <CareerDetailModal />
      <GlobalSearchModal />

      {/* Floating Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShowcaseProvider>
      <MainContent />
    </ShowcaseProvider>
  );
}
