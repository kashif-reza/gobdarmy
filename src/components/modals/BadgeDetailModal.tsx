import React from 'react';
import { useShowcase } from '../../context/ShowcaseContext';
import { InsigniaView } from '../InsigniaView';
import { X, Bookmark, Award, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export const BadgeDetailModal: React.FC = () => {
  const {
    selectedBadge,
    setSelectedBadge,
    toggleFavorite,
    isFavorite,
    posts,
    setSelectedPost,
  } = useShowcase();

  if (!selectedBadge) return null;

  const favorited = isFavorite(selectedBadge.id);
  const relatedPostItem = posts.find((p) => p.id === selectedBadge.relatedRole);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0a120e] border border-stone-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-stone-800 bg-[#0d1712]">
          <div className="flex items-center gap-4">
            <InsigniaView badge={selectedBadge} size="lg" />
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span>{selectedBadge.force}</span>
                <span className="text-stone-500">·</span>
                <span className="text-stone-300">{selectedBadge.category}</span>
              </div>
              <h3 className="text-xl font-bold text-stone-100 font-display">{selectedBadge.name}</h3>
              {selectedBadge.nativeName && (
                <div className="text-sm text-[#c5a059] font-medium font-display">{selectedBadge.nativeName}</div>
              )}
            </div>
          </div>

          <button
            onClick={() => setSelectedBadge(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Meaning / Symbolism */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Symbolism & Significance</span>
            </h4>
            <p className="text-sm text-stone-300 leading-relaxed bg-stone-900/40 p-3.5 rounded-xl border border-stone-800">
              {selectedBadge.meaning}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-[#c5a059] mb-1.5 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Eligibility & Qualification Standards</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-stone-900/40 border border-stone-800 text-xs text-stone-300 leading-relaxed">
              {selectedBadge.eligibility}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-stone-400 mb-1.5">
              Design & Metalwork
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {selectedBadge.description}
            </p>
          </div>

          {/* Link to related role */}
          {relatedPostItem && (
            <div className="border-t border-stone-800 pt-3">
              <div className="text-xs text-stone-400 mb-1 font-mono uppercase">Associated Operational Post</div>
              <button
                onClick={() => {
                  setSelectedBadge(null);
                  setSelectedPost(relatedPostItem);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-xs text-emerald-300 border border-stone-700 transition-colors"
              >
                <span>View Role: {relatedPostItem.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          )}

          {/* Source */}
          <div className="text-[11px] text-stone-500 font-mono border-t border-stone-800/80 pt-3">
            Source: {selectedBadge.source}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-stone-800 bg-[#0d1712]">
          <button
            onClick={() => toggleFavorite(selectedBadge.id, 'badge', selectedBadge)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              favorited
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${favorited ? 'fill-emerald-400' : ''}`} />
            <span>{favorited ? 'Saved in Favorites' : 'Save Badge'}</span>
          </button>

          <button
            onClick={() => setSelectedBadge(null)}
            className="px-4 py-2 rounded-xl text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
