import React from 'react';
import { useShowcase } from '../../context/ShowcaseContext';
import { X, Bookmark, SlidersHorizontal, Shield, Wrench, CheckCircle2, Factory } from 'lucide-react';

export const EquipmentDetailModal: React.FC = () => {
  const {
    selectedEquipment,
    setSelectedEquipment,
    toggleFavorite,
    isFavorite,
    addToCompare,
    isComparing,
  } = useShowcase();

  if (!selectedEquipment) return null;

  const favorited = isFavorite(selectedEquipment.id);
  const comparing = isComparing(selectedEquipment.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0a120e] border border-stone-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-stone-800 bg-[#0d1712]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>{selectedEquipment.force}</span>
              <span className="text-stone-500">·</span>
              <span className="text-stone-300">{selectedEquipment.category}</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-100 font-display mt-0.5">{selectedEquipment.name}</h3>
          </div>

          <button
            onClick={() => setSelectedEquipment(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Image & Quick Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-5 rounded-xl overflow-hidden border border-stone-800 bg-black/50 aspect-video md:aspect-square flex items-center justify-center">
              <img
                src={selectedEquipment.image}
                alt={selectedEquipment.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-3">
              <div>
                <div className="text-xs font-mono uppercase text-stone-400 mb-1">General Role & Mission</div>
                <p className="text-xs text-stone-200 leading-relaxed bg-stone-900/40 p-3 rounded-xl border border-stone-800">
                  {selectedEquipment.generalPurpose}
                </p>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-xs">
                <Factory className="w-4 h-4 text-[#c5a059] shrink-0" />
                <div>
                  <span className="text-stone-400">Origin / Facility: </span>
                  <span className="text-stone-200 font-medium">{selectedEquipment.manufacturerOrigin}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-emerald-200">
                  <span className="font-semibold">Service Status: </span>
                  <span>{selectedEquipment.publicVerificationStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 mb-1.5 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Technical Profile</span>
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/30 p-3.5 rounded-xl border border-stone-800">
              {selectedEquipment.description}
            </p>
          </div>

          {/* Specifications Table */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-[#c5a059] mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>Publicly Documented Specifications</span>
            </h4>
            <div className="rounded-xl border border-stone-800 overflow-hidden divide-y divide-stone-800/80 bg-stone-900/40">
              {Object.entries(selectedEquipment.specifications).map(([key, val], idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 text-xs gap-1">
                  <span className="font-mono text-stone-400">{key}</span>
                  <span className="font-medium text-stone-200 text-left sm:text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Public Source Citation */}
          <div className="text-[11px] text-stone-500 font-mono border-t border-stone-800 pt-3">
            Source: {selectedEquipment.source}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-stone-800 bg-[#0d1712]">
          <button
            onClick={() => toggleFavorite(selectedEquipment.id, 'equipment', selectedEquipment)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              favorited
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${favorited ? 'fill-emerald-400' : ''}`} />
            <span>{favorited ? 'Saved in Favorites' : 'Save Equipment'}</span>
          </button>

          <button
            onClick={() => addToCompare(selectedEquipment, 'equipment')}
            disabled={comparing}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              comparing
                ? 'bg-stone-800 text-stone-500 border-stone-700 cursor-not-allowed'
                : 'bg-[#c5a059] text-stone-950 font-semibold border-[#c5a059] hover:bg-[#d4af37]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{comparing ? 'In Comparison' : 'Compare Equipment'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
