import React, { useState } from 'react';
import { useShowcase } from '../context/ShowcaseContext';
import {
  Settings,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  Eye,
  CheckCircle,
  AlertTriangle,
  Layers,
  Image,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    equipment,
    uniforms,
    posts,
    ranks,
    addItem,
    deleteItem,
    resetAllData,
  } = useShowcase();

  const [activeCollection, setActiveCollection] = useState<'equipment' | 'uniforms' | 'posts' | 'ranks'>('equipment');
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    force: 'Bangladesh Army',
    category: 'Armored Vehicles & Tanks',
    description: '',
    generalPurpose: '',
    manufacturerOrigin: 'Bangladesh Ordnance Factories (BOF)',
    image: '/src/assets/images/force_bangladesh_army_1793808499613.jpg',
    source: 'Official Defense Press Release (Local Entry)',
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      ...formData,
      specifications: {
        'Status': 'Custom Showcase Entry',
        'Added Date': new Date().toLocaleDateString(),
      },
      publicVerificationStatus: 'Local showcase record',
      hierarchyLevel: 10,
      insigniaDescription: formData.description,
      generalResponsibilities: [formData.description],
      careerLevel: 'Local Showcase Profile',
      equivalentArmy: formData.name,
      equivalentNavy: formData.name,
      equivalentAirForce: formData.name,
      associatedUniform: 'Service Dress',
      colors: ['Tactical Green', 'Charcoal'],
      colorHexes: ['#164e31', '#1e293b'],
      wearOccasions: ['Demonstration and review'],
      associatedRanks: 'All Ranks',
      insigniaAndAccessories: ['Authorized insignia device'],
      department: 'Special Operations Wing',
      rankEligibility: 'Officer & Senior Enlisted',
      keyDuties: [formData.description],
      requiredSkills: ['Defense operational proficiency'],
      relatedEquipment: [],
      relatedBadges: [],
      relatedRole: 'Defense specialist',
    };

    addItem(activeCollection, newItem);
    setIsAdding(false);
    setShowPreview(false);
    setFormData({
      name: '',
      force: 'Bangladesh Army',
      category: 'Armored Vehicles & Tanks',
      description: '',
      generalPurpose: '',
      manufacturerOrigin: 'Bangladesh Ordnance Factories (BOF)',
      image: '/src/assets/images/force_bangladesh_army_1793808499613.jpg',
      source: 'Official Defense Press Release (Local Entry)',
    });
  };

  const currentList =
    activeCollection === 'equipment'
      ? equipment
      : activeCollection === 'uniforms'
      ? uniforms
      : activeCollection === 'posts'
      ? posts
      : ranks;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Demo Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#c5a059] tracking-wider">
            <Settings className="w-3.5 h-3.5" />
            <span>Showcase Content Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-display mt-1">
            Local Showcase Registry Editor
          </h1>
          <p className="text-sm text-stone-400 mt-1 max-w-2xl leading-relaxed">
            Manage, curate, add, and test defense catalog records stored in your browser's local sandbox.
          </p>
        </div>

        <button
          onClick={resetAllData}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-300 hover:text-white transition-colors cursor-pointer w-fit"
          title="Restore factory default defense catalog"
        >
          <RotateCcw className="w-4 h-4 text-emerald-400" />
          <span>Restore Default Catalog</span>
        </button>
      </div>

      {/* Demo Notice Banner */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-amber-300">Local Sandbox Mode: </span>
          This admin console operates within client localStorage for demonstration and review. It is decoupled from any production military database. Changes persist on this browser until restored.
        </div>
      </div>

      {/* Collection Switcher & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-stone-900/60 p-1 rounded-xl border border-stone-800 text-xs">
          {(['equipment', 'uniforms', 'posts', 'ranks'] as const).map((col) => (
            <button
              key={col}
              onClick={() => {
                setActiveCollection(col);
                setIsAdding(false);
              }}
              className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap cursor-pointer transition-colors ${
                activeCollection === col
                  ? 'bg-emerald-950 text-[#c5a059] font-semibold border border-emerald-700/60'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {col}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-stone-950 text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel Entry' : `Add New ${activeCollection.slice(0, -1)}`}</span>
        </button>
      </div>

      {/* Add Item Form with Live Preview */}
      {isAdding && (
        <div className="p-6 rounded-2xl bg-[#090f0c] border border-stone-700 shadow-2xl space-y-6 animate-slideUp">
          <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-100 font-display">
              Add New {activeCollection.slice(0, -1).toUpperCase()} Record
            </h3>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 text-xs text-[#c5a059] hover:underline"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showPreview ? 'Hide Preview' : 'Show Live Preview'}</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-400 font-mono mb-1 uppercase">Title / Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Type 69-IIG Main Battle Tank"
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-stone-400 font-mono mb-1 uppercase">Branch of Service *</label>
                <select
                  value={formData.force}
                  onChange={(e) => setFormData({ ...formData, force: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="Bangladesh Army">Bangladesh Army</option>
                  <option value="Bangladesh Navy">Bangladesh Navy</option>
                  <option value="Bangladesh Air Force">Bangladesh Air Force</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-400 font-mono mb-1 uppercase">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Armored Vehicles, Flight Gear, Surface Combatant"
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-stone-400 font-mono mb-1 uppercase">Manufacturer / Origin</label>
                <input
                  type="text"
                  value={formData.manufacturerOrigin}
                  onChange={(e) => setFormData({ ...formData, manufacturerOrigin: e.target.value })}
                  placeholder="e.g. Bangladesh Ordnance Factories / Local Upgrade"
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-400 font-mono mb-1 uppercase">Image Asset Path / URL</label>
              <select
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:outline-none focus:border-[#c5a059]"
              >
                <option value="/src/assets/images/force_bangladesh_army_1793808499613.jpg">Army Digital Woodland Camouflage / Infantry Asset</option>
                <option value="/src/assets/images/force_bangladesh_navy_1793808501000.jpg">Navy Guided Missile Frigate / Sea Combat Asset</option>
                <option value="/src/assets/images/force_bangladesh_air_force_1793808500274.jpg">Air Force Combat Jet Fighter Formation Asset</option>
                <option value="/src/assets/images/tactical_bd_hero_defense_1793808498280.jpg">Tactical Command Center Hero Showcase</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-400 font-mono mb-1 uppercase">Description *</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Comprehensive technical or operational description..."
                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-stone-400 font-mono mb-1 uppercase">Public Source Citation</label>
              <input
                type="text"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            {/* Live Preview Box */}
            {showPreview && (
              <div className="p-4 rounded-xl bg-stone-900/80 border border-[#c5a059]/40 space-y-2 mt-2">
                <div className="text-[10px] font-mono text-[#c5a059] uppercase">Live Record Preview</div>
                <div className="text-base font-bold text-stone-100">{formData.name || 'Untitled Item'}</div>
                <div className="text-xs text-emerald-400">{formData.force} · {formData.category}</div>
                <p className="text-xs text-stone-300">{formData.description || 'No description entered yet.'}</p>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer shadow-md"
              >
                Save Record to Registry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing Items Registry Table */}
      <div className="rounded-2xl bg-[#090f0c] border border-stone-800 overflow-hidden shadow-xl">
        <div className="p-4 bg-[#0d1611] border-b border-stone-800 flex items-center justify-between text-xs">
          <span className="font-mono text-stone-300 font-semibold uppercase">
            {activeCollection} Registry ({currentList.length} Items)
          </span>
          <span className="text-stone-500 font-mono">Local Storage Backed</span>
        </div>

        <div className="divide-y divide-stone-800/80 text-xs">
          {currentList.map((item: any) => (
            <div
              key={item.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-900/40 transition-colors"
            >
              <div>
                <div className="text-[10px] font-mono text-emerald-400 uppercase">
                  {item.force || 'Armed Forces'} · {item.category || item.department}
                </div>
                <h4 className="text-sm font-bold text-stone-100 mt-0.5">{item.name || item.title}</h4>
                <p className="text-stone-400 line-clamp-1 mt-0.5">{item.description}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => deleteItem(activeCollection, item.id)}
                  className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Delete from showcase"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
