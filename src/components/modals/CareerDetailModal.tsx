import React from 'react';
import { useShowcase } from '../../context/ShowcaseContext';
import { X, Bookmark, ExternalLink, GraduationCap, Activity, Award, CheckCircle2, AlertCircle, SlidersHorizontal } from 'lucide-react';

export const CareerDetailModal: React.FC = () => {
  const {
    selectedCareer,
    setSelectedCareer,
    toggleFavorite,
    isFavorite,
    addToCompare,
    isComparing,
  } = useShowcase();

  if (!selectedCareer) return null;

  const favorited = isFavorite(selectedCareer.id);
  const comparing = isComparing(selectedCareer.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0a120e] border border-stone-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-stone-800 bg-[#0d1712]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>{selectedCareer.force}</span>
              <span className="text-stone-500">·</span>
              <span className="text-stone-300">{selectedCareer.category}</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-100 font-display mt-0.5">{selectedCareer.title}</h3>
            <div className="text-xs text-[#c5a059] font-mono mt-1">{selectedCareer.entryRoute}</div>
          </div>

          <button
            onClick={() => setSelectedCareer(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Realistic Training Facility Image */}
          {selectedCareer.image && (
            <div className="rounded-xl overflow-hidden bg-black/60 border border-stone-800 aspect-video flex items-center justify-center">
              <img
                src={selectedCareer.image}
                alt={selectedCareer.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 mb-1.5">Pathway Overview</h4>
            <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/40 p-3.5 rounded-xl border border-stone-800">
              {selectedCareer.overview}
            </p>
          </div>

          {/* Educational Requirements */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Publicly Documented Educational Criteria</span>
            </h4>
            <div className="space-y-1.5">
              {selectedCareer.eligibilityEducation.map((edu, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{edu}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Standards */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-[#c5a059] mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>General Physical Fitness & Medical Standards</span>
            </h4>
            <div className="space-y-1.5">
              {selectedCareer.physicalStandards.map((std, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>{std}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selection Milestones */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-stone-400 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Multi-Stage Selection Milestones (ISSB & Medical)</span>
            </h4>
            <div className="space-y-2">
              {selectedCareer.selectionSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-xs text-stone-300"
                >
                  <span className="font-mono text-[11px] font-bold text-emerald-400 w-5">
                    0{idx + 1}.
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Training Academy & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-stone-900/40 border border-stone-800 text-xs">
            <div>
              <div className="text-[10px] font-mono uppercase text-stone-500">Training Academy</div>
              <div className="font-medium text-stone-200 mt-0.5">{selectedCareer.trainingAcademy}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-stone-500">Duration</div>
              <div className="font-medium text-[#c5a059] mt-0.5">{selectedCareer.trainingDuration}</div>
            </div>
          </div>

          {/* Official Recruitment Disclaimer */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-amber-300">Official Disclaimer: </span>
              Requirements and application dates are subject to periodic defense gazette updates. Always verify live recruitment circulars through official recruitment portals.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-stone-800 bg-[#0d1712]">
          <button
            onClick={() => toggleFavorite(selectedCareer.id, 'career', selectedCareer)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              favorited
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${favorited ? 'fill-emerald-400' : ''}`} />
            <span>{favorited ? 'Saved in Favorites' : 'Save Pathway'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToCompare(selectedCareer, 'career')}
              disabled={comparing}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                comparing
                  ? 'bg-stone-800 text-stone-500 border-stone-700 cursor-not-allowed'
                  : 'bg-stone-900 text-stone-200 border-stone-700 hover:bg-stone-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{comparing ? 'In Comparison' : 'Compare'}</span>
            </button>

            <a
              href={selectedCareer.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs bg-[#c5a059] text-stone-950 font-semibold hover:bg-[#d4af37] transition-colors"
            >
              <span>Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
