import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { Search, X, Shield, Award, Users, Shirt, Plane, Compass, ExternalLink, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    forces,
    ranks,
    posts,
    uniforms,
    badges,
    equipment,
    careers,
    setSelectedRank,
    setSelectedPost,
    setSelectedUniform,
    setSelectedBadge,
    setSelectedEquipment,
    setSelectedCareer,
    navigateToForce,
    setActiveView,
  } = useShowcase();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Unified Search Index
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      category: 'Force' | 'Rank' | 'Post' | 'Uniform' | 'Badge' | 'Equipment' | 'Career';
      forceName?: string;
      item: any;
    }> = [];

    // 1. Forces
    forces.forEach((f) => {
      if (
        f.name.toLowerCase().includes(q) ||
        f.nativeName.toLowerCase().includes(q) ||
        f.motto.toLowerCase().includes(q)
      ) {
        results.push({
          id: f.id,
          title: f.name,
          subtitle: `${f.nativeName} · ${f.motto}`,
          category: 'Force',
          item: f,
        });
      }
    });

    // 2. Ranks
    ranks.forEach((r) => {
      if (
        r.name.toLowerCase().includes(q) ||
        r.nativeName.toLowerCase().includes(q) ||
        r.force.toLowerCase().includes(q) ||
        r.careerLevel.toLowerCase().includes(q) ||
        r.insigniaDescription.toLowerCase().includes(q)
      ) {
        results.push({
          id: r.id,
          title: r.name,
          subtitle: `${r.nativeName} · ${r.force} · ${r.category}`,
          category: 'Rank',
          forceName: r.force,
          item: r,
        });
      }
    });

    // 3. Posts
    posts.forEach((p) => {
      if (
        p.title.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.force.toLowerCase().includes(q)
      ) {
        results.push({
          id: p.id,
          title: p.title,
          subtitle: `${p.force} · ${p.department} · ${p.rankEligibility}`,
          category: 'Post',
          forceName: p.force,
          item: p,
        });
      }
    });

    // 4. Uniforms
    uniforms.forEach((u) => {
      if (
        u.name.toLowerCase().includes(q) ||
        u.category.toLowerCase().includes(q) ||
        u.purpose.toLowerCase().includes(q) ||
        u.force.toLowerCase().includes(q)
      ) {
        results.push({
          id: u.id,
          title: u.name,
          subtitle: `${u.force} · ${u.category}`,
          category: 'Uniform',
          forceName: u.force,
          item: u,
        });
      }
    });

    // 5. Badges
    badges.forEach((b) => {
      if (
        b.name.toLowerCase().includes(q) ||
        b.meaning.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: b.id,
          title: b.name,
          subtitle: `${b.force} · ${b.category}`,
          category: 'Badge',
          forceName: b.force,
          item: b,
        });
      }
    });

    // 6. Equipment
    equipment.forEach((e) => {
      if (
        e.name.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.generalPurpose.toLowerCase().includes(q)
      ) {
        results.push({
          id: e.id,
          title: e.name,
          subtitle: `${e.force} · ${e.category} · ${e.manufacturerOrigin}`,
          category: 'Equipment',
          forceName: e.force,
          item: e,
        });
      }
    });

    // 7. Careers
    careers.forEach((c) => {
      if (
        c.title.toLowerCase().includes(q) ||
        c.trainingAcademy.toLowerCase().includes(q) ||
        c.entryRoute.toLowerCase().includes(q)
      ) {
        results.push({
          id: c.id,
          title: c.title,
          subtitle: `${c.force} · ${c.entryRoute}`,
          category: 'Career',
          forceName: c.force,
          item: c,
        });
      }
    });

    if (selectedCategory === 'all') return results;
    return results.filter((r) => r.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [query, selectedCategory, forces, ranks, posts, uniforms, badges, equipment, careers]);

  const handleSelectResult = (result: (typeof searchResults)[0]) => {
    setIsSearchOpen(false);
    switch (result.category) {
      case 'Force':
        navigateToForce(result.item.id);
        break;
      case 'Rank':
        setSelectedRank(result.item);
        break;
      case 'Post':
        setSelectedPost(result.item);
        break;
      case 'Uniform':
        setSelectedUniform(result.item);
        break;
      case 'Badge':
        setSelectedBadge(result.item);
        break;
      case 'Equipment':
        setSelectedEquipment(result.item);
        break;
      case 'Career':
        setSelectedCareer(result.item);
        break;
    }
  };

  const handleSuggestionClick = (suggested: string) => {
    setQuery(suggested);
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#090f0c] border border-stone-700/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header Input */}
        <div className="relative flex items-center border-b border-stone-800 p-4">
          <Search className="w-5 h-5 text-emerald-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across ranks, uniforms, equipment, roles, badges, careers..."
            className="w-full bg-transparent text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-stone-400 hover:text-white mr-2"
              title="Clear Search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 rounded bg-stone-800 text-[11px] text-stone-300 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Category Filters Ribbon */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0b1410] border-b border-stone-800/80 overflow-x-auto text-xs scrollbar-none">
          {['all', 'rank', 'post', 'uniform', 'equipment', 'badge', 'career', 'force'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md capitalize whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-950 text-[#c5a059] border border-emerald-700/60 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat === 'all' ? 'All Results' : `${cat}s`}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {query.trim() === '' ? (
            <div className="py-8 px-4 text-center">
              <div className="text-xs text-stone-500 uppercase tracking-wider mb-2 font-mono">
                Suggested Searches
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                {[
                  'General',
                  'Fighter Pilot',
                  'Type 59G Tank',
                  'BNS Shadhinota',
                  'Bir Sreshtho',
                  'Digital Woodland Camo',
                  'SWADS',
                  'BMA Long Course',
                  'Air Chief Marshal',
                ].map((sugg) => (
                  <button
                    key={sugg}
                    onClick={() => handleSuggestionClick(sugg)}
                    className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-xs text-stone-300 border border-stone-800 transition-colors cursor-pointer"
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((res) => (
              <div
                key={`${res.category}-${res.id}`}
                onClick={() => handleSelectResult(res)}
                className="group flex items-center justify-between p-3 rounded-xl bg-stone-900/40 hover:bg-emerald-950/40 border border-stone-800/60 hover:border-emerald-700/60 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-stone-900 text-emerald-400 group-hover:text-[#c5a059] transition-colors">
                    {res.category === 'Rank' && <Award className="w-4 h-4" />}
                    {res.category === 'Equipment' && <Shield className="w-4 h-4" />}
                    {res.category === 'Post' && <Users className="w-4 h-4" />}
                    {res.category === 'Uniform' && <Shirt className="w-4 h-4" />}
                    {res.category === 'Badge' && <Award className="w-4 h-4" />}
                    {res.category === 'Career' && <Compass className="w-4 h-4" />}
                    {res.category === 'Force' && <Shield className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-stone-100 group-hover:text-[#c5a059] flex items-center gap-2">
                      <span>{res.title}</span>
                      <span className="text-[10px] font-mono font-normal uppercase text-stone-400 px-1.5 py-0.5 rounded bg-stone-800">
                        {res.category}
                      </span>
                    </div>
                    <div className="text-xs text-stone-400 line-clamp-1">{res.subtitle}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-[#c5a059] group-hover:translate-x-1 transition-all" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-stone-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40 text-stone-400" />
              <p className="text-sm font-medium text-stone-300">No matching defense records found</p>
              <p className="text-xs text-stone-500 mt-1">
                Try searching for specific terms like "MiG-29", "Captain", "Navy White", or "Peacekeeping".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
