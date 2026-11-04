import React, { useState, useMemo } from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { UniformCategory } from '../types/tactical';
import { Search, RotateCcw, Eye, SlidersHorizontal, Shirt, ChevronRight } from 'lucide-react';

export const UniformsView: React.FC = () => {
  const { uniforms, setSelectedUniform, addToCompare, isComparing } = useShowcase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForce, setSelectedForce] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: UniformCategory[] = [
    'Combat & Field Dress',
    'Service / Office Dress',
    'Ceremonial / Full Dress',
    'Specialist / Flight Suit',
    'Naval Working Dress',
  ];

  const filteredUniforms = useMemo(() => {
    return uniforms.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.colors.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesForce = selectedForce === 'all' || u.force === selectedForce;
      const matchesCategory = selectedCategory === 'all' || u.category === selectedCategory;

      return matchesSearch && matchesForce && matchesCategory;
    });
  }, [uniforms, searchQuery, selectedForce, selectedCategory]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedForce('all');
    setSelectedCategory('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5">
        <div className="text-xs font-mono uppercase text-[#c5a059] tracking-widest">
          Military Attire, Camouflage & Dress Regulations
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-display mt-1">
          Uniform Catalog & Gallery
        </h1>
        <p className="text-sm text-stone-400 mt-1 max-w-2xl leading-relaxed">
          Interactive gallery of operational combat patterns, formal service uniforms, ceremonial dresses, and aviation flight gear worn across the Bangladesh Armed Forces.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-[#090f0c] border border-stone-800 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search uniforms by pattern, color, or dress regulation..."
              className="w-full pl-10 pr-4 py-2 bg-stone-900/80 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Filter Rows */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-3 border-t border-stone-800/80">
          <div className="flex items-center gap-1.5 bg-stone-900/60 p-1 rounded-xl border border-stone-800 overflow-x-auto text-xs">
            {['all', 'Bangladesh Army', 'Bangladesh Navy', 'Bangladesh Air Force'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedForce(f)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedForce === f
                    ? 'bg-emerald-950 text-[#c5a059] font-semibold border border-emerald-700/60 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {f === 'all' ? 'All Forces' : f.replace('Bangladesh ', '')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs w-full md:w-auto scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-stone-800 text-stone-100 font-medium'
                  : 'text-stone-400 hover:text-stone-300'
              }`}
            >
              All Types
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === cat
                    ? 'bg-stone-800 text-[#c5a059] font-medium'
                    : 'text-stone-400 hover:text-stone-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Uniforms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniforms.map((uniform) => {
          const comparing = isComparing(uniform.id);
          return (
            <div
              key={uniform.id}
              className="group rounded-2xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 overflow-hidden shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Image Preview with Hover Affordance */}
              <div
                onClick={() => setSelectedUniform(uniform)}
                className="relative h-56 overflow-hidden bg-black/60 cursor-pointer"
              >
                <img
                  src={uniform.image}
                  alt={uniform.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div className="flex gap-1.5">
                    {uniform.colorHexes.map((hex, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-white/40 shadow-sm"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/20">
                    <Eye className="w-3 h-3 text-[#c5a059]" />
                    <span>Inspect</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[10px] font-mono uppercase text-emerald-400">
                    {uniform.force} · {uniform.category}
                  </div>
                  <h3
                    onClick={() => setSelectedUniform(uniform)}
                    className="text-lg font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors font-display cursor-pointer mt-0.5"
                  >
                    {uniform.name}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mt-2">
                    {uniform.purpose}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => addToCompare(uniform, 'uniform')}
                    disabled={comparing}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                      comparing
                        ? 'bg-stone-800 text-stone-500 border-stone-700 cursor-not-allowed'
                        : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700'
                    }`}
                  >
                    <SlidersHorizontal className="w-3 h-3 text-[#c5a059]" />
                    <span>{comparing ? 'In Compare' : 'Compare'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedUniform(uniform)}
                    className="flex items-center gap-1 text-[#c5a059] hover:underline font-semibold cursor-pointer"
                  >
                    <span>Full Viewer</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
