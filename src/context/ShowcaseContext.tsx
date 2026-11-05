import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFENSE_FORCES,
  RANKS_DATA,
  POSTS_ROLES_DATA,
  UNIFORMS_DATA,
  BADGES_DATA,
  EQUIPMENT_DATA,
  CAPABILITIES_DATA,
  CAREER_DATA
} from '../data/defenseData';
import {
  DefenseForce,
  RankItem,
  PostRole,
  UniformItem,
  BadgeItem,
  EquipmentItem,
  CapabilityItem,
  CareerPathway,
  ComparisonItem
} from '../types/tactical';
import { validateComparisonAddition } from '../utils/tacticalLogic';

export type ViewSection = 
  | 'dashboard'
  | 'forces'
  | 'force-detail'
  | 'ranks'
  | 'posts'
  | 'uniforms'
  | 'badges'
  | 'equipment'
  | 'capabilities'
  | 'careers'
  | 'simulator'
  | 'compare'
  | 'favorites'
  | 'admin';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface FavoriteEntry {
  id: string;
  type: 'rank' | 'post' | 'uniform' | 'badge' | 'equipment' | 'career';
  data: any;
  savedAt: string;
}

interface ShowcaseContextType {
  // Navigation
  activeView: ViewSection;
  setActiveView: (view: ViewSection) => void;
  selectedForceId: string;
  setSelectedForceId: (id: string) => void;
  navigateToForce: (forceId: string) => void;

  // Modals & Detail sheets
  selectedRank: RankItem | null;
  setSelectedRank: (rank: RankItem | null) => void;
  selectedPost: PostRole | null;
  setSelectedPost: (post: PostRole | null) => void;
  selectedUniform: UniformItem | null;
  setSelectedUniform: (uniform: UniformItem | null) => void;
  selectedBadge: BadgeItem | null;
  setSelectedBadge: (badge: BadgeItem | null) => void;
  selectedEquipment: EquipmentItem | null;
  setSelectedEquipment: (equip: EquipmentItem | null) => void;
  selectedCareer: CareerPathway | null;
  setSelectedCareer: (career: CareerPathway | null) => void;

  // Global Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Favorites
  favorites: FavoriteEntry[];
  toggleFavorite: (id: string, type: FavoriteEntry['type'], data: any) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;

  // Comparison
  compareItems: ComparisonItem[];
  addToCompare: (item: any, type: ComparisonItem['type']) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isComparing: (id: string) => boolean;

  // Toast notifications
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  showToast: (message: string, type?: ToastMessage['type']) => void;

  // Data collections (support local modifications via admin)
  forces: DefenseForce[];
  ranks: RankItem[];
  posts: PostRole[];
  uniforms: UniformItem[];
  badges: BadgeItem[];
  equipment: EquipmentItem[];
  capabilities: CapabilityItem[];
  careers: CareerPathway[];

  // Admin mutation helpers
  addItem: (collection: 'equipment' | 'uniforms' | 'posts' | 'ranks', item: any) => void;
  updateItem: (collection: 'equipment' | 'uniforms' | 'posts' | 'ranks', id: string, updated: any) => void;
  deleteItem: (collection: 'equipment' | 'uniforms' | 'posts' | 'ranks', id: string) => void;
  resetAllData: () => void;
}

const ShowcaseContext = createContext<ShowcaseContextType | undefined>(undefined);

export const ShowcaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewSection>('dashboard');
  const [selectedForceId, setSelectedForceId] = useState<string>('army');

  // Modals
  const [selectedRank, setSelectedRank] = useState<RankItem | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostRole | null>(null);
  const [selectedUniform, setSelectedUniform] = useState<UniformItem | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<CareerPathway | null>(null);

  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Favorites
  const [favorites, setFavorites] = useState<FavoriteEntry[]>(() => {
    try {
      const saved = localStorage.getItem('tactical_bd_favorites_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tactical_bd_favorites_v1', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not persist favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (id: string, type: FavoriteEntry['type'], data: any) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === id);
      if (exists) {
        showToast(`Removed from Favorites: ${data.name || data.title || id}`, 'info');
        return prev.filter((f) => f.id !== id);
      } else {
        showToast(`Saved to Favorites: ${data.name || data.title || id}`, 'success');
        return [...prev, { id, type, data, savedAt: new Date().toISOString() }];
      }
    });
  };

  const isFavorite = (id: string) => favorites.some((f) => f.id === id);

  const clearFavorites = () => {
    setFavorites([]);
    showToast('All saved favorites cleared', 'info');
  };

  // Compare System
  const [compareItems, setCompareItems] = useState<ComparisonItem[]>([]);

  const addToCompare = (item: any, type: ComparisonItem['type']): boolean => {
    const check = validateComparisonAddition(compareItems, item.id, type);
    if (!check.allowed) {
      if (check.reason === 'duplicate') {
        showToast('Item is already in comparison table', 'warning');
      } else if (check.reason === 'full') {
        showToast('Comparison slot full (max 2 items). Please clear or remove an item first.', 'warning');
      } else if (check.reason === 'mismatch') {
        showToast(`Cannot compare a ${type} with a ${compareItems[0].type}. Please compare items of the same category.`, 'warning');
      }
      return false;
    }

    setCompareItems((prev) => [...prev, { id: item.id, type, data: item }]);
    showToast(`Added to Compare: ${item.name || item.title}`, 'success');
    return true;
  };

  const removeFromCompare = (id: string) => {
    setCompareItems((prev) => prev.filter((c) => c.id !== id));
    showToast('Removed from comparison', 'info');
  };

  const clearCompare = () => {
    setCompareItems([]);
    showToast('Comparison cleared', 'info');
  };

  const isComparing = (id: string) => compareItems.some((c) => c.id === id);

  // Dynamic Content Collections with local storage overlay for Admin module
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>(() => {
    try {
      const saved = localStorage.getItem('tactical_bd_custom_equipment');
      return saved ? JSON.parse(saved) : EQUIPMENT_DATA;
    } catch {
      return EQUIPMENT_DATA;
    }
  });

  const [uniformsList, setUniformsList] = useState<UniformItem[]>(() => {
    try {
      const saved = localStorage.getItem('tactical_bd_custom_uniforms');
      return saved ? JSON.parse(saved) : UNIFORMS_DATA;
    } catch {
      return UNIFORMS_DATA;
    }
  });

  const [postsList, setPostsList] = useState<PostRole[]>(() => {
    try {
      const saved = localStorage.getItem('tactical_bd_custom_posts');
      return saved ? JSON.parse(saved) : POSTS_ROLES_DATA;
    } catch {
      return POSTS_ROLES_DATA;
    }
  });

  const [ranksList, setRanksList] = useState<RankItem[]>(() => {
    try {
      const saved = localStorage.getItem('tactical_bd_custom_ranks');
      return saved ? JSON.parse(saved) : RANKS_DATA;
    } catch {
      return RANKS_DATA;
    }
  });

  // Admin Mutations
  const addItem = (collection: 'equipment' | 'uniforms' | 'posts' | 'ranks', item: any) => {
    if (collection === 'equipment') {
      const updated = [item, ...equipmentList];
      setEquipmentList(updated);
      localStorage.setItem('tactical_bd_custom_equipment', JSON.stringify(updated));
    } else if (collection === 'uniforms') {
      const updated = [item, ...uniformsList];
      setUniformsList(updated);
      localStorage.setItem('tactical_bd_custom_uniforms', JSON.stringify(updated));
    } else if (collection === 'posts') {
      const updated = [item, ...postsList];
      setPostsList(updated);
      localStorage.setItem('tactical_bd_custom_posts', JSON.stringify(updated));
    } else if (collection === 'ranks') {
      const updated = [item, ...ranksList];
      setRanksList(updated);
      localStorage.setItem('tactical_bd_custom_ranks', JSON.stringify(updated));
    }
    showToast(`New ${collection.slice(0, -1)} added successfully`, 'success');
  };

  const updateItem = (collection: 'equipment' | 'uniforms' | 'posts' | 'ranks', id: string, updated: any) => {
    if (collection === 'equipment') {
      const list = equipmentList.map((i) => (i.id === id ? { ...i, ...updated } : i));
      setEquipmentList(list);
      localStorage.setItem('tactical_bd_custom_equipment', JSON.stringify(list));
    } else if (collection === 'uniforms') {
      const list = uniformsList.map((i) => (i.id === id ? { ...i, ...updated } : i));
      setUniformsList(list);
      localStorage.setItem('tactical_bd_custom_uniforms', JSON.stringify(list));
    } else if (collection === 'posts') {
      const list = postsList.map((i) => (i.id === id ? { ...i, ...updated } : i));
      setPostsList(list);
      localStorage.setItem('tactical_bd_custom_posts', JSON.stringify(list));
    } else if (collection === 'ranks') {
      const list = ranksList.map((i) => (i.id === id ? { ...i, ...updated } : i));
      setRanksList(list);
      localStorage.setItem('tactical_bd_custom_ranks', JSON.stringify(list));
    }
    showToast(`Item updated successfully`, 'success');
  };

  const deleteItem = (collection: 'equipment' | 'uniforms' | 'posts' | 'ranks', id: string) => {
    if (collection === 'equipment') {
      const list = equipmentList.filter((i) => i.id !== id);
      setEquipmentList(list);
      localStorage.setItem('tactical_bd_custom_equipment', JSON.stringify(list));
    } else if (collection === 'uniforms') {
      const list = uniformsList.filter((i) => i.id !== id);
      setUniformsList(list);
      localStorage.setItem('tactical_bd_custom_uniforms', JSON.stringify(list));
    } else if (collection === 'posts') {
      const list = postsList.filter((i) => i.id !== id);
      setPostsList(list);
      localStorage.setItem('tactical_bd_custom_posts', JSON.stringify(list));
    } else if (collection === 'ranks') {
      const list = ranksList.filter((i) => i.id !== id);
      setRanksList(list);
      localStorage.setItem('tactical_bd_custom_ranks', JSON.stringify(list));
    }
    showToast(`Item deleted from registry`, 'info');
  };

  const resetAllData = () => {
    localStorage.removeItem('tactical_bd_custom_equipment');
    localStorage.removeItem('tactical_bd_custom_uniforms');
    localStorage.removeItem('tactical_bd_custom_posts');
    localStorage.removeItem('tactical_bd_custom_ranks');
    setEquipmentList(EQUIPMENT_DATA);
    setUniformsList(UNIFORMS_DATA);
    setPostsList(POSTS_ROLES_DATA);
    setRanksList(RANKS_DATA);
    showToast('Default defense catalog restored', 'info');
  };

  const navigateToForce = (forceId: string) => {
    setSelectedForceId(forceId);
    setActiveView('force-detail');
  };

  return (
    <ShowcaseContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedForceId,
        setSelectedForceId,
        navigateToForce,

        selectedRank,
        setSelectedRank,
        selectedPost,
        setSelectedPost,
        selectedUniform,
        setSelectedUniform,
        selectedBadge,
        setSelectedBadge,
        selectedEquipment,
        setSelectedEquipment,
        selectedCareer,
        setSelectedCareer,

        isSearchOpen,
        setIsSearchOpen,

        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,

        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isComparing,

        toasts,
        removeToast,
        showToast,

        forces: DEFENSE_FORCES,
        ranks: ranksList,
        posts: postsList,
        uniforms: uniformsList,
        badges: BADGES_DATA,
        equipment: equipmentList,
        capabilities: CAPABILITIES_DATA,
        careers: CAREER_DATA,

        addItem,
        updateItem,
        deleteItem,
        resetAllData,
      }}
    >
      {children}
    </ShowcaseContext.Provider>
  );
};

export const useShowcase = () => {
  const context = useContext(ShowcaseContext);
  if (!context) {
    throw new Error('useShowcase must be used within a ShowcaseProvider');
  }
  return context;
};
