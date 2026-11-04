import React, { useState } from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { InsigniaView } from '../components/InsigniaView';
import {
  ArrowLeft,
  Award,
  Shirt,
  Shield,
  Users,
  MapPin,
  ExternalLink,
  ChevronRight,
  Calendar,
  Building,
} from 'lucide-react';

export const ForceDetailView: React.FC = () => {
  const {
    selectedForceId,
    forces,
    ranks,
    posts,
    uniforms,
    badges,
    equipment,
    setActiveView,
    setSelectedRank,
    setSelectedPost,
    setSelectedUniform,
    setSelectedBadge,
    setSelectedEquipment,
  } = useShowcase();

  const [activeTab, setActiveTab] = useState<'ranks' | 'uniforms' | 'equipment' | 'roles' | 'badges' | 'bases'>('ranks');

  const force = forces.find((f) => f.id === selectedForceId) || forces[0];

  // Filtered collections for this force
  const forceRanks = ranks.filter((r) => r.force === force.name);
  const forcePosts = posts.filter((p) => p.force === force.name);
  const forceUniforms = uniforms.filter((u) => u.force === force.name);
  const forceBadges = badges.filter((b) => b.force === force.name || b.force === 'Joint / Armed Forces');
  const forceEquipment = equipment.filter((e) => e.force === force.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveView('forces')}
          className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Forces</span>
        </button>

        <a
          href={force.officialPortal}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-[#c5a059] hover:underline"
        >
          <span>Official Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Force Header Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-[#090f0c]">
        <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-900">
          <img
            src={force.bannerImage}
            alt={force.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090f0c] via-black/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase text-[#c5a059] tracking-wider">
                Official Defense Force
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                {force.name}
              </h1>
              <div className="text-lg font-display text-stone-300">{force.nativeName}</div>
            </div>

            <div className="p-3 rounded-xl bg-black/70 backdrop-blur-sm border border-stone-800 text-right">
              <div className="text-[10px] font-mono text-stone-400 uppercase">Service Motto</div>
              <div className="text-xs font-semibold text-stone-200 italic mt-0.5">"{force.motto}"</div>
              <div className="text-[11px] text-[#c5a059] font-display mt-0.5">{force.nativeMotto}</div>
            </div>
          </div>
        </div>

        {/* Quick Facts Strip */}
        <div className="p-4 bg-[#0c1410] border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-[10px] font-mono text-stone-500 uppercase">Established</div>
            <div className="font-semibold text-stone-200 mt-0.5">{force.established}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-stone-500 uppercase">Command Appointment</div>
            <div className="font-semibold text-[#c5a059] mt-0.5 truncate">{force.commanderTitle}</div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-[10px] font-mono text-stone-500 uppercase">Headquarters</div>
            <div className="font-semibold text-stone-200 mt-0.5 truncate">{force.headquarters}</div>
          </div>
        </div>
      </div>

      {/* Force Detailed Overview & Historical Foundation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#090f0c] border border-stone-800 space-y-4">
          <h2 className="text-lg font-bold text-stone-100 font-display">Mission & Operational Scope</h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{force.overview}</p>
          <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 text-xs text-stone-300">
            <span className="font-semibold text-[#c5a059]">Core Mandate: </span>
            <span>{force.role}</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#090f0c] border border-stone-800 space-y-4">
          <h2 className="text-lg font-bold text-stone-100 font-display">1971 Liberation War Heritage</h2>
          <p className="text-xs text-stone-400 leading-relaxed">{force.historicalFoundation}</p>
          <div className="text-xs text-stone-500 font-mono border-t border-stone-800 pt-3">
            Public Estimate: {force.personnelEstimate}
          </div>
        </div>
      </div>

      {/* Deep-Dive Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-800 overflow-x-auto pb-2 text-xs scrollbar-none">
          {[
            { id: 'ranks', label: `Ranks (${forceRanks.length})`, icon: Award },
            { id: 'equipment', label: `Equipment (${forceEquipment.length})`, icon: Shield },
            { id: 'uniforms', label: `Uniforms (${forceUniforms.length})`, icon: Shirt },
            { id: 'roles', label: `Posts & Roles (${forcePosts.length})`, icon: Users },
            { id: 'badges', label: `Badges & Medals (${forceBadges.length})`, icon: Award },
            { id: 'bases', label: `Key Bases (${force.keyBases.length})`, icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Ranks */}
        {activeTab === 'ranks' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {forceRanks.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedRank(r)}
                className="group p-4 rounded-xl bg-[#090f0c] hover:bg-stone-900 border border-stone-800 hover:border-stone-700 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <InsigniaView rank={r} size="md" />
                  <div>
                    <div className="text-sm font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors">
                      {r.name}
                    </div>
                    <div className="text-xs text-[#c5a059] font-display">{r.nativeName}</div>
                    <div className="text-[11px] text-stone-400 font-mono mt-1">{r.careerLevel}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-[#c5a059] group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Equipment */}
        {activeTab === 'equipment' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {forceEquipment.map((eq) => (
              <div
                key={eq.id}
                onClick={() => setSelectedEquipment(eq)}
                className="group rounded-xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 overflow-hidden cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="h-44 overflow-hidden bg-black/60">
                  <img
                    src={eq.image}
                    alt={eq.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400 uppercase">{eq.category}</div>
                    <h3 className="text-base font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors">
                      {eq.name}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                      {eq.generalPurpose}
                    </p>
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono pt-2 border-t border-stone-800">
                    {eq.manufacturerOrigin}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Uniforms */}
        {activeTab === 'uniforms' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {forceUniforms.map((uni) => (
              <div
                key={uni.id}
                onClick={() => setSelectedUniform(uni)}
                className="group rounded-xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 overflow-hidden cursor-pointer transition-all"
              >
                <div className="h-48 overflow-hidden bg-black/60">
                  <img
                    src={uni.image}
                    alt={uni.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase">{uni.category}</div>
                  <h3 className="text-sm font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors">
                    {uni.name}
                  </h3>
                  <div className="flex gap-1.5 pt-1">
                    {uni.colorHexes.slice(0, 3).map((hex, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-stone-700"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Roles */}
        {activeTab === 'roles' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {forcePosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="p-5 rounded-xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 cursor-pointer transition-all space-y-3"
              >
                <div>
                  <div className="text-[10px] font-mono text-stone-400 uppercase">{post.department}</div>
                  <h3 className="text-base font-bold text-stone-100 hover:text-[#c5a059] transition-colors">
                    {post.title}
                  </h3>
                  <div className="text-xs text-[#c5a059] font-mono mt-0.5">
                    Eligibility: {post.rankEligibility}
                  </div>
                </div>
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Badges */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {forceBadges.map((badge) => (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className="p-4 rounded-xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 cursor-pointer transition-all flex items-center gap-3.5"
              >
                <InsigniaView badge={badge} size="md" />
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase">{badge.category}</div>
                  <h3 className="text-sm font-bold text-stone-100">{badge.name}</h3>
                  <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">{badge.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: Bases */}
        {activeTab === 'bases' && (
          <div className="p-6 rounded-2xl bg-[#090f0c] border border-stone-800 space-y-4">
            <h3 className="text-lg font-bold text-stone-100 font-display">Major Garrisons, Bases & Cantonments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {force.keyBases.map((base, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 text-xs text-stone-200 flex items-center gap-2.5"
                >
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium">{base}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
