import React from 'react';
import { useShowcase } from '../../context/ShowcaseContext';
import { X, Bookmark, Briefcase, CheckCircle2, Shield, Wrench, ArrowRight } from 'lucide-react';

export const PostDetailModal: React.FC = () => {
  const {
    selectedPost,
    setSelectedPost,
    toggleFavorite,
    isFavorite,
    equipment,
    setSelectedEquipment,
    uniforms,
    setSelectedUniform,
  } = useShowcase();

  if (!selectedPost) return null;

  const favorited = isFavorite(selectedPost.id);

  // Related equipment objects
  const relatedEquipItems = equipment.filter((eq) => selectedPost.relatedEquipment.includes(eq.id));
  const relatedUniformItem = uniforms.find((u) => u.id === selectedPost.relatedUniform);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0a120e] border border-stone-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-stone-800 bg-[#0d1712]">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
              <span className="text-emerald-400 font-semibold">{selectedPost.force}</span>
              <span>·</span>
              <span>{selectedPost.department}</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-100 font-display mt-0.5">{selectedPost.title}</h3>
            <div className="text-xs text-[#c5a059] mt-1 font-mono">
              Eligibility: {selectedPost.rankEligibility}
            </div>
          </div>

          <button
            onClick={() => setSelectedPost(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Role Profile & Mission Scope</span>
            </h4>
            <p className="text-sm text-stone-300 leading-relaxed bg-stone-900/40 p-3.5 rounded-xl border border-stone-800">
              {selectedPost.description}
            </p>
          </div>

          {/* Key Duties */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 mb-2 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Key Operational Duties</span>
            </h4>
            <div className="space-y-2">
              {selectedPost.keyDuties.map((duty, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{duty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>Required Professional Competencies</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedPost.requiredSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-xs text-stone-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Gear & Uniform */}
          <div className="border-t border-stone-800 pt-4 space-y-3">
            <div className="text-xs font-mono uppercase text-stone-400">Related Equipment & Dress</div>
            <div className="flex flex-wrap gap-2">
              {relatedUniformItem && (
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    setSelectedUniform(relatedUniformItem);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-200 transition-colors"
                >
                  <span>Uniform: {relatedUniformItem.name}</span>
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                </button>
              )}
              {relatedEquipItems.map((eq) => (
                <button
                  key={eq.id}
                  onClick={() => {
                    setSelectedPost(null);
                    setSelectedEquipment(eq);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-200 transition-colors"
                >
                  <span>Gear: {eq.name}</span>
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Source */}
          <div className="text-[11px] text-stone-500 font-mono border-t border-stone-800/80 pt-3">
            Source: {selectedPost.source}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-stone-800 bg-[#0d1712]">
          <button
            onClick={() => toggleFavorite(selectedPost.id, 'post', selectedPost)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              favorited
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${favorited ? 'fill-emerald-400' : ''}`} />
            <span>{favorited ? 'Saved in Favorites' : 'Save Role'}</span>
          </button>

          <button
            onClick={() => setSelectedPost(null)}
            className="px-4 py-2 rounded-xl text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
