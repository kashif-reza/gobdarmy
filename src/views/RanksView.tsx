import React, { useState, useMemo } from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { InsigniaView } from '../components/InsigniaView';
import { RankCategory } from '../types/tactical';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Award,
  ChevronRight,
  Shield,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

export const RanksView: React.FC = () => {
  const { ranks, setSelectedRank, addToCompare, isComparing, setActiveView } = useShowcase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForce, setSelectedForce] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'hierarchy-desc' | 'hierarchy-asc'>('hierarchy-desc');

  // Filtered & Sorted Ranks
  const filteredRanks = useMemo(() => {
    let list = ranks.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.careerLevel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesForce = selectedForce === 'all' || r.force === selectedForce;
      const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;

      return matchesSearch && matchesForce && matchesCategory;
    });

    list.sort((a, b) => {
      if (sortOrder === 'hierarchy-desc') {
        return a.hierarchyLevel - b.hierarchyLevel; // 1 (General) first
      } else {
        return b.hierarchyLevel - a.hierarchyLevel; // Sainik first
      }
    });

    return list;
  }, [ranks, searchQuery, selectedForce, selectedCategory, sortOrder]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedForce('all');
    setSelectedCategory('all');
    setSortOrder('hierarchy-desc');
  };

  const categories: RankCategory[] = [
    'Commissioned Officer',
    'Junior Commissioned Officer',
    'Non-Commissioned Officer',
    'Other Rank',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="text-xs font-mono uppercase text-[#c5a059] tracking-widest">
            Military Hierarchy & Insignias
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-display mt-1">
            Rank Catalog & Hierarchy Explorer
          </h1>
          <p className="text-sm text-stone-400 mt-1 max-w-2xl">
            Explore the official ranks, shoulder insignia devices, general command responsibilities, and verified three-service rank equivalencies.
          </p>
        </div>

        <button
          onClick={() => setActiveView('compare')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-200 transition-colors w-fit"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Open Comparison Workbench</span>
        </button>
      </div>

      {/* Control Bar: Search & Interactive Filters */}
      <div className="p-4 rounded-2xl bg-[#090f0c] border border-stone-800 space-y-4 shadow-lg">
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rank by name (e.g., General, Major, Captain, Wing Commander)..."
              className="w-full pl-10 pr-4 py-2 bg-stone-900/80 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Sort Toggle */}
            <button
              onClick={() =>
                setSortOrder(sortOrder === 'hierarchy-desc' ? 'hierarchy-asc' : 'hierarchy-desc')
              }
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Sort by Hierarchy"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>
                {sortOrder === 'hierarchy-desc' ? 'Top Rank First' : 'Entry Rank First'}
              </span>
            </button>

            {/* Reset Filters */}
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Row 2: Force Filter Tabs & Category Filter Chips */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-3 border-t border-stone-800/80">
          {/* Force Tabs */}
          <div className="flex items-center gap-1.5 bg-stone-900/60 p-1 rounded-xl border border-stone-800 overflow-x-auto text-xs">
            {['all', 'Bangladesh Army', 'Bangladesh Navy', 'Bangladesh Air Force'].map((f) => {
              const label =
                f === 'all'
                  ? 'All Forces'
                  : f.replace('Bangladesh ', '');
              return (
                <button
                  key={f}
                  onClick={() => setSelectedForce(f)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                    selectedForce === f
                      ? 'bg-emerald-950 text-[#c5a059] font-semibold border border-emerald-700/60 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs w-full md:w-auto scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-stone-800 text-stone-100 font-medium'
                  : 'text-stone-400 hover:text-stone-300'
              }`}
            >
              All Categories
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

      {/* Ranks Catalog Grid */}
      {filteredRanks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRanks.map((rank) => {
            const comparing = isComparing(rank.id);
            return (
              <div
                key={rank.id}
                className="group rounded-2xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 p-5 shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                {/* Top Card Bar */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    onClick={() => setSelectedRank(rank)}
                    className="flex items-center gap-3.5 cursor-pointer flex-1"
                  >
                    <InsigniaView rank={rank} size="md" />
                    <div>
                      <div className="text-[10px] font-mono uppercase text-emerald-400">
                        {rank.force.replace('Bangladesh ', '')} · Tier {rank.hierarchyLevel}
                      </div>
                      <h3 className="text-lg font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors font-display">
                        {rank.name}
                      </h3>
                      <div className="text-xs text-[#c5a059] font-display">{rank.nativeName}</div>
                    </div>
                  </div>
                </div>

                {/* Body Meta */}
                <div
                  onClick={() => setSelectedRank(rank)}
                  className="space-y-2 cursor-pointer flex-1"
                >
                  <div className="text-xs text-stone-300 font-medium flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>{rank.careerLevel}</span>
                  </div>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {rank.generalResponsibilities[0]}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => addToCompare(rank, 'rank')}
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
                    onClick={() => setSelectedRank(rank)}
                    className="flex items-center gap-1 text-[#c5a059] hover:underline font-medium cursor-pointer"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center text-stone-500 bg-[#090f0c] border border-stone-800 rounded-2xl">
          <Award className="w-10 h-10 mx-auto mb-3 opacity-40 text-stone-400" />
          <h3 className="text-base font-semibold text-stone-300">No ranks matching your criteria</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, selecting "All Forces", or clicking reset.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-xs text-stone-200 border border-stone-700"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
