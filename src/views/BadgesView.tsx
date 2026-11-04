import React, { useState, useMemo } from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { BadgeCategory } from '../types/tactical';
import { InsigniaView } from '../components/InsigniaView';
import { Search, RotateCcw, Bookmark, ChevronRight, Award, Shield } from 'lucide-react';

export const BadgesView: React.FC = () => {
  const { badges, setSelectedBadge, toggleFavorite, isFavorite } = useShowcase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForce, setSelectedForce] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: BadgeCategory[] = [
    'National Gallantry Decoration',
    'Qualification & Specialist',
    'Service Badge',
    'Rank Insignia',
  ];

  const filteredBadges = useMemo(() => {
    return badges.filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.eligibility.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesForce = selectedForce === 'all' || b.force === selectedForce;
      const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;

      return matchesSearch && matchesForce && matchesCategory;
    });
  }, [badges, searchQuery, selectedForce, selectedCategory]);

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
          Heraldry, Gallantry Awards & Qualification Devices
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-display mt-1">
          Badges, Insignia & Decorations
        </h1>
        <p className="text-sm text-stone-400 mt-1 max-w-2xl leading-relaxed">
          Explore the highest national military awards, airborne wings, naval dolphin pins, pilot brevets, and service insignia earned through extraordinary valor and rigorous qualification.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#090f0c] border border-stone-800 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search badges by title, gallantry name, or qualification criteria..."
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
            {['all', 'Joint / Armed Forces', 'Bangladesh Army', 'Bangladesh Navy', 'Bangladesh Air Force'].map((f) => (
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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === cat ? 'bg-stone-800 text-[#c5a059] font-medium' : 'text-stone-400 hover:text-stone-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBadges.map((badge) => {
          const favorited = isFavorite(badge.id);
          return (
            <div
              key={badge.id}
              className="group rounded-2xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 p-5 shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div
                    onClick={() => setSelectedBadge(badge)}
                    className="flex items-center gap-3.5 cursor-pointer flex-1"
                  >
                    <InsigniaView badge={badge} size="md" />
                    <div>
                      <div className="text-[10px] font-mono uppercase text-emerald-400">
                        {badge.force}
                      </div>
                      <h3 className="text-base font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors font-display">
                        {badge.name}
                      </h3>
                      {badge.nativeName && (
                        <div className="text-xs text-[#c5a059] font-display">{badge.nativeName}</div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFavorite(badge.id, 'badge', badge)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      favorited
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                    }`}
                    title={favorited ? 'Remove Favorite' : 'Save Favorite'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${favorited ? 'fill-emerald-400' : ''}`} />
                  </button>
                </div>

                <div className="mt-3">
                  <div className="text-[10px] font-mono text-stone-500 uppercase">Meaning & Purpose</div>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mt-0.5">
                    {badge.meaning}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-stone-500 uppercase">{badge.category}</span>
                <button
                  onClick={() => setSelectedBadge(badge)}
                  className="flex items-center gap-1 text-[#c5a059] hover:underline font-semibold cursor-pointer"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
