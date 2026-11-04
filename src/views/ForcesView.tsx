import React from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { Shield, ArrowRight, MapPin, Users, Calendar, Flag } from 'lucide-react';

export const ForcesView: React.FC = () => {
  const { forces, navigateToForce } = useShowcase();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5">
        <div className="text-xs font-mono uppercase text-[#c5a059] tracking-widest">
          Sovereignty & National Security
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-display mt-1">
          Bangladesh Defense Forces
        </h1>
        <p className="text-sm text-stone-400 mt-2 max-w-2xl leading-relaxed">
          Comprehensive exploration of the three service branches of the Bangladesh Armed Forces:
          the Army, the Navy, and the Air Force, safeguarding the homeland across land, sea, and air.
        </p>
      </div>

      {/* Force Showcase Cards */}
      <div className="space-y-8">
        {forces.map((force, index) => (
          <div
            key={force.id}
            className="rounded-2xl bg-[#090f0c] border border-stone-800 overflow-hidden shadow-xl hover:border-stone-700 transition-all grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Left: Force Hero Visual */}
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[380px] bg-stone-900 overflow-hidden">
              <img
                src={force.bannerImage}
                alt={force.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-mono text-[#c5a059] uppercase tracking-wider">
                  Service Branch 0{index + 1}
                </div>
                <h3 className="text-2xl font-bold font-display">{force.name}</h3>
                <div className="text-sm font-display text-stone-300">{force.nativeName}</div>
              </div>
            </div>

            {/* Right: Force Service Identity & Key Specs */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Official Motto */}
                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800">
                  <div className="text-[11px] font-mono text-stone-400 uppercase">Service Motto</div>
                  <div className="text-sm font-semibold text-stone-100 font-display mt-0.5">
                    "{force.motto}"
                  </div>
                  <div className="text-xs text-[#c5a059] font-display mt-0.5">{force.nativeMotto}</div>
                </div>

                {/* Overview */}
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {force.overview}
                </p>

                {/* Key Attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="flex items-center gap-2 text-stone-300">
                    <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Est. {force.established}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-300">
                    <Users className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span className="truncate">{force.commanderTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-300 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="truncate">{force.headquarters}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400">
                  {force.personnelEstimate.split('(')[0]}
                </span>
                <button
                  onClick={() => navigateToForce(force.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Open Service Explorer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
