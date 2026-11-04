import React from 'react';
import { useShowcase } from '../../context/ShowcaseContext';
import { InsigniaView } from '../InsigniaView';
import { X, Bookmark, SlidersHorizontal, ArrowRight, Shield, Award, CheckCircle } from 'lucide-react';

export const RankDetailModal: React.FC = () => {
  const {
    selectedRank,
    setSelectedRank,
    toggleFavorite,
    isFavorite,
    addToCompare,
    isComparing,
    ranks,
  } = useShowcase();

  if (!selectedRank) return null;

  const favorited = isFavorite(selectedRank.id);
  const comparing = isComparing(selectedRank.id);

  // Find equivalent rank items for 1-click navigation
  const equivalentArmyItem = ranks.find((r) => r.force === 'Bangladesh Army' && r.name === selectedRank.equivalentArmy);
  const equivalentNavyItem = ranks.find((r) => r.force === 'Bangladesh Navy' && r.name === selectedRank.equivalentNavy);
  const equivalentAirForceItem = ranks.find((r) => r.force === 'Bangladesh Air Force' && r.name === selectedRank.equivalentAirForce);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0a120e] border border-stone-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b border-stone-800 bg-[#0d1712]">
          <div className="flex items-center gap-4">
            <InsigniaView rank={selectedRank} size="lg" />
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
                <span className="text-emerald-400 font-semibold">{selectedRank.force}</span>
                <span>·</span>
                <span>Tier {selectedRank.hierarchyLevel}</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-100 font-display">{selectedRank.name}</h3>
              <div className="text-sm text-[#c5a059] font-medium font-display">{selectedRank.nativeName}</div>
            </div>
          </div>

          <button
            onClick={() => setSelectedRank(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800">
              <div className="text-[11px] font-mono text-stone-400 uppercase">Category</div>
              <div className="text-sm font-semibold text-stone-200 mt-0.5">{selectedRank.category}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800">
              <div className="text-[11px] font-mono text-stone-400 uppercase">Command Level</div>
              <div className="text-sm font-semibold text-[#c5a059] mt-0.5">{selectedRank.careerLevel}</div>
            </div>
          </div>

          {/* Insignia Details */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Official Insignia Description</span>
            </h4>
            <p className="text-sm text-stone-300 bg-stone-900/40 p-3 rounded-xl border border-stone-800/80 leading-relaxed">
              {selectedRank.insigniaDescription}
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 mb-2 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>General Publicly Documented Responsibilities</span>
            </h4>
            <ul className="space-y-2">
              {selectedRank.generalResponsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Three-Service Rank Equivalencies */}
          <div className="p-4 rounded-xl bg-[#08100c] border border-stone-800 space-y-3">
            <div className="text-xs font-mono uppercase text-[#c5a059] tracking-wider">
              Three-Service Rank Equivalencies
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div
                onClick={() => equivalentArmyItem && setSelectedRank(equivalentArmyItem)}
                className={`p-2.5 rounded-lg border transition-all ${
                  selectedRank.force === 'Bangladesh Army'
                    ? 'bg-emerald-950/60 border-emerald-600 font-bold text-emerald-300'
                    : 'bg-stone-900/40 border-stone-800 text-stone-300 hover:border-stone-700 cursor-pointer'
                }`}
              >
                <div className="text-[10px] text-stone-400 uppercase font-mono">Army</div>
                <div className="mt-1 truncate">{selectedRank.equivalentArmy}</div>
              </div>
              <div
                onClick={() => equivalentNavyItem && setSelectedRank(equivalentNavyItem)}
                className={`p-2.5 rounded-lg border transition-all ${
                  selectedRank.force === 'Bangladesh Navy'
                    ? 'bg-sky-950/60 border-sky-600 font-bold text-sky-300'
                    : 'bg-stone-900/40 border-stone-800 text-stone-300 hover:border-stone-700 cursor-pointer'
                }`}
              >
                <div className="text-[10px] text-stone-400 uppercase font-mono">Navy</div>
                <div className="mt-1 truncate">{selectedRank.equivalentNavy}</div>
              </div>
              <div
                onClick={() => equivalentAirForceItem && setSelectedRank(equivalentAirForceItem)}
                className={`p-2.5 rounded-lg border transition-all ${
                  selectedRank.force === 'Bangladesh Air Force'
                    ? 'bg-indigo-950/60 border-indigo-600 font-bold text-indigo-300'
                    : 'bg-stone-900/40 border-stone-800 text-stone-300 hover:border-stone-700 cursor-pointer'
                }`}
              >
                <div className="text-[10px] text-stone-400 uppercase font-mono">Air Force</div>
                <div className="mt-1 truncate">{selectedRank.equivalentAirForce}</div>
              </div>
            </div>
          </div>

          {/* Public Source Citation */}
          <div className="text-[11px] text-stone-500 font-mono border-t border-stone-800/80 pt-3">
            Source: {selectedRank.source}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-stone-800 bg-[#0d1712]">
          <button
            onClick={() => toggleFavorite(selectedRank.id, 'rank', selectedRank)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              favorited
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${favorited ? 'fill-emerald-400' : ''}`} />
            <span>{favorited ? 'Saved in Favorites' : 'Add to Favorites'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToCompare(selectedRank, 'rank')}
              disabled={comparing}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                comparing
                  ? 'bg-stone-800 text-stone-500 border-stone-700 cursor-not-allowed'
                  : 'bg-[#c5a059] text-stone-950 font-semibold border-[#c5a059] hover:bg-[#d4af37]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{comparing ? 'In Comparison' : 'Compare Rank'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
