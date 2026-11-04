import React, { useState } from 'react';
import { useShowcase } from '../../context/ShowcaseContext';
import { X, Bookmark, ZoomIn, ZoomOut, Maximize2, Minimize2, Check, Shield, Layers } from 'lucide-react';

export const UniformViewerModal: React.FC = () => {
  const {
    selectedUniform,
    setSelectedUniform,
    toggleFavorite,
    isFavorite,
    addToCompare,
    isComparing,
  } = useShowcase();

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!selectedUniform) return null;

  const favorited = isFavorite(selectedUniform.id);
  const comparing = isComparing(selectedUniform.id);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.3, 1));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative w-full bg-[#0a120e] border border-stone-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isFullscreen ? 'fixed inset-2 max-w-none max-h-none h-[98vh]' : 'max-w-4xl max-h-[90vh]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-[#0d1712]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>{selectedUniform.force}</span>
              <span className="text-stone-500">·</span>
              <span className="text-stone-300">{selectedUniform.category}</span>
            </div>
            <h3 className="text-xl font-bold text-stone-100 font-display">{selectedUniform.name}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => {
                setSelectedUniform(null);
                setZoomLevel(1);
                setIsFullscreen(false);
              }}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Split Screen (Viewer + Specifications) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left: Image Viewer with Interactive Zoom Controls */}
          <div className="lg:col-span-7 relative bg-black/60 flex flex-col items-center justify-center p-4 min-h-[320px] lg:min-h-[460px] overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-800">
            <div className="overflow-hidden w-full h-full flex items-center justify-center rounded-xl bg-[#060a08]">
              <img
                src={selectedUniform.image}
                alt={selectedUniform.name}
                referrerPolicy="no-referrer"
                style={{ transform: `scale(${zoomLevel})` }}
                className="max-h-[420px] w-auto object-contain transition-transform duration-200 select-none"
              />
            </div>

            {/* Floating Zoom Bar */}
            <div className="absolute bottom-6 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/90 border border-stone-700/80 shadow-lg text-xs text-stone-200">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-1 hover:text-emerald-400 disabled:opacity-40"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] px-1 text-stone-300">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="p-1 hover:text-emerald-400 disabled:opacity-40"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              {zoomLevel !== 1 && (
                <button
                  onClick={handleResetZoom}
                  className="ml-1 text-[10px] text-[#c5a059] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Right: Detailed Specification & Color Swatches */}
          <div className="lg:col-span-5 p-5 space-y-5 overflow-y-auto bg-[#0a120e]">
            {/* Color Swatch Inspection */}
            <div>
              <div className="text-xs font-mono uppercase text-stone-400 mb-2">Uniform Color Palette</div>
              <div className="flex flex-wrap gap-2">
                {selectedUniform.colors.map((colorName, idx) => {
                  const hex = selectedUniform.colorHexes[idx] || '#222';
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-1.5 pr-3 rounded-lg bg-stone-900/80 border border-stone-800 text-xs"
                    >
                      <span
                        className="w-4 h-4 rounded-md border border-stone-700 shadow-sm"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-stone-300">{colorName}</span>
                      <span className="text-[10px] font-mono text-stone-500">{hex}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Purpose */}
            <div>
              <div className="text-xs font-mono uppercase text-emerald-400 mb-1">Operational Purpose</div>
              <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/40 p-3 rounded-xl border border-stone-800">
                {selectedUniform.purpose}
              </p>
            </div>

            {/* Wear Occasions */}
            <div>
              <div className="text-xs font-mono uppercase text-[#c5a059] mb-1.5">Prescribed Wear Occasions</div>
              <ul className="space-y-1.5">
                {selectedUniform.wearOccasions.map((occ, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{occ}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Associated Ranks & Accessories */}
            <div className="space-y-2 border-t border-stone-800 pt-3">
              <div className="text-xs font-mono uppercase text-stone-400">Associated Ranks</div>
              <div className="text-xs text-stone-300">{selectedUniform.associatedRanks}</div>

              <div className="text-xs font-mono uppercase text-stone-400 pt-2">Authorized Insignia & Items</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedUniform.insigniaAndAccessories.map((acc, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300"
                  >
                    {acc}
                  </span>
                ))}
              </div>
            </div>

            {/* Source */}
            <div className="text-[11px] text-stone-500 font-mono border-t border-stone-800 pt-3">
              Source: {selectedUniform.source}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-stone-800 bg-[#0d1712]">
          <button
            onClick={() => toggleFavorite(selectedUniform.id, 'uniform', selectedUniform)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              favorited
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${favorited ? 'fill-emerald-400' : ''}`} />
            <span>{favorited ? 'Saved in Favorites' : 'Save Uniform'}</span>
          </button>

          <button
            onClick={() => addToCompare(selectedUniform, 'uniform')}
            disabled={comparing}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              comparing
                ? 'bg-stone-800 text-stone-500 border-stone-700 cursor-not-allowed'
                : 'bg-[#c5a059] text-stone-950 font-semibold border-[#c5a059] hover:bg-[#d4af37]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{comparing ? 'In Comparison' : 'Compare Uniform'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
