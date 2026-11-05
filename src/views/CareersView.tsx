import React, { useState, useMemo } from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { AptitudeSimulator } from '../components/AptitudeSimulator';
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
  Shield,
  Timer,
  Play,
  Volume2,
} from 'lucide-react';

export const CareersView: React.FC = () => {
  const { careers, setSelectedCareer, addToCompare, isComparing, toggleFavorite, isFavorite } = useShowcase();

  const [activeTab, setActiveTab] = useState<'pathways' | 'simulator'>('pathways');
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
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

        {/* View Switcher: Catalog vs. Exam Simulator */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-900/90 rounded-xl border border-stone-700 text-xs shrink-0">
          <button
            onClick={() => setActiveTab('pathways')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === 'pathways'
                ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Career Pathways</span>
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Timer className="w-3.5 h-3.5 text-rose-400" />
            <span>Exam Simulator</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 font-mono">
              AUDIO ALERTS
            </span>
          </button>
        </div>
      </div>

      {/* Simulator Mode Viewport */}
      {activeTab === 'simulator' ? (
        <div className="space-y-6">
          <AptitudeSimulator onClose={() => setActiveTab('pathways')} />
        </div>
      ) : (
        /* Regular Pathways Catalog */
        <div className="space-y-8">
          {/* Exam Simulator Teaser Card */}
          <div className="relative rounded-2xl overflow-hidden border border-emerald-800/60 bg-gradient-to-r from-[#09150e] via-[#0b1b13] to-[#07100b] p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                <Timer className="w-4 h-4 text-[#c5a059]" />
                <span>Real-Time Assessment Training</span>
                <span>·</span>
                <span className="text-stone-400">Web Audio Timer Alerts</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-100 font-display">
                Test Your Military Aptitude in the ISSB Simulator
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Experience the real-time exam atmosphere with tactical countdown clocks, audio alerts under 7 seconds, sound effects for task completion, and situational reaction tests.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('simulator')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-stone-950 text-xs font-bold transition-all shadow-lg hover:shadow-[#c5a059]/20 cursor-pointer shrink-0"
            >
              <Play className="w-4 h-4 fill-stone-950" />
              <span>Launch Simulator</span>
            </button>
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

          {/* Careers Grid with Realistic Training Imagery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCareers.map((career) => {
              const comparing = isComparing(career.id);
              const favorited = isFavorite(career.id);
              return (
                <div
                  key={career.id}
                  className="group rounded-2xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 overflow-hidden shadow-lg transition-all flex flex-col justify-between"
                >
                  {/* Hero Realistic Training Image if present */}
                  {career.image && (
                    <div
                      onClick={() => setSelectedCareer(career)}
                      className="relative h-48 sm:h-52 overflow-hidden bg-black/60 cursor-pointer"
                    >
                      <img
                        src={career.image}
                        alt={career.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090f0c] via-black/30 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(career.id, 'career', career);
                          }}
                          className={`p-1.5 rounded-lg border backdrop-blur-sm transition-colors cursor-pointer ${
                            favorited
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                              : 'bg-black/60 text-stone-300 border-white/20 hover:text-white'
                          }`}
                          title={favorited ? 'Remove Favorite' : 'Save Pathway'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${favorited ? 'fill-emerald-400' : ''}`} />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-4 text-xs font-mono text-[#c5a059]">
                        {career.trainingAcademy.split(',')[0]}
                      </div>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[10px] font-mono uppercase text-emerald-400">
                            {career.force} · {career.category}
                          </div>
                          <h3
                            onClick={() => setSelectedCareer(career)}
                            className="text-lg font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors font-display cursor-pointer mt-0.5"
                          >
                            {career.title}
                          </h3>
                        </div>

                        {!career.image && (
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
                        )}
                      </div>

                      <div className="text-xs font-mono text-[#c5a059] mt-1.5">{career.entryRoute}</div>

                      <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed mt-2.5">
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
      )}
    </div>
  );
};
