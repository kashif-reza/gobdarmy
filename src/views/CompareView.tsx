import React from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { InsigniaView } from '../components/InsigniaView';
import { SlidersHorizontal, Trash2, ArrowRight, X, Shield, Award, Shirt, Plane, Compass } from 'lucide-react';

export const CompareView: React.FC = () => {
  const { compareItems, removeFromCompare, clearCompare, setActiveView } = useShowcase();

  const item1 = compareItems[0];
  const item2 = compareItems[1];

  const compareType = item1 ? item1.type : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="text-xs font-mono uppercase text-[#c5a059] tracking-widest">
            Tactical Analysis Matrix
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-display mt-1">
            Side-by-Side Comparison Workbench
          </h1>
          <p className="text-sm text-stone-400 mt-1 max-w-2xl">
            Compare two defense assets, military ranks, uniform specifications, or career pipelines with structured side-by-side attribute diffing.
          </p>
        </div>

        {compareItems.length > 0 && (
          <button
            onClick={clearCompare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-rose-400 hover:text-rose-300 transition-colors w-fit"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Comparison ({compareItems.length})</span>
          </button>
        )}
      </div>

      {/* Comparison Slot Status */}
      {compareItems.length === 0 ? (
        <div className="py-20 text-center text-stone-500 bg-[#090f0c] border border-stone-800 rounded-2xl p-8 space-y-4">
          <SlidersHorizontal className="w-12 h-12 mx-auto text-stone-600 opacity-60" />
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-lg font-bold text-stone-200">Comparison Workbench is Empty</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Navigate to any section and click the <strong className="text-stone-300">"Compare"</strong> button on any two items to evaluate them side-by-side.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveView('ranks')}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-200"
            >
              Go to Ranks
            </button>
            <button
              onClick={() => setActiveView('equipment')}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-200"
            >
              Go to Equipment
            </button>
            <button
              onClick={() => setActiveView('uniforms')}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-200"
            >
              Go to Uniforms
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Slot Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slot 1 */}
            <div className="p-5 rounded-2xl bg-[#090f0c] border border-stone-800 relative">
              <button
                onClick={() => removeFromCompare(item1.id)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white"
                title="Remove Item"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                Slot 01 · {item1.type}
              </div>
              <h3 className="text-xl font-bold text-stone-100 font-display mt-0.5">
                {item1.data.name || item1.data.title}
              </h3>
              <div className="text-xs text-stone-400 mt-0.5">{item1.data.force}</div>
            </div>

            {/* Slot 2 */}
            {item2 ? (
              <div className="p-5 rounded-2xl bg-[#090f0c] border border-stone-800 relative">
                <button
                  onClick={() => removeFromCompare(item2.id)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white"
                  title="Remove Item"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  Slot 02 · {item2.type}
                </div>
                <h3 className="text-xl font-bold text-stone-100 font-display mt-0.5">
                  {item2.data.name || item2.data.title}
                </h3>
                <div className="text-xs text-stone-400 mt-0.5">{item2.data.force}</div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#090f0c]/50 border border-dashed border-stone-800 flex flex-col items-center justify-center text-center space-y-2">
                <div className="text-xs font-mono text-stone-500 uppercase">Slot 02 (Awaiting Selection)</div>
                <p className="text-xs text-stone-400 max-w-xs">
                  Select a second <span className="text-[#c5a059] font-medium">{compareType}</span> from the catalog to populate comparison table.
                </p>
                <button
                  onClick={() => {
                    if (compareType === 'rank') setActiveView('ranks');
                    else if (compareType === 'equipment') setActiveView('equipment');
                    else if (compareType === 'uniform') setActiveView('uniforms');
                    else if (compareType === 'career') setActiveView('careers');
                  }}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-300"
                >
                  Browse {compareType}s
                </button>
              </div>
            )}
          </div>

          {/* Detailed Side-by-Side Table */}
          {item1 && item2 && (
            <div className="rounded-2xl bg-[#090f0c] border border-stone-800 overflow-hidden shadow-2xl">
              <div className="p-4 bg-[#0d1611] border-b border-stone-800 text-xs font-mono uppercase tracking-wider text-[#c5a059]">
                Side-by-Side Matrix ({compareType?.toUpperCase()})
              </div>

              {/* RANK COMPARISON */}
              {compareType === 'rank' && (
                <div className="divide-y divide-stone-800/80 text-xs">
                  {/* Insignia Row */}
                  <div className="grid grid-cols-2 p-4 gap-6 bg-black/40">
                    <div className="flex justify-center">
                      <InsigniaView rank={item1.data} size="lg" />
                    </div>
                    <div className="flex justify-center">
                      <InsigniaView rank={item2.data} size="lg" />
                    </div>
                  </div>

                  {/* Hierarchy Tier */}
                  <div className="grid grid-cols-2 p-4 gap-6">
                    <div>
                      <span className="text-stone-500 font-mono block">Hierarchy Level:</span>
                      <span className="text-base font-bold text-stone-100 font-mono">
                        Tier {item1.data.hierarchyLevel}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 font-mono block">Hierarchy Level:</span>
                      <span className="text-base font-bold text-stone-100 font-mono">
                        Tier {item2.data.hierarchyLevel}
                      </span>
                    </div>
                  </div>

                  {/* Force */}
                  <div className="grid grid-cols-2 p-4 gap-6">
                    <div>
                      <span className="text-stone-500 font-mono block">Branch of Service:</span>
                      <span className="text-stone-200 font-semibold">{item1.data.force}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 font-mono block">Branch of Service:</span>
                      <span className="text-stone-200 font-semibold">{item2.data.force}</span>
                    </div>
                  </div>

                  {/* Category & Command Level */}
                  <div className="grid grid-cols-2 p-4 gap-6">
                    <div>
                      <span className="text-stone-500 font-mono block">Category & Level:</span>
                      <span className="text-stone-200">{item1.data.category} ({item1.data.careerLevel})</span>
                    </div>
                    <div>
                      <span className="text-stone-500 font-mono block">Category & Level:</span>
                      <span className="text-stone-200">{item2.data.category} ({item2.data.careerLevel})</span>
                    </div>
                  </div>

                  {/* Primary Duties */}
                  <div className="grid grid-cols-2 p-4 gap-6">
                    <div>
                      <span className="text-stone-500 font-mono block mb-1">Key Responsibilities:</span>
                      <ul className="space-y-1 text-stone-300">
                        {item1.data.generalResponsibilities.map((r: string, i: number) => (
                          <li key={i}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-stone-500 font-mono block mb-1">Key Responsibilities:</span>
                      <ul className="space-y-1 text-stone-300">
                        {item2.data.generalResponsibilities.map((r: string, i: number) => (
                          <li key={i}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* EQUIPMENT COMPARISON */}
              {compareType === 'equipment' && (
                <div className="divide-y divide-stone-800/80 text-xs">
                  {/* Images */}
                  <div className="grid grid-cols-2 p-4 gap-6 bg-black/40">
                    <div className="h-44 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                      <img
                        src={item1.data.image}
                        alt={item1.data.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-44 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                      <img
                        src={item2.data.image}
                        alt={item2.data.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Category & Role */}
                  <div className="grid grid-cols-2 p-4 gap-6">
                    <div>
                      <span className="text-stone-500 font-mono block">Category & Role:</span>
                      <span className="text-stone-200 font-semibold">{item1.data.category}</span>
                      <p className="text-stone-400 mt-1">{item1.data.generalPurpose}</p>
                    </div>
                    <div>
                      <span className="text-stone-500 font-mono block">Category & Role:</span>
                      <span className="text-stone-200 font-semibold">{item2.data.category}</span>
                      <p className="text-stone-400 mt-1">{item2.data.generalPurpose}</p>
                    </div>
                  </div>

                  {/* Origin */}
                  <div className="grid grid-cols-2 p-4 gap-6">
                    <div>
                      <span className="text-stone-500 font-mono block">Origin / Facility:</span>
                      <span className="text-[#c5a059] font-medium">{item1.data.manufacturerOrigin}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 font-mono block">Origin / Facility:</span>
                      <span className="text-[#c5a059] font-medium">{item2.data.manufacturerOrigin}</span>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 p-4 gap-6">
                    <div>
                      <span className="text-stone-500 font-mono block mb-1">Specifications:</span>
                      <div className="space-y-1 text-stone-300">
                        {Object.entries(item1.data.specifications).map(([k, v]) => (
                          <div key={k}>
                            <span className="text-stone-500">{k}:</span> {v as string}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-stone-500 font-mono block mb-1">Specifications:</span>
                      <div className="space-y-1 text-stone-300">
                        {Object.entries(item2.data.specifications).map(([k, v]) => (
                          <div key={k}>
                            <span className="text-stone-500">{k}:</span> {v as string}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* UNIFORM COMPARISON */}
              {compareType === 'uniform' && (
                <div className="divide-y divide-stone-800/80 text-xs">
                  {/* Images */}
                  <div className="grid grid-cols-2 p-4 gap-6 bg-black/40">
                    <div className="h-48 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                      <img
                        src={item1.data.image}
                        alt={item1.data.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-48 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                      <img
                        src={item2.data.image}
                        alt={item2.data.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="grid grid-cols-2 p-4 gap-6">
                    <div>
                      <span className="text-stone-500 font-mono block mb-1">Colors:</span>
                      <div className="flex gap-2">
                        {item1.data.colorHexes.map((hex: string, i: number) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border border-stone-700"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-stone-500 font-mono block mb-1">Colors:</span>
                      <div className="flex gap-2">
                        {item2.data.colorHexes.map((hex: string, i: number) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border border-stone-700"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div className="grid grid-cols-2 p-4 gap-6">
                    <div>
                      <span className="text-stone-500 font-mono block mb-1">Purpose:</span>
                      <p className="text-stone-300">{item1.data.purpose}</p>
                    </div>
                    <div>
                      <span className="text-stone-500 font-mono block mb-1">Purpose:</span>
                      <p className="text-stone-300">{item2.data.purpose}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* CAREER COMPARISON */}
              {compareType === 'career' && (
                <div className="divide-y divide-stone-800/80 text-xs">
                  <div className="grid grid-cols-2 p-4 gap-6">
                    <div>
                      <span className="text-stone-500 font-mono block">Entry Route:</span>
                      <span className="text-stone-200 font-semibold">{item1.data.entryRoute}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 font-mono block">Entry Route:</span>
                      <span className="text-stone-200 font-semibold">{item2.data.entryRoute}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 p-4 gap-6">
                    <div>
                      <span className="text-stone-500 font-mono block">Academy & Duration:</span>
                      <span className="text-stone-200">{item1.data.trainingAcademy} ({item1.data.trainingDuration})</span>
                    </div>
                    <div>
                      <span className="text-stone-500 font-mono block">Academy & Duration:</span>
                      <span className="text-stone-200">{item2.data.trainingAcademy} ({item2.data.trainingDuration})</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
