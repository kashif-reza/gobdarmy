import React, { useState, useMemo } from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { EquipmentCategory } from '../types/tactical';
import { Search, RotateCcw, SlidersHorizontal, Shield, ChevronRight, Bookmark } from 'lucide-react';

export const EquipmentView: React.FC = () => {
  const { equipment, setSelectedEquipment, addToCompare, isComparing, toggleFavorite, isFavorite } = useShowcase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForce, setSelectedForce] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: EquipmentCategory[] = [
    'Aviation & Combat Aircraft',
    'Naval Fleet & Surface Vessels',
    'Armored Vehicles & Tanks',
    'Air Defense & Missiles',
    'Infantry & Small Arms',
    'Sensors, Radar & Comms',
    'Protective & Tactical Gear',
  ];

  const filteredEquipment = useMemo(() => {
    return equipment.filter((eq) => {
      const matchesSearch =
        eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.generalPurpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.manufacturerOrigin.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesForce = selectedForce === 'all' || eq.force === selectedForce;
      const matchesCategory = selectedCategory === 'all' || eq.category === selectedCategory;

      return matchesSearch && matchesForce && matchesCategory;
    });
  }, [equipment, searchQuery, selectedForce, selectedCategory]);

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
          Defense Platforms & Service Belongings
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-display mt-1">
          Equipment & Fleet Explorer
        </h1>
        <p className="text-sm text-stone-400 mt-1 max-w-2xl leading-relaxed">
          Showcase of publicly documented defense equipment, surface combatants, multirole fighter aircraft, armored vehicles, and frontline personal tactical gear.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-2xl bg-[#090f0c] border border-stone-800 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equipment by name, category, or manufacturer..."
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

        {/* Filters */}
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
                selectedCategory === 'all' ? 'bg-stone-800 text-stone-100 font-medium' : 'text-stone-400 hover:text-stone-300'
              }`}
            >
              All Types
            </button>
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === cat ? 'bg-stone-800 text-[#c5a059] font-medium' : 'text-stone-400 hover:text-stone-300'
                }`}
              >
                {cat.split('&')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((eq) => {
          const comparing = isComparing(eq.id);
          const favorited = isFavorite(eq.id);
          return (
            <div
              key={eq.id}
              className="group rounded-2xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 overflow-hidden shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Image Preview */}
              <div
                onClick={() => setSelectedEquipment(eq)}
                className="relative h-48 overflow-hidden bg-black/60 cursor-pointer"
              >
                <img
                  src={eq.image}
                  alt={eq.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(eq.id, 'equipment', eq);
                    }}
                    className={`p-1.5 rounded-lg border backdrop-blur-sm transition-colors cursor-pointer ${
                      favorited
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : 'bg-black/60 text-stone-300 border-white/20 hover:text-white'
                    }`}
                    title={favorited ? 'Remove Favorite' : 'Save Favorite'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${favorited ? 'fill-emerald-400' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[10px] font-mono uppercase text-emerald-400">
                    {eq.force} · {eq.category}
                  </div>
                  <h3
                    onClick={() => setSelectedEquipment(eq)}
                    className="text-lg font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors font-display cursor-pointer mt-0.5"
                  >
                    {eq.name}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mt-2">
                    {eq.generalPurpose}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-800">
                  {eq.manufacturerOrigin}
                </div>

                {/* Footer Controls */}
                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={() => addToCompare(eq, 'equipment')}
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
                    onClick={() => setSelectedEquipment(eq)}
                    className="flex items-center gap-1 text-[#c5a059] hover:underline font-semibold cursor-pointer"
                  >
                    <span>Specs</span>
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
