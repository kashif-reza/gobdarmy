import React, { useState } from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import { InsigniaView } from '../components/InsigniaView';
import {
  Bookmark,
  Trash2,
  ChevronRight,
  Award,
  Users,
  Shirt,
  Shield,
  Compass,
  ArrowRight,
} from 'lucide-react';

export const FavoritesView: React.FC = () => {
  const {
    favorites,
    toggleFavorite,
    clearFavorites,
    setSelectedRank,
    setSelectedPost,
    setSelectedUniform,
    setSelectedBadge,
    setSelectedEquipment,
    setSelectedCareer,
    setActiveView,
  } = useShowcase();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const filteredFavorites =
    activeCategoryFilter === 'all'
      ? favorites
      : favorites.filter((f) => f.type === activeCategoryFilter);

  const handleOpenItem = (fav: (typeof favorites)[0]) => {
    switch (fav.type) {
      case 'rank':
        setSelectedRank(fav.data);
        break;
      case 'post':
        setSelectedPost(fav.data);
        break;
      case 'uniform':
        setSelectedUniform(fav.data);
        break;
      case 'badge':
        setSelectedBadge(fav.data);
        break;
      case 'equipment':
        setSelectedEquipment(fav.data);
        break;
      case 'career':
        setSelectedCareer(fav.data);
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="text-xs font-mono uppercase text-[#c5a059] tracking-widest">
            Saved Military Archives
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-display mt-1">
            Bookmarked & Favorite Items
          </h1>
          <p className="text-sm text-stone-400 mt-1 max-w-2xl">
            Quickly reference defense assets, ranks, and specialized military roles saved to your browser's persistent storage.
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-rose-400 hover:text-rose-300 transition-colors w-fit"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Saved ({favorites.length})</span>
          </button>
        )}
      </div>

      {/* Filter Ribbon */}
      <div className="flex items-center gap-1.5 bg-stone-900/60 p-1 rounded-xl border border-stone-800 overflow-x-auto text-xs">
        {['all', 'rank', 'post', 'uniform', 'badge', 'equipment', 'career'].map((type) => (
          <button
            key={type}
            onClick={() => setActiveCategoryFilter(type)}
            className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap cursor-pointer transition-colors ${
              activeCategoryFilter === type
                ? 'bg-emerald-950 text-[#c5a059] font-semibold border border-emerald-700/60 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {type === 'all' ? `All (${favorites.length})` : `${type}s (${favorites.filter((f) => f.type === type).length})`}
          </button>
        ))}
      </div>

      {/* Favorites List / Grid */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFavorites.map((fav) => (
            <div
              key={fav.id}
              className="group rounded-2xl bg-[#090f0c] border border-stone-800 hover:border-stone-700 p-5 shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  onClick={() => handleOpenItem(fav)}
                  className="flex items-center gap-3.5 cursor-pointer flex-1"
                >
                  {fav.type === 'rank' && <InsigniaView rank={fav.data} size="md" />}
                  {fav.type === 'badge' && <InsigniaView badge={fav.data} size="md" />}
                  {(fav.type === 'equipment' || fav.type === 'uniform') && (
                    <img
                      src={fav.data.image}
                      alt={fav.data.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-xl bg-black border border-stone-800"
                    />
                  )}
                  {fav.type === 'post' && (
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-[#c5a059]">
                      <Users className="w-5 h-5" />
                    </div>
                  )}
                  {fav.type === 'career' && (
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-emerald-400">
                      <Compass className="w-5 h-5" />
                    </div>
                  )}

                  <div>
                    <div className="text-[10px] font-mono uppercase text-emerald-400">
                      {fav.data.force || 'Armed Forces'} · {fav.type}
                    </div>
                    <h3 className="text-base font-bold text-stone-100 group-hover:text-[#c5a059] transition-colors font-display line-clamp-1">
                      {fav.data.name || fav.data.title}
                    </h3>
                    <div className="text-xs text-stone-400 line-clamp-1">
                      {fav.data.category || fav.data.department || fav.data.entryRoute}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavorite(fav.id, fav.type, fav.data)}
                  className="p-1.5 rounded-lg bg-stone-900 text-stone-400 hover:text-rose-400 transition-colors"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-stone-500 font-mono">
                  Saved: {new Date(fav.savedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleOpenItem(fav)}
                  className="flex items-center gap-1 text-[#c5a059] hover:underline font-semibold cursor-pointer"
                >
                  <span>Open Item</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-stone-500 bg-[#090f0c] border border-stone-800 rounded-2xl p-8 space-y-4">
          <Bookmark className="w-12 h-12 mx-auto text-stone-600 opacity-60" />
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-lg font-bold text-stone-200">No Favorites Saved Yet</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Click the bookmark icon on any rank, combat role, uniform, weapon system, or career pathway to save it here.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveView('ranks')}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-200"
            >
              Browse Ranks
            </button>
            <button
              onClick={() => setActiveView('equipment')}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-200"
            >
              Browse Equipment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
