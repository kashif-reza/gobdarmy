import React from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { ThreeRadarCanvas } from '../components/ThreeRadarCanvas';
import { InsigniaView } from '../components/InsigniaView';
import {
  Shield,
  Award,
  Globe2,
  Anchor,
  Plane,
  Users,
  Shirt,
  Compass,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Search,
  Timer,
  Play,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    forces,
    ranks,
    equipment,
    uniforms,
    capabilities,
    navigateToForce,
    setActiveView,
    setIsSearchOpen,
    setSelectedRank,
    setSelectedEquipment,
  } = useShowcase();

  const featuredRanks = ranks.filter((r) => [1, 5, 8].includes(r.hierarchyLevel)).slice(0, 3);
  const featuredEquipment = equipment.slice(0, 3);

  return (
    <div className="space-y-16 py-6 pb-20">
      {/* 1. Hero Section */}
      <section className="relative">
        <div className="max-w-4xl mx-auto text-center space-y-4 px-4 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#c5a059] uppercase">
            <span>Bangladesh Armed Forces</span>
            <span>·</span>
            <span>Digital Encyclopedia & Defense Museum</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-100 tracking-tight font-display text-balance">
            TACTICAL <span className="text-[#c5a059]">//</span> BD
          </h1>

          <p className="text-base sm:text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed text-balance">
            Explore the Structure, Strength, and Identity of Bangladesh's Defense Forces.
            An interactive catalog of ranks, uniforms, insignia, equipment, and verified strategic capabilities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveView('forces')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-stone-950 font-bold text-sm transition-all shadow-lg hover:shadow-[#c5a059]/20 cursor-pointer"
            >
              <span>Explore All Forces</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700/80 text-sm transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Search Catalog</span>
              <kbd className="text-[10px] bg-stone-800 px-1.5 py-0.5 rounded text-stone-400 font-mono">⌘K</kbd>
            </button>
          </div>
        </div>

        {/* 3D Tactical Radar Canvas */}
        <div className="max-w-6xl mx-auto px-4">
          <ThreeRadarCanvas />
        </div>
      </section>

      {/* 2. Key National Defense Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#090f0c] border border-stone-800">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#c5a059] tabular-nums">
              #1 Top Contributor
            </div>
            <div className="text-xs text-stone-400 font-medium">UN Peacekeeping Missions Worldwide</div>
            <div className="text-[11px] text-stone-500 font-mono">UN DPO Official Records</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums">
              118,813 km²
            </div>
            <div className="text-xs text-stone-400 font-medium">Sovereign Maritime EEZ Defended</div>
            <div className="text-[11px] text-stone-500 font-mono">Bay of Bengal Coastline & Sea</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400 tabular-nums">
              24 / 7 QRA
            </div>
            <div className="text-xs text-stone-400 font-medium">Air Defense Scramble Coverage</div>
            <div className="text-[11px] text-stone-500 font-mono">Integrated Military-Civil Radars</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-200 tabular-nums">
              1971
            </div>
            <div className="text-xs text-stone-400 font-medium">Liberation War Foundation</div>
            <div className="text-[11px] text-stone-500 font-mono">Formed During Mukti Bahini Epoch</div>
          </div>
        </div>
      </section>

      {/* 3. Featured Defense Forces Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div>
            <h2 className="text-2xl font-bold text-stone-100 font-display">Bangladesh Armed Forces</h2>
            <p className="text-xs text-stone-400 mt-0.5">Explore each service branch in deep detail</p>
          </div>
          <button
            onClick={() => setActiveView('forces')}
            className="flex items-center gap-1 text-xs text-[#c5a059] hover:underline font-medium"
          >
            <span>View All Details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {forces.map((force) => (
            <div
              key={force.id}
              onClick={() => navigateToForce(force.id)}
              className="group relative rounded-2xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
            >
              {/* Force Banner Image */}
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <img
                  src={force.bannerImage}
                  alt={force.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090f0c] via-black/40 to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-[11px] font-mono text-stone-300 border border-stone-700/60">
                  Est. {force.established}
                </div>
              </div>

              {/* Force Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-stone-400 font-display">{force.nativeName}</div>
                  <h3 className="text-xl font-bold text-stone-100 font-display group-hover:text-[#c5a059] transition-colors">
                    {force.name}
                  </h3>
                  <div className="mt-2 text-xs italic text-[#c5a059]/90 border-l-2 border-[#c5a059] pl-2.5">
                    "{force.motto}"
                  </div>
                  <p className="text-xs text-stone-400 mt-3 line-clamp-3 leading-relaxed">
                    {force.overview}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-mono text-[11px]">
                    Commander: <span className="text-stone-200">{force.commanderTitle}</span>
                  </span>
                  <span className="text-emerald-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Quick Jump Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-stone-800 pb-3">
          <h2 className="text-2xl font-bold text-stone-100 font-display">Showcase Modules</h2>
          <p className="text-xs text-stone-400 mt-0.5">Direct access to the six specialized digital wings</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {[
            {
              title: 'Rank Hierarchy',
              desc: 'Official insignia & equivalence',
              icon: Award,
              view: 'ranks' as const,
              color: 'text-emerald-400',
            },
            {
              title: 'Posts & Roles',
              desc: 'Pilots, divers & commanders',
              icon: Users,
              view: 'posts' as const,
              color: 'text-[#c5a059]',
            },
            {
              title: 'Uniform Catalog',
              desc: 'Camo, dress white & flight suits',
              icon: Shirt,
              view: 'uniforms' as const,
              color: 'text-sky-400',
            },
            {
              title: 'Badges & Medals',
              desc: 'Bir Sreshtho & flight wings',
              icon: Shield,
              view: 'badges' as const,
              color: 'text-amber-400',
            },
            {
              title: 'Equipment & Gear',
              desc: 'Tanks, frigates & jet fighters',
              icon: Plane,
              view: 'equipment' as const,
              color: 'text-indigo-400',
            },
            {
              title: 'Careers & ISSB',
              desc: 'BMA, BNA & BAF academies',
              icon: Compass,
              view: 'careers' as const,
              color: 'text-rose-400',
            },
          ].map((mod, idx) => (
            <button
              key={idx}
              onClick={() => setActiveView(mod.view)}
              className="p-4 rounded-xl bg-[#090f0c] hover:bg-stone-900 border border-stone-800 hover:border-stone-700 text-left transition-all group cursor-pointer flex flex-col justify-between h-36"
            >
              <div className={`p-2 rounded-lg bg-stone-900 w-fit ${mod.color}`}>
                <mod.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors">
                  {mod.title}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">{mod.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Interactive ISSB Exam Simulator Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-emerald-800/60 bg-gradient-to-r from-[#09150e] via-[#0b1c13] to-[#08120c] p-6 sm:p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a059] uppercase tracking-wider">
              <Timer className="w-4 h-4 text-rose-400" />
              <span>Real-Time Examination Simulator</span>
              <span>·</span>
              <span className="text-emerald-400 font-bold">Subtle Web Audio Alerts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-100 font-display">
              Candidate Aptitude & Tactical Reaction Simulator
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Step into the ISSB examination atmosphere with real-time countdown clocks, audio alerts for urgent time thresholds, procedural task completion chimes, and tactical officer decision-making drills.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => setActiveView('simulator')}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-stone-950 font-bold text-xs transition-all shadow-xl hover:shadow-[#c5a059]/30 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-stone-950" />
              <span>Launch Live Simulator</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Spotlight: Featured Ranks & Equipment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Ranks */}
          <div className="p-6 rounded-2xl bg-[#090f0c] border border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
              <div>
                <h3 className="text-lg font-bold text-stone-100 font-display">Featured Rank Insignias</h3>
                <div className="text-xs text-stone-400">Commissioned hierarchy across the forces</div>
              </div>
              <button
                onClick={() => setActiveView('ranks')}
                className="text-xs text-[#c5a059] hover:underline"
              >
                View Catalog
              </button>
            </div>

            <div className="space-y-3">
              {featuredRanks.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedRank(r)}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-900/40 hover:bg-stone-800/60 border border-stone-800/60 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <InsigniaView rank={r} size="sm" />
                    <div>
                      <div className="text-sm font-semibold text-stone-200">{r.name}</div>
                      <div className="text-xs text-stone-400">
                        {r.force} · {r.careerLevel}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Featured Equipment */}
          <div className="p-6 rounded-2xl bg-[#090f0c] border border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
              <div>
                <h3 className="text-lg font-bold text-stone-100 font-display">Defense Assets & Gear</h3>
                <div className="text-xs text-stone-400">Air, naval and land equipment</div>
              </div>
              <button
                onClick={() => setActiveView('equipment')}
                className="text-xs text-[#c5a059] hover:underline"
              >
                View Equipment
              </button>
            </div>

            <div className="space-y-3">
              {featuredEquipment.map((eq) => (
                <div
                  key={eq.id}
                  onClick={() => setSelectedEquipment(eq)}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-900/40 hover:bg-stone-800/60 border border-stone-800/60 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={eq.image}
                      alt={eq.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-10 object-cover rounded-lg bg-black"
                    />
                    <div>
                      <div className="text-sm font-semibold text-stone-200 line-clamp-1">{eq.name}</div>
                      <div className="text-xs text-stone-400">
                        {eq.force} · {eq.category}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Public Source & Accuracy Footer Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-xl bg-stone-900/30 border border-stone-800/60 text-center text-xs text-stone-400 space-y-1">
          <div className="font-semibold text-stone-300">Public Information & Transparency Policy</div>
          <p className="max-w-3xl mx-auto leading-relaxed">
            TACTICAL // BD displays verified, publicly accessible educational information regarding the structure, history, insignia, and openly documented capabilities of the Bangladesh Armed Forces. No sensitive operational deployments, real-time tactical positions, or classified materials are hosted.
          </p>
        </div>
      </section>
    </div>
  );
};
