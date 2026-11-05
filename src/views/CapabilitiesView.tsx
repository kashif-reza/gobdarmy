import React from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import {
  Globe2,
  Anchor,
  Plane,
  HeartHandshake,
  HardHat,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const CapabilitiesView: React.FC = () => {
  const { capabilities } = useShowcase();

  const getDomainIcon = (domain: string) => {
    if (domain.includes('Peace')) return Globe2;
    if (domain.includes('Blue Water')) return Anchor;
    if (domain.includes('Air Defense')) return Plane;
    if (domain.includes('Crisis')) return HeartHandshake;
    if (domain.includes('Construction')) return HardHat;
    return ShieldAlert;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5">
        <div className="text-xs font-mono uppercase text-[#c5a059] tracking-widest">
          Verified Strategic Readiness & National Pillars
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-display mt-1">
          Power & Capability Showcase
        </h1>
        <p className="text-sm text-stone-400 mt-2 max-w-2xl leading-relaxed">
          High-level, verified capabilities of the Bangladesh Armed Forces across global peacekeeping leadership, maritime sovereignty, integrated air defense, strategic engineering, and disaster response.
        </p>
      </div>

      {/* Hero Infographic Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-[#090f0c] border border-stone-800">
        <div className="space-y-2 border-b md:border-b-0 md:border-r border-stone-800/80 pb-4 md:pb-0 md:pr-6">
          <div className="text-xs font-mono text-emerald-400 uppercase">Global Reputation</div>
          <div className="text-3xl font-extrabold text-stone-100 font-display">Blue Helmet Vanguard</div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Consistently leading the United Nations Department of Peace Operations with disciplined mechanized infantry, combat engineers, riverine units, and field hospitals.
          </p>
        </div>

        <div className="space-y-2 border-b md:border-b-0 md:border-r border-stone-800/80 pb-4 md:pb-0 md:pr-6">
          <div className="text-xs font-mono text-[#c5a059] uppercase">Maritime Reach</div>
          <div className="text-3xl font-extrabold text-stone-100 font-display">Three-Dimensional Fleet</div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Surface frigates, corvettes, naval aviation, and conventional attack submarines protecting the Bay of Bengal coastline and 118,813 km² Exclusive Economic Zone.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-sky-400 uppercase">National Resilience</div>
          <div className="text-3xl font-extrabold text-stone-100 font-display">First Responders</div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Proven rapid mobilization in less than 48 hours to restore road links, deploy amphibious rescue, and provide field medical care during cyclones and riverine flash floods.
          </p>
        </div>
      </div>

      {/* Capability Cards */}
      <div className="space-y-6">
        {capabilities.map((cap) => {
          const Icon = getDomainIcon(cap.domain);
          return (
            <div
              key={cap.id}
              className="rounded-2xl bg-[#090f0c] border border-stone-800 p-6 sm:p-8 space-y-6 shadow-xl"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-800/80 pb-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/60 text-[#c5a059]">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#c5a059] uppercase">{cap.force} · {cap.domain}</div>
                    <h3 className="text-2xl font-bold text-stone-100 font-display mt-0.5">{cap.title}</h3>
                  </div>
                </div>

                {/* Verified Factual Statistic Badge */}
                <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-700/80 sm:text-right shrink-0">
                  <div className="text-2xl font-bold font-mono text-[#c5a059] tabular-nums">
                    {cap.verifiedStatistic.value}
                  </div>
                  <div className="text-[11px] text-stone-300 font-medium max-w-[240px]">
                    {cap.verifiedStatistic.label}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                    Source: {cap.verifiedStatistic.source}
                  </div>
                </div>
              </div>

              {/* Media Preview & Description */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {cap.image && (
                  <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-black/60 border border-stone-800 aspect-video flex items-center justify-center">
                    <img
                      src={cap.image}
                      alt={cap.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={cap.image ? 'lg:col-span-7 space-y-3' : 'lg:col-span-12'}>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>

              {/* Highlights & Assets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Key Assets */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-stone-400">Deployed Capabilities & Assets</div>
                  <div className="flex flex-wrap gap-2">
                    {cap.keyAssets.map((asset, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300"
                      >
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Operational Records */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-emerald-400">Operational Records & Highlights</div>
                  <div className="space-y-1.5">
                    {cap.operationalHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Source Footer */}
              <div className="text-[11px] text-stone-500 font-mono pt-3 border-t border-stone-800/60">
                Verified Document Source: {cap.source}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
