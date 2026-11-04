import React, { useState, useMemo } from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import {
  Search,
  RotateCcw,
  GraduationCap,
  Activity,
  Bookmark,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  Compass,
  AlertCircle,
} from 'lucide-react';

export const CareersView: React.FC = () => {
  const { careers, setSelectedCareer, addToCompare, isComparing, toggleFavorite, isFavorite } = useShowcase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForce, setSelectedForce] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'Commissioned Officer',
    'Specialist Entry',
    'Soldier / Sailor / Airman',
  ];

  const filteredCareers = useMemo(() => {
    return careers.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.trainingAcademy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.overview.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesForce = selectedForce === 'all' || c.force === selectedForce;
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;

      return matchesSearch && matchesForce && matchesCategory;
    });
  }, [careers, searchQuery, selectedForce, selectedCategory]);

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
          Recruitment Pathways, Academies & ISSB Standards
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-display mt-1">
          Career & Commission Explorer
        </h1>
        <p className="text-sm text-stone-400 mt-1 max-w-2xl leading-relaxed">
          Publicly documented officer commissioning streams, Inter Services Selection Board (ISSB) evaluation phases, academy training curricula, and direct technical commissions.
        </p>
      </div>

      {/* Official Recruitment Portals Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0a140e] border border-emerald-800/60">
        <a
          href="https://joinbangladesharmy.army.mil.bd"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 rounded-xl bg-stone-900/80 hover:bg-emerald-950/60 border border-stone-800 text-xs text-stone-200 transition-colors"
        >
          <div>
            <div className="text-[10px] font-mono text-emerald-400">Bangladesh Army</div>
            <div className="font-semibold text-stone-100 mt-0.5">Join Army Portal</div>
          </div>
          <ExternalLink className="w-4 h-4 text-[#c5a059]" />
        </a>

        <a
          href="https://joinbangladeshnavy.navy.mil.bd"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 rounded-xl bg-stone-900/80 hover:bg-sky-950/60 border border-stone-800 text-xs text-stone-200 transition-colors"
        >
          <div>
            <div className="text-[10px] font-mono text-sky-400">Bangladesh Navy</div>
            <div className="font-semibold text-stone-100 mt-0.5">Join Navy Portal</div>
          </div>
          <ExternalLink className="w-4 h-4 text-[#c5a059]" />
        </a>

        <a
          href="https://joinbangladeshairforce.baf.mil.bd"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 rounded-xl bg-stone-900/80 hover:bg-indigo-950/60 border border-stone-800 text-xs text-stone-200 transition-colors"
        >
          <div>
            <div className="text-[10px] font-mono text-indigo-400">Bangladesh Air Force</div>
            <div className="font-semibold text-stone-100 mt-0.5">Join Air Force Portal</div>
          </div>
          <ExternalLink className="w-4 h-4 text-[#c5a059]" />
        </a>
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
              placeholder="Search careers by academy (BMA, BNA, BAFA), cadet course, or qualifications..."
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
              All Streams
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

      {/* Careers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCareers.map((career) => {
          const comparing = isComparing(career.id);
          const favorited = isFavorite(career.id);
          return (
            <div
              key={career.id}
              className="group rounded-2xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 p-6 shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-emerald-400">
                      {career.force} · {career.category}
                    </div>
                    <h3
                      onClick={() => setSelectedCareer(career)}
                      className="text-xl font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors font-display cursor-pointer mt-0.5"
                    >
                      {career.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleFavorite(career.id, 'career', career)}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      favorited
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white hover:bg-stone-800'
                    }`}
                    title={favorited ? 'Remove Favorite' : 'Save Pathway'}
                  >
                    <Bookmark className={`w-4 h-4 ${favorited ? 'fill-emerald-400' : ''}`} />
                  </button>
                </div>

                <div className="text-xs font-mono text-[#c5a059] mt-1.5">{career.entryRoute}</div>

                <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed mt-3">
                  {career.overview}
                </p>

                {/* Training Academy & Duration */}
                <div className="mt-4 p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 text-xs space-y-1">
                  <div className="flex items-center justify-between text-stone-300">
                    <span className="text-stone-500 font-mono">Academy:</span>
                    <span className="truncate max-w-[220px] font-medium">{career.trainingAcademy.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-300">
                    <span className="text-stone-500 font-mono">Duration:</span>
                    <span className="text-[#c5a059] font-medium">{career.trainingDuration}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => addToCompare(career, 'career')}
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
                  onClick={() => setSelectedCareer(career)}
                  className="flex items-center gap-1 text-[#c5a059] hover:underline font-semibold cursor-pointer"
                >
                  <span>Admission Criteria</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-[#0a120e] border border-stone-800 text-xs text-stone-400 flex items-start gap-3 leading-relaxed">
        <AlertCircle className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
        <div>
          <span className="text-stone-200 font-medium">Important Recruitment Notice: </span>
          All military recruitments in Bangladesh are conducted solely through official Armed Forces selection boards (ISSB, Army Recruitment, Navy Recruitment, BAF Recruitment). Never pay any third-party agents. Direct your applications exclusively through the official government military portals linked above.
        </div>
      </div>
    </div>
  );
};
