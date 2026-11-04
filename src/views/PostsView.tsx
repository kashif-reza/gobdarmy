import React, { useState, useMemo } from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { PostRole } from '../types/tactical';
import { Search, Bookmark, ChevronRight, Briefcase, Wrench, Shield, RotateCcw } from 'lucide-react';

export const PostsView: React.FC = () => {
  const { posts, setSelectedPost, toggleFavorite, isFavorite } = useShowcase();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForce, setSelectedForce] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  // Extract unique departments
  const departments = useMemo(() => {
    const set = new Set(posts.map((p) => p.department));
    return Array.from(set);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesForce = selectedForce === 'all' || p.force === selectedForce;
      const matchesDept = selectedDept === 'all' || p.department === selectedDept;

      return matchesSearch && matchesForce && matchesDept;
    });
  }, [posts, searchQuery, selectedForce, selectedDept]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedForce('all');
    setSelectedDept('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5">
        <div className="text-xs font-mono uppercase text-[#c5a059] tracking-widest">
          Professional Specializations & Careers
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-display mt-1">
          Posts & Roles Explorer
        </h1>
        <p className="text-sm text-stone-400 mt-1 max-w-2xl leading-relaxed">
          Publicly documented operational billets and professional career roles across the Bangladesh Armed Forces, including aviators, marine warfare specialists, combat commandos, and military medical officers.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#090f0c] border border-stone-800 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles by title, duties, or professional skills..."
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
              onClick={() => setSelectedDept('all')}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                selectedDept === 'all' ? 'bg-stone-800 text-stone-100 font-medium' : 'text-stone-400 hover:text-stone-300'
              }`}
            >
              All Departments
            </button>
            {departments.slice(0, 4).map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedDept === dept ? 'bg-stone-800 text-[#c5a059] font-medium' : 'text-stone-400 hover:text-stone-300'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => {
          const favorited = isFavorite(post.id);
          return (
            <div
              key={post.id}
              className="group rounded-2xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 p-6 shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-emerald-400">
                      {post.force} · {post.department}
                    </div>
                    <h3
                      onClick={() => setSelectedPost(post)}
                      className="text-xl font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors font-display cursor-pointer mt-0.5"
                    >
                      {post.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleFavorite(post.id, 'post', post)}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      favorited
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white hover:bg-stone-800'
                    }`}
                    title={favorited ? 'Remove Favorite' : 'Save Favorite'}
                  >
                    <Bookmark className={`w-4 h-4 ${favorited ? 'fill-emerald-400' : ''}`} />
                  </button>
                </div>

                <div className="text-xs font-mono text-[#c5a059] mt-1.5">
                  Rank Eligibility: {post.rankEligibility}
                </div>

                <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed mt-3">
                  {post.description}
                </p>

                {/* Skill tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.requiredSkills.slice(0, 3).map((sk, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300"
                    >
                      {sk}
                    </span>
                  ))}
                  {post.requiredSkills.length > 3 && (
                    <span className="text-[10px] text-stone-500 self-center">
                      +{post.requiredSkills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-stone-400">
                  {post.keyDuties.length} Key Duties
                </span>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="flex items-center gap-1 text-[#c5a059] hover:underline font-semibold cursor-pointer"
                >
                  <span>Open Role Profile</span>
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
