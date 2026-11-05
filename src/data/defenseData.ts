import {
  DefenseForce,
  RankItem,
  PostRole,
  UniformItem,
  BadgeItem,
  EquipmentItem,
  CapabilityItem,
  CareerPathway,
} from '../types/tactical';

export const DEFENSE_FORCES: DefenseForce[] = [
  {
    id: 'army',
    name: 'Bangladesh Army',
    nativeName: 'বাংলাদেশ সেনাবাহিনী',
    established: '1971 (Liberation War)',
    motto: 'In War, In Peace, We are Everywhere for our Country',
    nativeMotto: 'সমরে আমরা শান্তিতে আমরা সর্বত্র আমরা দেশের তরে',
    headquarters: 'Army Headquarters, Dhaka Cantonment, Dhaka',
    commanderTitle: 'Chief of Army Staff (CAS)',
    officialColors: ['#164e31', '#991b1b', '#d4af37'],
    bannerImage: '/src/assets/images/force_bangladesh_army_1793808499613.jpg',
    overview: 'The Bangladesh Army is the land warfare branch of the Bangladesh Armed Forces. Founded during the 1971 Bangladesh Liberation War from patriotic Bengali officers and soldiers of the Mukti Bahini, it maintains sovereignty over national land borders and has been a leading contributor to United Nations peacekeeping operations globally.',
    role: 'Defense of territorial integrity, internal security support, national strategic infrastructure development, and international UN peacekeeping operations.',
    keyBases: ['Dhaka Cantonment', 'Bogura Cantonment', 'Cumilla Cantonment', 'Chattogram Cantonment', 'Jashore Cantonment'],
    personnelEstimate: '~175,000 active service personnel (IISS Military Balance public estimates)',
    historicalFoundation: 'Formed in July 1971 during the historic Liberation War Sector Commanders Conference under Commander-in-Chief General M. A. G. Osmani.',
    officialPortal: 'https://army.mil.bd'
  },
  {
    id: 'navy',
    name: 'Bangladesh Navy',
    nativeName: 'বাংলাদেশ নৌবাহিনী',
    established: '1971 (Liberation War)',
    motto: 'In Peace and War, Invincible at Sea',
    nativeMotto: 'শান্তিতে সংগ্রামে সমুদ্রে দুর্জয়',
    headquarters: 'Naval Headquarters, Banani, Dhaka',
    commanderTitle: 'Chief of Naval Staff (CNS)',
    officialColors: ['#0f2942', '#ffffff', '#c5a059'],
    bannerImage: '/src/assets/images/force_bangladesh_navy_1793808501000.jpg',
    overview: 'The Bangladesh Navy is responsible for safeguarding Bangladesh\'s 118,813 square kilometers of maritime economic zone and territorial waters in the Bay of Bengal. Established during Operation Jackpot in 1971, it has transformed into a capable three-dimensional naval force with surface combatants, naval aviation, and conventional submarines.',
    role: 'Maritime sovereignty, Exclusive Economic Zone (EEZ) protection, anti-piracy, search and rescue, disaster response, and maritime UN task force deployments.',
    keyBases: ['BNS Issa Khan (Chattogram)', 'BNS Titumir (Khulna)', 'BNS Haji Mohsin (Dhaka)', 'BNS Sher-e-Bangla (Patuakhali)', 'BNS Sheikh Hasina Submarine Base (Pekua)'],
    personnelEstimate: '~25,000 active service personnel (IISS Military Balance public estimates)',
    historicalFoundation: 'Originated with two seaward patrol gunboats (BNS Padma and BNS Palash) and forty-five brave naval commandos who executed Operation Jackpot in 1971.',
    officialPortal: 'https://navy.mil.bd'
  },
  {
    id: 'air-force',
    name: 'Bangladesh Air Force',
    nativeName: 'বাংলাদেশ বিমান বাহিনী',
    established: 'September 28, 1971',
    motto: 'Free Shall We Keep the Sky of Bengal',
    nativeMotto: 'বাংলার আকাশ রাখিব মুক্ত',
    headquarters: 'Air Headquarters, Dhaka Cantonment, Dhaka',
    commanderTitle: 'Chief of Air Staff (COAS)',
    officialColors: ['#1e3a8a', '#60a5fa', '#94a3b8'],
    bannerImage: '/src/assets/images/force_bangladesh_air_force_1793808500274.jpg',
    overview: 'The Bangladesh Air Force is the aviation warfare branch charged with sovereign air defense, tactical airlift, close air support, and search and rescue. Established with the legendary "Kilo Flight" in Dimapur during the 1971 War of Liberation, the modern BAF operates multirole combat interceptors, transport aircraft, attack helicopters, and comprehensive radar air defense grids.',
    role: 'Air superiority, aerial interception, strategic and tactical airlift, disaster rescue, maritime air reconnaissance, and UN peacekeeping aviation contingents.',
    keyBases: ['BAF Base Bangabandhu (Dhaka)', 'BAF Base Bashar (Dhaka)', 'BAF Base Zahurul Haque (Chattogram)', 'BAF Base Matiur Rahman (Jashore)', 'BAF Base Cox\'s Bazar'],
    personnelEstimate: '~14,000 active service personnel (IISS Military Balance public estimates)',
    historicalFoundation: 'Officially formed on September 28, 1971 in Dimapur, Nagaland with one Otter, one Dakota, and one Alouette III helicopter, initiating sorties against occupying forces.',
    officialPortal: 'https://baf.mil.bd'
  }
];

export const RANKS_DATA: RankItem[] = [
  // ARMY RANKS
  {
    id: 'army-general',
    name: 'General',
    nativeName: 'জেনারেল',
    force: 'Bangladesh Army',
    category: 'Commissioned Officer',
    hierarchyLevel: 1,
    insigniaDescription: 'National Emblem (Shapla) over crossed sword and baton, with four stars.',
    insigniaType: 'general',
    starsCount: 4,
    hasShapla: true,
    hasSwords: true,
    generalResponsibilities: [
      'Highest military rank in active service, held by the Chief of Army Staff (CAS).',
      'Overall operational command, strategic readiness, and administration of the Bangladesh Army.',
      'Principal military advisor to the government on national land defense and sovereign security.'
    ],
    careerLevel: 'Top Strategic Command',
    equivalentArmy: 'General',
    equivalentNavy: 'Admiral',
    equivalentAirForce: 'Air Chief Marshal',
    associatedUniform: 'Service Dress Khaki / Full Ceremonial Dress with Gold Aiguillettes',
    source: 'Bangladesh Army Official Rank Structure (Public Domain)'
  },
  {
    id: 'army-lieutenant-general',
    name: 'Lieutenant General',
    nativeName: 'লেফটেন্যান্ট জেনারেল',
    force: 'Bangladesh Army',
    category: 'Commissioned Officer',
    hierarchyLevel: 2,
    insigniaDescription: 'National Emblem (Shapla) over crossed sword and baton, with three stars.',
    insigniaType: 'general',
    starsCount: 3,
    hasShapla: true,
    hasSwords: true,
    generalResponsibilities: [
      'Commands corps formations or holds Principal Staff Officer (PSO) appointments at Armed Forces Division or General Headquarters.',
      'Supervises strategic military training, doctrine, and joint operational planning.'
    ],
    careerLevel: 'Corps / Strategic Staff Command',
    equivalentArmy: 'Lieutenant General',
    equivalentNavy: 'Vice Admiral',
    equivalentAirForce: 'Air Marshal',
    associatedUniform: 'Service Dress Khaki / Combat Dress with General Officer Gorget Patches',
    source: 'Bangladesh Army Official Rank Structure (Public Domain)'
  },
  {
    id: 'army-major-general',
    name: 'Major General',
    nativeName: 'মেজর জেনারেল',
    force: 'Bangladesh Army',
    category: 'Commissioned Officer',
    hierarchyLevel: 3,
    insigniaDescription: 'Crossed sword and baton under two stars and the National Emblem.',
    insigniaType: 'general',
    starsCount: 2,
    hasShapla: true,
    hasSwords: true,
    generalResponsibilities: [
      'Commands an infantry division, major specialized logistics command, or directorate general.',
      'Responsible for multi-brigade tactical deployment, regional border security, and major training institutions (e.g. Commandant BMA).'
    ],
    careerLevel: 'Divisional Command',
    equivalentArmy: 'Major General',
    equivalentNavy: 'Rear Admiral',
    equivalentAirForce: 'Air Vice Marshal',
    associatedUniform: 'Service Dress / Digital Woodland Camouflage',
    source: 'Bangladesh Army Official Rank Structure (Public Domain)'
  },
  {
    id: 'army-brigadier-general',
    name: 'Brigadier General',
    nativeName: 'ব্রিগেডিয়ার জেনারেল',
    force: 'Bangladesh Army',
    category: 'Commissioned Officer',
    hierarchyLevel: 4,
    insigniaDescription: 'National Emblem (Shapla) over three stars in a triangular cluster.',
    insigniaType: 'general',
    starsCount: 3,
    hasShapla: true,
    hasSwords: false,
    generalResponsibilities: [
      'Commands an independent combat or infantry brigade (typically 3–4 battalions).',
      'Acts as Director of military directorates at Army Headquarters or sector commanders.'
    ],
    careerLevel: 'Brigade Command',
    equivalentArmy: 'Brigadier General',
    equivalentNavy: 'Commodore',
    equivalentAirForce: 'Air Commodore',
    associatedUniform: 'Service Dress / Camouflage BD-PAT',
    source: 'Bangladesh Army Official Rank Structure (Public Domain)'
  },
  {
    id: 'army-colonel',
    name: 'Colonel',
    nativeName: 'কর্নেল',
    force: 'Bangladesh Army',
    category: 'Commissioned Officer',
    hierarchyLevel: 5,
    insigniaDescription: 'National Emblem (Shapla) over two stars.',
    insigniaType: 'officer',
    starsCount: 2,
    hasShapla: true,
    hasSwords: false,
    generalResponsibilities: [
      'Senior staff officer at divisional headquarters, military hospital commander, or specialized unit commander.',
      'Leads regimental centers and specialized military schools.'
    ],
    careerLevel: 'Senior Regimental Staff',
    equivalentArmy: 'Colonel',
    equivalentNavy: 'Captain (Navy)',
    equivalentAirForce: 'Group Captain',
    associatedUniform: 'Service Dress Khaki / Combat Dress',
    source: 'Bangladesh Army Official Rank Structure (Public Domain)'
  },
  {
    id: 'army-lieutenant-colonel',
    name: 'Lieutenant Colonel',
    nativeName: 'লেফটেন্যান্ট কর্নেল',
    force: 'Bangladesh Army',
    category: 'Commissioned Officer',
    hierarchyLevel: 6,
    insigniaDescription: 'National Emblem (Shapla) over one star.',
    insigniaType: 'officer',
    starsCount: 1,
    hasShapla: true,
    hasSwords: false,
    generalResponsibilities: [
      'Commanding Officer (CO) of a frontline infantry battalion, armored regiment, artillery regiment, or engineer battalion.',
      'Commands UN Peacekeeping infantry contingents in international peace operations.'
    ],
    careerLevel: 'Battalion Commanding Officer',
    equivalentArmy: 'Lieutenant Colonel',
    equivalentNavy: 'Commander',
    equivalentAirForce: 'Wing Commander',
    associatedUniform: 'Combat Digital Camo / Office Dress',
    source: 'Bangladesh Army Official Rank Structure (Public Domain)'
  },
  {
    id: 'army-major',
    name: 'Major',
    nativeName: 'মেজর',
    force: 'Bangladesh Army',
    category: 'Commissioned Officer',
    hierarchyLevel: 7,
    insigniaDescription: 'National Emblem (Shapla) badge on shoulder epaulette.',
    insigniaType: 'officer',
    starsCount: 0,
    hasShapla: true,
    hasSwords: false,
    generalResponsibilities: [
      'Second-in-Command (2IC) of a combat battalion or commander of an infantry rifle company (Company Commander).',
      'Staff officer Grade-2 (GSO-2, DQMG) at brigade or divisional headquarters.'
    ],
    careerLevel: 'Field Grade Officer',
    equivalentArmy: 'Major',
    equivalentNavy: 'Lieutenant Commander',
    equivalentAirForce: 'Squadron Leader',
    associatedUniform: 'Combat Dress / Office Dress',
    source: 'Bangladesh Army Official Rank Structure (Public Domain)'
  },
  {
    id: 'army-captain',
    name: 'Captain',
    nativeName: 'ক্যাপ্টেন',
    force: 'Bangladesh Army',
    category: 'Commissioned Officer',
    hierarchyLevel: 8,
    insigniaDescription: 'Three five-pointed stars on shoulder epaulette.',
    insigniaType: 'officer',
    starsCount: 3,
    hasShapla: false,
    hasSwords: false,
    generalResponsibilities: [
      'Company Second-in-Command, Battalion Adjutant, or specialized company commander (mortar/anti-tank).',
      'Staff officer Grade-3 (GSO-3) at brigade headquarters or instructor at training centers.'
    ],
    careerLevel: 'Senior Subaltern / Junior Officer',
    equivalentArmy: 'Captain',
    equivalentNavy: 'Lieutenant (Navy)',
    equivalentAirForce: 'Flight Lieutenant',
    associatedUniform: 'Combat Dress / Service Dress',
    source: 'Bangladesh Army Official Rank Structure (Public Domain)'
  },
  {
    id: 'army-lieutenant',
    name: 'Lieutenant',
    nativeName: 'লেফটেন্যান্ট',
    force: 'Bangladesh Army',
    category: 'Commissioned Officer',
    hierarchyLevel: 9,
    insigniaDescription: 'Two five-pointed stars on shoulder epaulette.',
    insigniaType: 'officer',
    starsCount: 2,
    hasShapla: false,
    hasSwords: false,
    generalResponsibilities: [
      'Platoon commander leading 30–40 soldiers in tactical operations, field training, and border patrols.',
      'Tactical troop leadership and unit-level maintenance oversight.'
    ],
    careerLevel: 'Junior Commissioned Leader',
    equivalentArmy: 'Lieutenant',
    equivalentNavy: 'Sub Lieutenant',
    equivalentAirForce: 'Flying Officer',
    associatedUniform: 'Combat Digital Camo / Office Dress',
    source: 'Bangladesh Army Official Rank Structure (Public Domain)'
  },
  {
    id: 'army-second-lieutenant',
    name: 'Second Lieutenant',
    nativeName: 'সেকেন্ড লেফটেন্যান্ট',
    force: 'Bangladesh Army',
    category: 'Commissioned Officer',
    hierarchyLevel: 10,
    insigniaDescription: 'Single five-pointed star on shoulder epaulette.',
    insigniaType: 'officer',
    starsCount: 1,
    hasShapla: false,
    hasSwords: false,
    generalResponsibilities: [
      'Entry-level commissioned officer rank upon graduation from Bangladesh Military Academy (BMA).',
      'Appointed as platoon commander under mentorship of senior battalion officers.'
    ],
    careerLevel: 'Entry Commissioned Rank',
    equivalentArmy: 'Second Lieutenant',
    equivalentNavy: 'Acting Sub Lieutenant',
    equivalentAirForce: 'Pilot Officer',
    associatedUniform: 'Combat Dress / Ceremonial Dress',
    source: 'Bangladesh Army Official Rank Structure (Public Domain)'
  },

  // NAVY RANKS
  {
    id: 'navy-admiral',
    name: 'Admiral',
    nativeName: 'অ্যাডমিরাল',
    force: 'Bangladesh Navy',
    category: 'Commissioned Officer',
    hierarchyLevel: 1,
    insigniaDescription: 'National Emblem over crossed anchor and sword with four silver stars, and broad gold sleeve cuff lace.',
    insigniaType: 'general',
    starsCount: 4,
    hasShapla: true,
    hasAnchor: true,
    hasSwords: true,
    generalResponsibilities: [
      'Four-star naval rank held by the Chief of Naval Staff (CNS).',
      'Overall command, strategic sea-denial posture, and fleet development of Bangladesh Navy.',
      'Sovereign guardian of Bangladesh’s Bay of Bengal exclusive economic zone (EEZ).'
    ],
    careerLevel: 'Top Fleet Command',
    equivalentArmy: 'General',
    equivalentNavy: 'Admiral',
    equivalentAirForce: 'Air Chief Marshal',
    associatedUniform: 'Naval White Service Dress / Blue Mess Dress',
    source: 'Bangladesh Navy Official Structure (Public Domain)'
  },
  {
    id: 'navy-vice-admiral',
    name: 'Vice Admiral',
    nativeName: 'ভাইস অ্যাডমিরাল',
    force: 'Bangladesh Navy',
    category: 'Commissioned Officer',
    hierarchyLevel: 2,
    insigniaDescription: 'National Emblem over crossed anchor and sword with three stars and three gold sleeve bars.',
    insigniaType: 'general',
    starsCount: 3,
    hasShapla: true,
    hasAnchor: true,
    hasSwords: true,
    generalResponsibilities: [
      'Holds high-level strategic appointments such as Principal Staff Officer (PSO) Armed Forces Division or Assistant Chief of Naval Staff.',
      'Directs naval fleet doctrine, joint naval maneuvers, and multi-national maritime exercises.'
    ],
    careerLevel: 'Strategic Flag Officer',
    equivalentArmy: 'Lieutenant General',
    equivalentNavy: 'Vice Admiral',
    equivalentAirForce: 'Air Marshal',
    associatedUniform: 'Naval White Service Dress',
    source: 'Bangladesh Navy Official Structure (Public Domain)'
  },
  {
    id: 'navy-rear-admiral',
    name: 'Rear Admiral',
    nativeName: 'রিয়ার অ্যাডমিরাল',
    force: 'Bangladesh Navy',
    category: 'Commissioned Officer',
    hierarchyLevel: 3,
    insigniaDescription: 'Crossed anchor and sword under two stars and the National Emblem.',
    insigniaType: 'general',
    starsCount: 2,
    hasShapla: true,
    hasAnchor: true,
    hasSwords: true,
    generalResponsibilities: [
      'Commands major naval areas: Commander Chattogram Naval Area (COMCHIT), Commander Dhaka Naval Area (COMDHAKA), or Commander Khulna Naval Area (COMKHUL).',
      'Directs naval fleet readiness and naval dockyards.'
    ],
    careerLevel: 'Area Flag Officer',
    equivalentArmy: 'Major General',
    equivalentNavy: 'Rear Admiral',
    equivalentAirForce: 'Air Vice Marshal',
    associatedUniform: 'Naval White Service Dress / Working Blue',
    source: 'Bangladesh Navy Official Structure (Public Domain)'
  },
  {
    id: 'navy-commodore',
    name: 'Commodore',
    nativeName: 'কমোডর',
    force: 'Bangladesh Navy',
    category: 'Commissioned Officer',
    hierarchyLevel: 4,
    insigniaDescription: 'National Emblem over three stars on shoulder boards with one broad gold cuff band.',
    insigniaType: 'general',
    starsCount: 3,
    hasShapla: true,
    hasAnchor: true,
    hasSwords: false,
    generalResponsibilities: [
      'Commands major operational naval bases (e.g., BNS Issa Khan, BNS Titumir) or frigate flotillas.',
      'Senior directors at Naval Headquarters (Director of Naval Operations, Intelligence, or Materiel).'
    ],
    careerLevel: 'Senior Flag / Base Command',
    equivalentArmy: 'Brigadier General',
    equivalentNavy: 'Commodore',
    equivalentAirForce: 'Air Commodore',
    associatedUniform: 'Naval White Service Dress',
    source: 'Bangladesh Navy Official Structure (Public Domain)'
  },
  {
    id: 'navy-captain',
    name: 'Captain (Navy)',
    nativeName: 'ক্যাপ্টেন (নৌবাহিনী)',
    force: 'Bangladesh Navy',
    category: 'Commissioned Officer',
    hierarchyLevel: 5,
    insigniaDescription: 'Four medium gold lace rings on shoulder boards and sleeves.',
    insigniaType: 'officer',
    stripesCount: 4,
    generalResponsibilities: [
      'Commands major surface capital ships (Guided Missile Frigates such as BNS Bangabandhu, BNS Somudra Joy).',
      'Supervises major naval training institutes such as the Bangladesh Naval Academy (BNA).'
    ],
    careerLevel: 'Capital Ship Command',
    equivalentArmy: 'Colonel',
    equivalentNavy: 'Captain (Navy)',
    equivalentAirForce: 'Group Captain',
    associatedUniform: 'Naval White Service Dress / Working Blue',
    source: 'Bangladesh Navy Official Structure (Public Domain)'
  },
  {
    id: 'navy-commander',
    name: 'Commander',
    nativeName: 'কমান্ডার',
    force: 'Bangladesh Navy',
    category: 'Commissioned Officer',
    hierarchyLevel: 6,
    insigniaDescription: 'Three medium gold lace rings on shoulder boards and sleeves.',
    insigniaType: 'officer',
    stripesCount: 3,
    generalResponsibilities: [
      'Commanding Officer of major corvettes, offshore patrol vessels, or submarine units.',
      'Executive Officer (XO) of major frigates or senior staff officer at naval headquarters.'
    ],
    careerLevel: 'Vessel Command / Senior Staff',
    equivalentArmy: 'Lieutenant Colonel',
    equivalentNavy: 'Commander',
    equivalentAirForce: 'Wing Commander',
    associatedUniform: 'Naval Working Blue / White Service Dress',
    source: 'Bangladesh Navy Official Structure (Public Domain)'
  },
  {
    id: 'navy-lieutenant-commander',
    name: 'Lieutenant Commander',
    nativeName: 'লেফটেন্যান্ট কমান্ডার',
    force: 'Bangladesh Navy',
    category: 'Commissioned Officer',
    hierarchyLevel: 7,
    insigniaDescription: 'Two medium gold rings with one thin ring between them.',
    insigniaType: 'officer',
    stripesCount: 3,
    generalResponsibilities: [
      'Commanding Officer of fast patrol craft, missile boats, or mine countermeasure vessels.',
      'Departmental head (Principal Warfare Officer, Marine Engineer Officer) aboard frigates.'
    ],
    careerLevel: 'Departmental Head / Vessel CO',
    equivalentArmy: 'Major',
    equivalentNavy: 'Lieutenant Commander',
    equivalentAirForce: 'Squadron Leader',
    associatedUniform: 'Naval Working Blue / White Dress',
    source: 'Bangladesh Navy Official Structure (Public Domain)'
  },

  // AIR FORCE RANKS
  {
    id: 'air-chief-marshal',
    name: 'Air Chief Marshal',
    nativeName: 'এয়ার চিফ মার্শাল',
    force: 'Bangladesh Air Force',
    category: 'Commissioned Officer',
    hierarchyLevel: 1,
    insigniaDescription: 'Eagle emblem over crossed swords and four stars on shoulder boards with broad gold band and three thin sleeve rings.',
    insigniaType: 'general',
    starsCount: 4,
    hasEagle: true,
    hasSwords: true,
    generalResponsibilities: [
      'Highest rank in the air force, held by the Chief of Air Staff (COAS).',
      'Directs air defense operations, combat readiness of fighter wings, radar grids, and strategic aerospace posture.'
    ],
    careerLevel: 'Top Air Command',
    equivalentArmy: 'General',
    equivalentNavy: 'Admiral',
    equivalentAirForce: 'Air Chief Marshal',
    associatedUniform: 'BAF Service Dress Blue / Ceremonial Tunic',
    source: 'Bangladesh Air Force Official Structure (Public Domain)'
  },
  {
    id: 'air-marshal',
    name: 'Air Marshal',
    nativeName: 'এয়ার মার্শাল',
    force: 'Bangladesh Air Force',
    category: 'Commissioned Officer',
    hierarchyLevel: 2,
    insigniaDescription: 'Eagle emblem over crossed swords and three stars with broad gold band and two thin sleeve rings.',
    insigniaType: 'general',
    starsCount: 3,
    hasEagle: true,
    hasSwords: true,
    generalResponsibilities: [
      'Holds highest strategic staff appointments in Armed Forces Division or Air Headquarters (Assistant Chief of Air Staff).',
      'Oversees air operational doctrine, flight safety inspections, and national aerospace developments.'
    ],
    careerLevel: 'Strategic Air Staff',
    equivalentArmy: 'Lieutenant General',
    equivalentNavy: 'Vice Admiral',
    equivalentAirForce: 'Air Marshal',
    associatedUniform: 'BAF Service Dress Blue',
    source: 'Bangladesh Air Force Official Structure (Public Domain)'
  },
  {
    id: 'air-vice-marshal',
    name: 'Air Vice Marshal',
    nativeName: 'এয়ার ভাইস মার্শাল',
    force: 'Bangladesh Air Force',
    category: 'Commissioned Officer',
    hierarchyLevel: 3,
    insigniaDescription: 'Eagle emblem over crossed swords and two stars with broad gold band and one thin sleeve ring.',
    insigniaType: 'general',
    starsCount: 2,
    hasEagle: true,
    hasSwords: true,
    generalResponsibilities: [
      'Air Officer Commanding (AOC) of major operational bases (e.g., BAF Base Bangabandhu, BAF Base Zahurul Haque).',
      'Commandant of Bangladesh Air Force Academy (BAFA) or Director of Air Operations.'
    ],
    careerLevel: 'Air Base Command / AOC',
    equivalentArmy: 'Major General',
    equivalentNavy: 'Rear Admiral',
    equivalentAirForce: 'Air Vice Marshal',
    associatedUniform: 'BAF Service Dress Blue / Flight Suit',
    source: 'Bangladesh Air Force Official Structure (Public Domain)'
  },
  {
    id: 'air-commodore',
    name: 'Air Commodore',
    nativeName: 'এয়ার কমোডর',
    force: 'Bangladesh Air Force',
    category: 'Commissioned Officer',
    hierarchyLevel: 4,
    insigniaDescription: 'Eagle emblem over three stars with one broad sleeve band.',
    insigniaType: 'general',
    starsCount: 3,
    hasEagle: true,
    hasSwords: false,
    generalResponsibilities: [
      'Commands an operational air wing (Fighter Wing, Transport Wing, or Maintenance Wing).',
      'Senior directors at Air Headquarters (Director of Air Training, Air Defense, Intelligence).'
    ],
    careerLevel: 'Wing Command',
    equivalentArmy: 'Brigadier General',
    equivalentNavy: 'Commodore',
    equivalentAirForce: 'Air Commodore',
    associatedUniform: 'BAF Service Dress Blue / Flight Suit',
    source: 'Bangladesh Air Force Official Structure (Public Domain)'
  },
  {
    id: 'group-captain',
    name: 'Group Captain',
    nativeName: 'গ্রুপ ক্যাপ্টেন',
    force: 'Bangladesh Air Force',
    category: 'Commissioned Officer',
    hierarchyLevel: 5,
    insigniaDescription: 'Four light blue rings between black bands on sleeves and shoulder boards.',
    insigniaType: 'officer',
    stripesCount: 4,
    generalResponsibilities: [
      'Officer Commanding of operational fighter squadrons, flying training wings, or base maintenance depots.',
      'Senior flight instructor and test pilot evaluations.'
    ],
    careerLevel: 'Senior Squadron & Base Staff',
    equivalentArmy: 'Colonel',
    equivalentNavy: 'Captain (Navy)',
    equivalentAirForce: 'Group Captain',
    associatedUniform: 'BAF Service Dress Blue / Flight Suit',
    source: 'Bangladesh Air Force Official Structure (Public Domain)'
  },
  {
    id: 'wing-commander',
    name: 'Wing Commander',
    nativeName: 'উইং কমান্ডার',
    force: 'Bangladesh Air Force',
    category: 'Commissioned Officer',
    hierarchyLevel: 6,
    insigniaDescription: 'Three light blue rings between black bands on sleeves and shoulder boards.',
    insigniaType: 'officer',
    stripesCount: 3,
    generalResponsibilities: [
      'Commanding Officer of an active fighter squadron (e.g., MiG-29 Squadron or F-7 Squadron), transport squadron, or radar squadron.',
      'Oversees air tactical maneuvers, pilot readiness, and weapon system evaluations.'
    ],
    careerLevel: 'Squadron Commanding Officer',
    equivalentArmy: 'Lieutenant Colonel',
    equivalentNavy: 'Commander',
    equivalentAirForce: 'Wing Commander',
    associatedUniform: 'Nomex Flight Suit / BAF Service Dress Blue',
    source: 'Bangladesh Air Force Official Structure (Public Domain)'
  },
  {
    id: 'squadron-leader',
    name: 'Squadron Leader',
    nativeName: 'স্কোয়াড্রন লিডার',
    force: 'Bangladesh Air Force',
    category: 'Commissioned Officer',
    hierarchyLevel: 7,
    insigniaDescription: 'Two light blue rings with one thin ring between them.',
    insigniaType: 'officer',
    stripesCount: 3,
    generalResponsibilities: [
      'Flight Commander leading air combat sections, senior combat pilot, or senior maintenance officer.',
      'Directs tactical interception missions and advanced operational conversions.'
    ],
    careerLevel: 'Flight Commander / Senior Pilot',
    equivalentArmy: 'Major',
    equivalentNavy: 'Lieutenant Commander',
    equivalentAirForce: 'Squadron Leader',
    associatedUniform: 'Nomex Flight Suit / Office Dress',
    source: 'Bangladesh Air Force Official Structure (Public Domain)'
  },

  // JCO / NCO / OTHER RANKS SAMPLES (VERIFIED EQUIVALENTS)
  {
    id: 'army-master-warrant-officer',
    name: 'Master Warrant Officer',
    nativeName: 'মাস্টার ওয়ারেন্ট অফিসার',
    force: 'Bangladesh Army',
    category: 'Junior Commissioned Officer',
    hierarchyLevel: 11,
    insigniaDescription: 'National Emblem (Shapla) within a golden laurel wreath.',
    insigniaType: 'jco',
    hasShapla: true,
    generalResponsibilities: [
      'Highest Junior Commissioned Officer (JCO) appointment in battalion formations.',
      'Advises battalion commander on troop discipline, living conditions, morale, and field drill standards.'
    ],
    careerLevel: 'Senior JCO',
    equivalentArmy: 'Master Warrant Officer',
    equivalentNavy: 'Master Chief Petty Officer',
    equivalentAirForce: 'Master Warrant Officer',
    associatedUniform: 'Combat Digital Camo / Office Dress',
    source: 'Bangladesh Armed Forces Gazette (Public Domain)'
  },
  {
    id: 'army-sergeant',
    name: 'Sergeant',
    nativeName: 'সার্জেন্ট',
    force: 'Bangladesh Army',
    category: 'Non-Commissioned Officer',
    hierarchyLevel: 14,
    insigniaDescription: 'Three downward-pointing chevrons worn on right sleeve.',
    insigniaType: 'nco',
    stripesCount: 3,
    generalResponsibilities: [
      'Platoon Sergeant directly managing platoon administration, ammunition handling, weapon care, and field battle drill.',
      'Second-in-command to platoon commanders in the field.'
    ],
    careerLevel: 'Senior NCO',
    equivalentArmy: 'Sergeant',
    equivalentNavy: 'Petty Officer',
    equivalentAirForce: 'Sergeant',
    associatedUniform: 'Combat Dress / Daily Service Dress',
    source: 'Bangladesh Armed Forces Gazette (Public Domain)'
  },
  {
    id: 'army-sainik',
    name: 'Sainik (Soldier)',
    nativeName: 'সৈনিক',
    force: 'Bangladesh Army',
    category: 'Other Rank',
    hierarchyLevel: 17,
    insigniaDescription: 'Plain shoulder title or regimental shoulder brass title without rank device.',
    insigniaType: 'soldier',
    generalResponsibilities: [
      'Foundational soldier in infantry rifle sections, armor crew, artillery gun detachment, or engineer teams.',
      'Executes tactical fire and movement, border defense patrols, and humanitarian mission tasks.'
    ],
    careerLevel: 'Soldier / Private Equivalent',
    equivalentArmy: 'Sainik',
    equivalentNavy: 'Ordinary Seaman',
    equivalentAirForce: 'Aircraftman (AC)',
    associatedUniform: 'Combat Digital Woodland Camouflage (BD-PAT)',
    source: 'Bangladesh Armed Forces Gazette (Public Domain)'
  }
];

export const POSTS_ROLES_DATA: PostRole[] = [
  {
    id: 'post-fighter-pilot',
    title: 'Multirole Fighter Interceptor Pilot',
    force: 'Bangladesh Air Force',
    department: 'Flying Branch (Air Defense Wing)',
    rankEligibility: 'Flight Lieutenant to Wing Commander',
    description: 'Pilots supersonic multirole combat aircraft such as the MiG-29B or Chengdu F-7BGI to conduct sovereign air sovereignty patrols, rapid interception of unauthorized airspace incursions, and tactical strike missions.',
    keyDuties: [
      'Maintain 24/7 Quick Reaction Alert (QRA) scramble readiness at operational air bases.',
      'Execute high-G air combat maneuvers, beyond-visual-range missile engagements, and precision close air support.',
      'Participate in joint combined-arms maneuvers with army armored formations and naval surface flotillas.',
      'Conduct tactical flight debriefings and electronic warfare countermeasure assessments.'
    ],
    requiredSkills: [
      'Supersonic jet rating & high-G physiological tolerance',
      'Avionics, head-up display (HUD), and multi-mode fire control radar operations',
      'Tactical instrument flying & all-weather night interception',
      'Rapid situational awareness and split-second tactical decision making'
    ],
    relatedUniform: 'uniform-baf-flight-suit',
    relatedEquipment: ['equip-mig-29', 'equip-f7bgi'],
    relatedBadges: ['badge-baf-pilot-wings'],
    source: 'Bangladesh Air Force Directorate of Air Training (Public Domain)'
  },
  {
    id: 'post-frigate-commander',
    title: 'Guided Missile Frigate Commanding Officer',
    force: 'Bangladesh Navy',
    department: 'Surface Warfare Operations',
    rankEligibility: 'Captain (Navy) / Commander',
    description: 'Commands frontline naval surface combatants safeguarding national sovereignty throughout the Bay of Bengal, escorting sea lanes of communication (SLOC), and enforcing national maritime law in the Exclusive Economic Zone.',
    keyDuties: [
      'Assume sole commanding responsibility for warship safety, mission execution, navigation, and crew operational readiness.',
      'Direct surface-to-surface anti-ship missile defense, anti-submarine warfare (ASW) sonar tactics, and naval gunnery.',
      'Coordinate coordinated maritime patrols (CORPAT) with regional partner navies and conduct UN maritime task force missions.',
      'Direct maritime search and rescue operations during severe Bay of Bengal cyclones.'
    ],
    requiredSkills: [
      'Principal Warfare Officer (PWO) qualification & marine navigation mastery',
      'Tactical command of surface-to-air and anti-ship missile weapon suites',
      'Damage control, firefighting, and shipboard crisis management',
      'Maritime law, UNCLOS enforcement, and international naval signaling'
    ],
    relatedUniform: 'uniform-navy-working-blue',
    relatedEquipment: ['equip-bns-shadhinota', 'equip-bns-bangabandhu'],
    relatedBadges: ['badge-staff-college-psc'],
    source: 'Bangladesh Navy Naval Operations Manual (Public Domain)'
  },
  {
    id: 'post-para-commando',
    title: 'Para Commando Brigade Operator',
    force: 'Bangladesh Army',
    department: 'Special Operations (Para Commando Brigade)',
    rankEligibility: 'Captain to Major / Specially Qualified NCOs',
    description: 'Serves in the elite 1st and 2nd Para Commando Brigades (based in Sylhet), trained for airborne insertion, direct action counter-terrorism raids, long-range reconnaissance patrols, and deep hostage rescue operations.',
    keyDuties: [
      'Execute military free-fall (HALO/HAHO) and combat static line parachute insertions.',
      'Conduct surgical counter-terrorist assault operations in urban and dense jungle environments.',
      'Operate advanced sniper systems, close-quarter battle (CQB) weapons, and silent breaching equipment.',
      'Deploy on high-risk UN mission rapid deployment teams in complex operational theatres.'
    ],
    requiredSkills: [
      'Combat airborne parachutist rating & combat diver cross-qualification',
      'Advanced tactical sniper, CQB, and hand-to-hand combat proficiency',
      'Survival, Evasion, Resistance, and Escape (SERE) in hostile terrain',
      'High physical endurance, night assault tactics, and covert communications'
    ],
    relatedUniform: 'uniform-army-combat-camo',
    relatedEquipment: ['equip-type56-rifle', 'equip-otokar-cobra'],
    relatedBadges: ['badge-army-paratrooper-wings'],
    source: 'Bangladesh Army Special Forces Documentation (Public Domain)'
  },
  {
    id: 'post-medical-officer',
    title: 'Armed Forces Medical Corps Surgeon',
    force: 'Bangladesh Army',
    department: 'Armed Forces Medical Services (AFMS)',
    rankEligibility: 'Captain to Colonel',
    description: 'Provides trauma triage, emergency surgery, hospital administration, and field hospital deployment for military personnel, families, and civilians during natural disasters and UN peacekeeping clinics.',
    keyDuties: [
      'Manage battlefield casualty reception stations and forward surgical facilities during training or crisis.',
      'Provide tertiary healthcare and advanced surgical care at Combined Military Hospitals (CMH Dhaka and regional CMHs).',
      'Lead Level-II and Level-III field hospitals on UN peacekeeping missions worldwide.',
      'Deliver medical disaster relief to populations affected by floods, cyclones, or humanitarian emergencies.'
    ],
    requiredSkills: [
      'MBBS and post-graduate specialist clinical degrees (FCPS/MS/FRCS)',
      'Advanced Trauma Life Support (ATLS) and disaster medicine management',
      'Field medical logistics, telemedicine, and preventative military health',
      'Humanitarian triage under austere operational conditions'
    ],
    relatedUniform: 'uniform-army-service-dress',
    relatedEquipment: ['equip-protective-gear'],
    relatedBadges: ['badge-service-medal'],
    source: 'Armed Forces Medical College & DGMS Public Bulletins'
  },
  {
    id: 'post-signals-cyber',
    title: 'Signals & Cyber Defense Specialist',
    force: 'Bangladesh Army',
    department: 'Corps of Signals / Cyber Warfare Center',
    rankEligibility: 'Lieutenant to Major / Specialist Warrant Officers',
    description: 'Engineers, operates, and secures tactical battle-management communications, satellite uplinks, electronic countermeasures, and military network defenses against adversary cyber disruption.',
    keyDuties: [
      'Operate frequency-hopping tactical radios, encrypted satellite data links, and battlefield optical networks.',
      'Monitor and harden military command-and-control networks against cyber intrusion and electronic jamming.',
      'Deploy mobile communication nodes in field command centers during divisional military exercises.',
      'Ensure secure communications interoperability for UN peacekeeping mission forces.'
    ],
    requiredSkills: [
      'Electronic engineering, cryptographic protocol implementation, and network security',
      'Tactical VHF/UHF/HF radio operations and tropospheric scatter systems',
      'Signals intelligence (SIGINT) analysis and spectrum monitoring',
      'Incident response and cyber threat hunting'
    ],
    relatedUniform: 'uniform-army-combat-camo',
    relatedEquipment: ['equip-radar-sensor'],
    relatedBadges: ['badge-service-medal'],
    source: 'Bangladesh Army Corps of Signals Public Overview'
  },
  {
    id: 'post-swads-operator',
    title: 'SWADS Combat Diver & Special Operator',
    force: 'Bangladesh Navy',
    department: 'Special Warfare Diving and Salvage (SWADS)',
    rankEligibility: 'Sub Lieutenant to Lieutenant Commander / Senior Petty Officers',
    description: 'Elite special forces operator of the Bangladesh Navy trained for riverine and maritime counter-terrorism, amphibious beachhead reconnaissance, shipboarding VBSS operations, and combat demolition.',
    keyDuties: [
      'Conduct combat diving with closed-circuit rebreathers for covert underwater sabotage or explosive clearance.',
      'Execute Visit, Board, Search, and Seizure (VBSS) on suspect merchant vessels or hijacked ships.',
      'Operate high-speed rigid-hull inflatable boats (RHIBs) and fast assault craft in littoral waters.',
      'Lead maritime counter-piracy interventions and amphibious reconnaissance.'
    ],
    requiredSkills: [
      'Military closed-circuit rebreather diving and deep salvage operations',
      'High-speed boat handling in rough sea conditions',
      'Tactical maritime marksmanship, explosive breaching, and rope boarding',
      'Amphibious stealth insertions'
    ],
    relatedUniform: 'uniform-navy-working-blue',
    relatedEquipment: ['equip-protective-gear', 'equip-type56-rifle'],
    relatedBadges: ['badge-swads-pin'],
    source: 'Bangladesh Navy Special Forces Public Documentation'
  }
];

export const UNIFORMS_DATA: UniformItem[] = [
  {
    id: 'uniform-army-combat-camo',
    name: 'Army Combat Digital Woodland Camouflage (BD-PAT)',
    force: 'Bangladesh Army',
    category: 'Combat & Field Dress',
    image: '/src/assets/images/force_bangladesh_army_1793808499613.jpg',
    colors: ['Deep Forest Green', 'Dark Olive', 'Earth Brown', 'Muted Charcoal'],
    colorHexes: ['#1c3826', '#3f4e2f', '#4a3728', '#1a201c'],
    purpose: 'Standard operational combat uniform engineered for tactical concealment across Bangladesh\'s dense riverine, agricultural, and forested terrain as well as international UN mission environments.',
    wearOccasions: [
      'Field exercises, combat deployments, and tactical base security duty.',
      'United Nations peacekeeping operations abroad (worn with UN blue beret and brassard).',
      'Disaster relief and emergency humanitarian response operations.'
    ],
    associatedRanks: 'All Ranks (Commissioned Officers, JCOs, and Sainiks)',
    insigniaAndAccessories: [
      'Cloth subdued rank slides on chest tab or epaulettes.',
      'National flag patch on upper right sleeve.',
      'Regimental formation patch on left arm.',
      'Tactical combat boots and digital camouflage cap or Kevlar ballistic helmet.'
    ],
    description: 'Constructed from ripstop poly-cotton fabric designed for high durability and breathability in tropical heat and humidity. Features slanted chest pockets, reinforced knee and elbow panels, and hook-and-loop closures.',
    source: 'Bangladesh Army Dress Regulations (Public Domain)'
  },
  {
    id: 'uniform-army-service-dress',
    name: 'Army Service Dress (Khaki Office Dress)',
    force: 'Bangladesh Army',
    category: 'Service / Office Dress',
    image: '/src/assets/images/tactical_bd_hero_defense_1793808498280.jpg',
    colors: ['Khaki / Sandstone', 'Bottle Green', 'Polished Brass'],
    colorHexes: ['#a3937b', '#133e29', '#d4af37'],
    purpose: 'Everyday working dress for officers and senior personnel conducting administrative and command duties in headquarters, cantonments, and military academies.',
    wearOccasions: [
      'Daily staff duties in Army Headquarters, divisional and brigade headquarters.',
      'Indoor conferences, office inspections, and regular military briefings.',
      'Non-ceremonial official military functions and visits.'
    ],
    associatedRanks: 'Officers and Junior Commissioned Officers (JCOs)',
    insigniaAndAccessories: [
      'Metal rank insignia on shoulder straps.',
      'Regimental collar badges (gorget patches for Brigadier Generals and above).',
      'Name tag, medal ribbon bars above left breast pocket, and qualification wings.',
      'Bottle green beret with gold Army crest or peaked cap.'
    ],
    description: 'Classic tailored uniform featuring pressed khaki trousers and short-sleeved open-collar shirt in summer or long-sleeved shirt with tie and olive service tunic in winter months.',
    source: 'Bangladesh Army Dress Regulations (Public Domain)'
  },
  {
    id: 'uniform-navy-service-white',
    name: 'Navy White Service Dress',
    force: 'Bangladesh Navy',
    category: 'Service / Office Dress',
    image: '/src/assets/images/force_bangladesh_navy_1793808501000.jpg',
    colors: ['Pure White', 'Navy Blue', 'Gilded Gold'],
    colorHexes: ['#f8fafc', '#0f2942', '#d4af37'],
    purpose: 'Traditional naval summer service dress used for formal ceremonies, official diplomatic port calls, inspections, and high-level naval meetings.',
    wearOccasions: [
      'Ceremonial parades, fleet reviews, and national day celebrations.',
      'Diplomatic foreign port calls and international naval symposiums.',
      'Official navy commissionings and change-of-command ceremonies.'
    ],
    associatedRanks: 'Commissioned Naval Officers and Midshipmen',
    insigniaAndAccessories: [
      'Hard shoulder boards with embroidered gold lace rings and anchor crest.',
      'White peaked cap with gold wire naval officer crest.',
      'Medal ribbons, naval aviator/submarine brevet, and sword belt for ceremonial duties.',
      'White dress shoes and white trousers.'
    ],
    description: 'Iconic naval service attire renowned worldwide for elegance. Features a high mandarin collar on white tunic for ceremonial dress, or open collar white shirt with hard shoulder boards for summer working dress.',
    source: 'Bangladesh Navy Uniform Regulations (Public Domain)'
  },
  {
    id: 'uniform-navy-working-blue',
    name: 'Navy Shipboard Working Blue Dress',
    force: 'Bangladesh Navy',
    category: 'Naval Working Dress',
    image: '/src/assets/images/force_bangladesh_navy_1793808501000.jpg',
    colors: ['Deep Navy Blue', 'Charcoal Slate', 'Silver Accent'],
    colorHexes: ['#0a192f', '#243242', '#94a3b8'],
    purpose: 'Engineered for shipboard daily maintenance, watchstanding underway at sea, dockyard repairs, and practical operational conditions on surface combatants.',
    wearOccasions: [
      'Routine shipboard watches in bridge, engine control room, and combat information center (CIC).',
      'Harbor training, maritime interdiction drills, and deck maintenance.'
    ],
    associatedRanks: 'All Naval Ranks (Officers and Sailors)',
    insigniaAndAccessories: [
      'Embroidered slip-on shoulder rank slides.',
      'Embroidered warship name cap (e.g. BNS BANGABANDHU) or navy beret.',
      'Slip-resistant steel-toed naval deck boots.'
    ],
    description: 'Heavy-duty cotton-blend uniform in navy blue with flame-retardant properties suitable for shipboard fire and damage control scenarios.',
    source: 'Bangladesh Navy Uniform Regulations (Public Domain)'
  },
  {
    id: 'uniform-baf-flight-suit',
    name: 'Air Force Nomex Flight Suit (Tactical Flying Overall)',
    force: 'Bangladesh Air Force',
    category: 'Specialist / Flight Suit',
    image: '/src/assets/images/force_bangladesh_air_force_1793808500274.jpg',
    colors: ['Sage Green / Olive Nomex', 'Air Force Blue', 'Subdued Gold'],
    colorHexes: ['#4b5320', '#1e3a8a', '#c5a059'],
    purpose: 'Specialized one-piece flight garment engineered to protect aircrew from flash fires, cockpit thermal conditions, and cockpit friction while providing rapid access to emergency checklists and survival equipment.',
    wearOccasions: [
      'Combat sorties, training flights, quick reaction alert standby, and air combat debriefings.',
      'Tactical helicopter rescue missions and maritime search and rescue flights.'
    ],
    associatedRanks: 'Pilots, Flight Engineers, Navigators, and Aircrew Officers',
    insigniaAndAccessories: [
      'Embroidered leather or fabric pilot wings patch on left chest.',
      'Squadron crest emblem on right chest.',
      'National flag on left shoulder and aircraft silhouette patch on right arm.',
      'Subdued rank slides on shoulders, anti-G suit over lower body, and flight helmet with oxygen mask.'
    ],
    description: 'Constructed from heat and flame-resistant Nomex aramid fiber with zippered utility pockets on calves, thighs, and sleeves configured for tight cockpit clearances.',
    source: 'Bangladesh Air Force Flight Operations Standard (Public Domain)'
  }
];

export const BADGES_DATA: BadgeItem[] = [
  {
    id: 'badge-bir-sreshtho',
    name: 'Bir Sreshtho (The Most Valiant Hero)',
    nativeName: 'বীরশ্রেষ্ঠ',
    force: 'Joint / Armed Forces',
    category: 'National Gallantry Decoration',
    meaning: 'The highest military gallantry award in Bangladesh, conferred posthumously to the seven immortal martyrs of the 1971 Liberation War for supreme valor in the face of the enemy.',
    eligibility: 'Supreme gallantry in the presence of the enemy (conferred to Captain Mohiuddin Jahangir, Lance Naik Munshi Abdur Rouf, Sepahi Hamidur Rahman, Sepahi Mostafa Kamal, BRSM Ruhul Amin, Flight Lieutenant Matiur Rahman, and Lance Naik Nur Mohammad Sheikh).',
    ribbonColors: ['#800020', '#228B22'], // Burgundy with green edges
    iconType: 'star',
    description: 'Cast in silver and gold, depicting an eight-pointed radiant star with the National Emblem Shapla surrounded by ears of rice.',
    source: 'Bangladesh Gallantry Awards Official Roll (Public Domain)'
  },
  {
    id: 'badge-army-paratrooper-wings',
    name: 'Army Airborne / Paratrooper Wings',
    force: 'Bangladesh Army',
    category: 'Qualification & Specialist',
    meaning: 'Signifies completion of the rigorous military parachutist course at the School of Infantry and Tactics (SI&T) Special Warfare Wing, qualifying the wearer for combat airdrop operations.',
    eligibility: 'Awarded to officers and soldiers who complete requisite military static line parachute jumps from transport aircraft at altitude.',
    iconType: 'parachute',
    description: 'An open white parachute canopy flanked by two stylized golden wings on a dark olive or black backing, worn above the right breast pocket.',
    relatedRole: 'post-para-commando',
    source: 'School of Infantry and Tactics (SI&T) Special Warfare Wing (Public Domain)'
  },
  {
    id: 'badge-baf-pilot-wings',
    name: 'Air Force Military Pilot Flying Brevet',
    force: 'Bangladesh Air Force',
    category: 'Qualification & Specialist',
    meaning: 'The coveted flying wings awarded to officer cadets upon graduating from flying training at the Bangladesh Air Force Academy and completing basic conversion.',
    eligibility: 'Successful completion of primary, basic, and advanced flying training stages with minimum required solo combat hours.',
    iconType: 'wings',
    description: 'Features a central circular national red-and-green roundel topped by the National Shapla, flanked by expansive outstretched golden wings, worn above left pocket.',
    relatedRole: 'post-fighter-pilot',
    source: 'Bangladesh Air Force Flying Training School (Public Domain)'
  },
  {
    id: 'badge-navy-dolphin',
    name: 'Navy Submarine Dolphin Insignia',
    force: 'Bangladesh Navy',
    category: 'Qualification & Specialist',
    meaning: 'Awarded to naval officers and sailors qualified in submarine warfare who have passed exhaustive submarine qualification boards and deep dive exercises.',
    eligibility: 'Successful completion of submarine school curriculum and sea qualification aboard BNS Nabajatra or BNS Joyjatra.',
    iconType: 'submarine',
    description: 'Depicts a submarine silhouette flanked by two stylized dolphins facing inward, representing maritime vigilance in the underwater domain.',
    source: 'Bangladesh Navy Submarine Command (Public Domain)'
  },
  {
    id: 'badge-swads-pin',
    name: 'SWADS Special Warfare Qualification Pin',
    force: 'Bangladesh Navy',
    category: 'Qualification & Specialist',
    meaning: 'Insignia of the elite Special Warfare Diving and Salvage operators, marking mastery of combat diving, underwater sabotage, and VBSS tactics.',
    eligibility: 'Graduation from the punishing SWADS selection course, combat swimmer training, and tactical shooting phases.',
    iconType: 'cross',
    description: 'Features crossed combat daggers, an anchor, and a diving mask silhouette against a golden shield.',
    relatedRole: 'post-swads-operator',
    source: 'Bangladesh Navy Special Forces Wing (Public Domain)'
  },
  {
    id: 'badge-staff-college-psc',
    name: 'Staff College Symbol (psc)',
    force: 'Joint / Armed Forces',
    category: 'Service Badge',
    meaning: 'Indicates the officer is a graduate of the prestigious Defence Services Command and Staff College (DSCSC) Mirpur, authorized to append "psc" (passed staff college) to their official title.',
    eligibility: 'Graduation from the one-year Joint Services Command and Staff Course covering operational planning, campaign design, and strategic defense policy.',
    iconType: 'crest',
    description: 'A joint service emblem featuring crossed swords, anchor, and eagle wings beneath an open book of wisdom.',
    source: 'Defence Services Command and Staff College (DSCSC) Mirpur'
  }
];

export const EQUIPMENT_DATA: EquipmentItem[] = [
  {
    id: 'equip-durjoy-tank',
    name: 'Type 59G (Durjoy) Main Battle Tank',
    category: 'Armored Vehicles & Tanks',
    force: 'Bangladesh Army',
    image: '/src/assets/images/force_bangladesh_army_1793808499613.jpg',
    description: 'Major modernization of the Type 59 chassis executed by the Bangladesh Army 902 Central Workshop with state-of-the-art 125mm smoothbore gun, explosive reactive armor (ERA), digital fire control system, and thermal night sights.',
    generalPurpose: 'Direct armored assault, breakthrough combat, mobile defense, and anti-tank warfare.',
    manufacturerOrigin: 'Upgraded locally at Bangladesh Army 902 Central Workshop (Norinco partnership)',
    specifications: {
      'Main Armament': '125mm Smoothbore Gun with auto-loader (capable of firing APFSDS & ATGMs)',
      'Secondary Weapons': '12.7mm Anti-Aircraft Machine Gun & 7.62mm coaxial MG',
      'Protection': 'Welded turret armor with Explosive Reactive Armor (ERA) panels',
      'Engine Power': '730 hp turbocharged diesel engine',
      'Combat Weight': '~40 metric tons',
      'Fire Control': 'Computerized digital FCS with laser rangefinder and independent thermal commander sights'
    },
    relatedRole: 'post-para-commando',
    publicVerificationStatus: 'In active service across Bangladesh Army armored regiments (IISS Military Balance documented)',
    source: 'IISS The Military Balance & Bangladesh Army Armoured Corps Review'
  },
  {
    id: 'equip-bns-shadhinota',
    name: 'BNS Shadhinota (Type 056 Corvette)',
    category: 'Naval Fleet & Surface Vessels',
    force: 'Bangladesh Navy',
    image: '/src/assets/images/force_bangladesh_navy_1793808501000.jpg',
    description: 'Modern stealth guided-missile corvette (Pennant F111) constructed for littoral patrol, surface strike, anti-air defense, and Exclusive Economic Zone sovereignty patrols in the Bay of Bengal.',
    generalPurpose: 'Anti-surface warfare (ASuW), naval air defense, maritime interdiction, and EEZ resource enforcement.',
    manufacturerOrigin: 'Wuchang Shipyard, China (Custom built for Bangladesh Navy)',
    specifications: {
      'Displacement': '1,300 metric tons full load',
      'Length': '90.1 meters',
      'Beam': '11.14 meters',
      'Top Speed': '25 knots (~46 km/h)',
      'Primary Missiles': '4 × C-802A Subsonic Anti-Ship Missiles (180 km range)',
      'Air Defense': '8-cell FL-3000N surface-to-air missile launcher',
      'Main Gun': '76mm H/PJ-26 dual-purpose naval gun',
      'Aviation Facility': 'Helicopter deck supporting Harbin Z-9C / AW109 naval helicopters'
    },
    relatedRole: 'post-frigate-commander',
    publicVerificationStatus: 'Commissioned on 19 March 2016; active frontline surface combatant',
    source: 'Bangladesh Navy Commissioning Records & Jane\'s Fighting Ships'
  },
  {
    id: 'equip-mig-29',
    name: 'Mikoyan MiG-29B / UB Fulcrum',
    category: 'Aviation & Combat Aircraft',
    force: 'Bangladesh Air Force',
    image: '/src/assets/images/force_bangladesh_air_force_1793808500274.jpg',
    description: 'Twin-engine, fourth-generation air superiority fighter operated by No. 8 Squadron ("Vigilance") based at BAF Base Bangabandhu. Capable of high-maneuverability dogfighting, beyond-visual-range missile combat, and rapid interception.',
    generalPurpose: 'Air superiority, point air defense, rapid interceptor scramble, and precision strike.',
    manufacturerOrigin: 'Mikoyan (Russia / Soviet Union)',
    specifications: {
      'Top Speed': 'Mach 2.25 (2,400 km/h at altitude)',
      'Combat Radius': '700–900 km',
      'Service Ceiling': '18,000 meters (59,100 ft)',
      'Engines': '2 × Klimov RD-33 afterburning turbofans',
      'Armament': '30mm GSh-30-1 auto-cannon; R-73 infrared & R-27 radar-guided air-to-air missiles',
      'Radar': 'Phazotron N019 Pulse-Doppler radar with look-down/shoot-down capability'
    },
    relatedRole: 'post-fighter-pilot',
    publicVerificationStatus: 'Active in No. 8 Squadron BAF (Publicly documented in World Air Forces and official parades)',
    source: 'World Air Forces Directory & FlightGlobal Fleet Data'
  },
  {
    id: 'equip-f7bgi',
    name: 'Chengdu F-7BGI Airguard Fighter',
    category: 'Aviation & Combat Aircraft',
    force: 'Bangladesh Air Force',
    image: '/src/assets/images/force_bangladesh_air_force_1793808500274.jpg',
    description: 'Advanced modern variant of the F-7 interceptor equipped with digital glass cockpit, Hands-On Throttle-And-Stick (HOTAS), Italian FIAR radar, and PL-9C air-to-air missile capability.',
    generalPurpose: 'Point air defense, tactical air-to-air interception, and close air support.',
    manufacturerOrigin: 'Chengdu Aircraft Industry Group (China)',
    specifications: {
      'Top Speed': 'Mach 2.0 (2,175 km/h)',
      'Avionics': 'Three multi-function displays (MFDs), HUD, HOTAS controls',
      'Missile Complement': '4 × PL-9C / PL-7 infrared air-to-air missiles; laser-guided bombs',
      'Cannon': '2 × 30mm Type 30-1 cannons',
      'Radar': 'KLJ-6E Pulse-Doppler fire control radar'
    },
    relatedRole: 'post-fighter-pilot',
    publicVerificationStatus: 'Active across multiple BAF fighter squadrons (Dhaka and Chattogram)',
    source: 'BAF Air Defense Records & Military Balance'
  },
  {
    id: 'equip-otokar-cobra',
    name: 'Otokar Cobra II 4×4 Armored Tactical Vehicle',
    category: 'Armored Vehicles & Tanks',
    force: 'Bangladesh Army',
    image: '/src/assets/images/force_bangladesh_army_1793808499613.jpg',
    description: 'High-mobility tactical wheeled armored personnel carrier and reconnaissance vehicle featuring V-shaped hull mine blast protection, used extensively on UN peacekeeping missions and border operations.',
    generalPurpose: 'Tactical personnel transport, convoy escort, patrol, and reconnaissance.',
    manufacturerOrigin: 'Otokar (Turkey)',
    specifications: {
      'Crew': 'Up to 10 personnel (including driver & commander)',
      'Drive': '4×4 all-wheel drive with run-flat tires',
      'Armor Protection': 'STANAG 4569 Level ballistic and anti-mine blast hull',
      'Armament': 'Remote Controlled Weapon Station (RCWS) mounting 12.7mm machine gun or 40mm grenade launcher',
      'Engine': '360 hp turbocharged diesel'
    },
    relatedRole: 'post-para-commando',
    publicVerificationStatus: 'In active service with Bangladesh Army UN contingents and quick reaction brigades',
    source: 'UN Register of Conventional Arms & Army Technology'
  },
  {
    id: 'equip-c130j',
    name: 'Lockheed Martin C-130J Super Hercules',
    category: 'Aviation & Combat Aircraft',
    force: 'Bangladesh Air Force',
    image: '/src/assets/images/tactical_bd_hero_defense_1793808498280.jpg',
    description: 'Modern four-engine turboprop tactical airlifter operated by No. 101 Special Flying Unit at BAF Base Bangabandhu for long-range tactical airlift, airborne paratroop drops, and emergency disaster relief.',
    generalPurpose: 'Strategic airlift, UN mission troop transport, aero-medical evacuation, and humanitarian airdrop.',
    manufacturerOrigin: 'Lockheed Martin (USA / UK RAF surplus acquisition program)',
    specifications: {
      'Payload Capacity': '19,000 kg (42,000 lb) cargo or up to 92 combat troops / 64 paratroopers',
      'Engines': '4 × Rolls-Royce AE 2100D3 turboprops (4,637 shp each)',
      'Propellers': 'Six-bladed Dowty composite propellers',
      'Range with Payload': '3,300 km',
      'Cockpit': 'Dual head-up displays (HUD), color multi-function digital flight displays'
    },
    relatedRole: 'post-fighter-pilot',
    publicVerificationStatus: 'All 5 procured aircraft inducted into active BAF operational service',
    source: 'Bangladesh Air Force Public Induction Records'
  },
  {
    id: 'equip-type56-rifle',
    name: 'BD-08 / Type 56-2 Assault Rifle',
    category: 'Infantry & Small Arms',
    force: 'Bangladesh Army',
    image: '/src/assets/images/force_bangladesh_army_1793808499613.jpg',
    description: 'Standard issue infantry assault rifle of the Bangladesh Armed Forces, produced under license locally at Bangladesh Ordnance Factories (BOF) Gazipur with side-folding stock and enhanced corrosion resistance.',
    generalPurpose: 'Primary individual combat weapon for infantry rifle sections and general personnel defense.',
    manufacturerOrigin: 'Bangladesh Ordnance Factories (BOF), Gazipur',
    specifications: {
      'Caliber': '7.62 × 39mm',
      'Action': 'Gas-operated, rotating bolt',
      'Rate of Fire': '600–650 rounds/min',
      'Effective Range': '400 meters',
      'Magazine': '30-round steel or polymer detachable box magazine',
      'Weight': '3.8 kg (unloaded)'
    },
    relatedRole: 'post-para-commando',
    publicVerificationStatus: 'Standard issue across Army, Navy, and Air Force ground security elements',
    source: 'Bangladesh Ordnance Factories (BOF) Catalog'
  },
  {
    id: 'equip-fm90-missile',
    name: 'FM-90 (HQ-7B) Short-Range Air Defense Missile System',
    category: 'Air Defense & Missiles',
    force: 'Bangladesh Army',
    image: '/src/assets/images/tactical_bd_hero_defense_1793808498280.jpg',
    description: 'All-weather, mobile short-range surface-to-air missile (SHORAD) system operated by the Bangladesh Army Air Defense Artillery and Navy to counter low-altitude fighter aircraft, cruise missiles, and drones.',
    generalPurpose: 'Point defense of high-value strategic assets, air bases, and mechanized brigade formations.',
    manufacturerOrigin: 'China National Precision Machinery Import & Export Corporation',
    specifications: {
      'Engagement Range': '0.7 to 15 km',
      'Target Altitude': '15 meters to 6,000 meters',
      'Missile Speed': 'Mach 2.3',
      'Guidance': 'Optical tracking, infrared, and radar command line-of-sight (CLOS)',
      'Mount': 'Mobile 4×4 or 6×6 armored vehicle launcher with 4 ready-to-fire canisters'
    },
    relatedRole: 'post-signals-cyber',
    publicVerificationStatus: 'Inducted in Bangladesh Army Air Defense Regiments and Naval Frigates',
    source: 'Army Air Defense Training Command Bulletins'
  }
];

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: 'cap-un-peacekeeping',
    title: 'UN Peacekeeping & International Humanitarian Leadership',
    force: 'Joint Armed Forces',
    domain: 'Global Peace & Stability',
    image: '/src/assets/images/army_un_peacekeeping_1793861251951.jpg',
    description: 'Bangladesh is one of the world\'s leading top Troop and Police Contributing Countries (T/PCC) to United Nations peacekeeping operations, with an illustrious legacy of service spanning over three decades across Africa, Europe, and Asia.',
    keyAssets: ['Mechanized Infantry Contingents', 'Armed Forces Field Hospitals (Level II & III)', 'Aviation Units (Mi-171Sh & Bell)', 'Riverine Naval Units', 'Military Engineers & EOD Teams'],
    verifiedStatistic: {
      value: '180,000+',
      label: 'Peacekeepers deployed across 54+ missions in 40+ countries since 1988',
      source: 'UN Department of Peace Operations (DPO) & Armed Forces Division Official Statistics'
    },
    operationalHighlights: [
      'Top historic troop contributor with prominent missions in UNMISS (South Sudan), MINUSCA (Central African Republic), MONUSCO (DR Congo), and UNIFIL (Maritime Lebanon).',
      'Recognized for exceptional discipline, community trust building, civil-military cooperation, and active deployment of female peacekeepers.'
    ],
    source: 'United Nations Peacekeeping Contributor Rankings & AFD Peacekeeping Directory'
  },
  {
    id: 'cap-maritime-defense',
    title: 'Maritime EEZ Sovereignty & Bay of Bengal Security',
    force: 'Bangladesh Navy',
    domain: 'Blue Water & Coastal Defense',
    image: '/src/assets/images/navy_bridge_command_1793861251418.jpg',
    description: 'Safeguards 118,813 square kilometers of national maritime economic zone, enforcing rights over offshore oil/gas reserves, commercial sea lines of communication (SLOC), and fishery conservation.',
    keyAssets: ['Guided Missile Frigates', 'Stealth Corvettes', 'Offshore Patrol Vessels', 'Maritime Patrol Aircraft (Dornier 228NG)', 'Conventional Attack Submarines'],
    verifiedStatistic: {
      value: '118,813 km²',
      label: 'Sovereign maritime economic area defended in the Bay of Bengal',
      source: 'ITLOS Maritime Boundary Verdicts & Bangladesh Navy Hydrographic Department'
    },
    operationalHighlights: [
      'Regular anti-piracy deterrence and armed escort through Chittagong and Mongla port approaches.',
      'Bilateral coordinated patrols (CORPAT) with neighboring littoral navies to ensure open sea lanes.'
    ],
    source: 'Bangladesh Navy Maritime Strategy Publication (Public Domain)'
  },
  {
    id: 'cap-air-sovereignty',
    title: 'Sovereign Airspace Surveillance & Interception',
    force: 'Bangladesh Air Force',
    domain: 'Integrated Air Defense',
    image: '/src/assets/images/baf_cockpit_simulator_1793861251680.jpg',
    description: 'Maintains comprehensive 24/7 radar surveillance and rapid reaction alert interception coverage over national airspace against hostile penetrations and uncoordinated flights.',
    keyAssets: ['MiG-29B Air Superiority Fighters', 'F-7BGI Interceptors', 'Long-Range 3D Surveillance Radars (Kronos Land)', 'SHORAD Missiles'],
    verifiedStatistic: {
      value: '24 / 7',
      label: 'Quick Reaction Alert (QRA) interceptor posture from frontline airbases',
      source: 'Bangladesh Air Force Air Defense Command (Public Domain)'
    },
    operationalHighlights: [
      'Integrated military-civil radar coverage coordinating with Civil Aviation Authority of Bangladesh (CAAB).',
      'High-altitude electronic reconnaissance and low-level tactical air intercept drills.'
    ],
    source: 'Bangladesh Air Force Golden Jubilee Commemorative Monograph'
  },
  {
    id: 'cap-disaster-relief',
    title: 'Rapid Disaster Response & Humanitarian Rescue',
    force: 'Joint Armed Forces',
    domain: 'National Crisis & Civil Support',
    image: '/src/assets/images/tactical_bd_hero_defense_1793808498280.jpg',
    description: 'The Armed Forces represent the premier first responder during extreme climatic disasters including catastrophic cyclones in the Bay of Bengal, severe monsoonal flooding, landslides, and riverbank erosions.',
    keyAssets: ['Army Engineer Bridge Units & BTR Amphibious Vehicles', 'Navy Landing Craft Utility (LCU) & Hospital Ships', 'Air Force Mi-17 & C-130 Airlifters'],
    verifiedStatistic: {
      value: '48 Hours',
      label: 'National mobilization window to deploy relief supply chains across affected coastal belts',
      source: 'Ministry of Disaster Management and Relief & Armed Forces Disaster Plan'
    },
    operationalHighlights: [
      'Massive relief operations during Cyclone Sidr, Aila, Amphan, and 2024 regional flash floods in Feni and Sylhet.',
      'Deployment of water purification plants, temporary pontoon bridges, and aeromedical evacuations.'
    ],
    source: 'Armed Forces Division Disaster Management Directive'
  },
  {
    id: 'cap-military-engineering',
    title: 'Strategic National Engineering & Border Infrastructure',
    force: 'Bangladesh Army',
    domain: 'National Strategic Construction',
    image: '/src/assets/images/cadet_issb_training_1793861251673.jpg',
    description: 'The Corps of Engineers (Special Works Organization - SWO) executes critical national megaprojects requiring complex engineering, high altitude mountain roads, and sovereign strategic access.',
    keyAssets: ['Heavy Earthmoving Machinery', 'Military Survey & Geospatial Regiments', 'Pontoon and Bailey Bridge Regiments'],
    verifiedStatistic: {
      value: '1,000+ km',
      label: 'Strategic border roads and mountain highways engineered in the Chittagong Hill Tracts',
      source: 'Special Works Organization (SWO) Project Releases (Public Domain)'
    },
    operationalHighlights: [
      'Construction of the scenic Marine Drive Cox\'s Bazar–Teknaf and the Sajek Valley mountain roadway.',
      'Expert military construction oversight for national river protection and strategic bypass highways.'
    ],
    source: 'Army Headquarters Engineer-in-Chief Branch'
  }
];

export const CAREER_DATA: CareerPathway[] = [
  {
    id: 'career-bma-long-course',
    title: 'Bangladesh Military Academy (BMA) Regular Long Course',
    force: 'Bangladesh Army',
    category: 'Commissioned Officer',
    image: '/src/assets/images/cadet_issb_training_1793861251673.jpg',
    entryRoute: 'Direct Cadet Entry via ISSB',
    overview: 'The premier entry route to receive a permanent regular commission as an officer in the Bangladesh Army. Cadets undergo rigorous military leadership, tactical discipline, academic undergraduate degrees (BSc/BSS under Bangladesh University of Professionals), and physical endurance training at BMA Bhatiary, Chattogram.',
    eligibilityEducation: [
      'HSC / A-Level (Science, Humanities, or Business Studies)',
      'Minimum GPA 5.0 in SSC and GPA 4.5 in HSC (or equivalent GCE grades)',
      'Unmarried Bangladeshi citizen, Age 16.5 to 21 years at date of entry'
    ],
    physicalStandards: [
      'Male Height: Minimum 5 ft 4 in (163 cm) · Weight: 50 kg (proportionate to age & height)',
      'Female Height: Minimum 5 ft 2 in (157 cm) · Weight: 46 kg (proportionate)',
      'Eye Vision: 6/6 or permissible corrected standards according to branch requirements'
    ],
    selectionSteps: [
      'Preliminary Medical Examination & Physical Fitness Screening',
      'Preliminary Written Examination (Math, English, General Knowledge, Bengali)',
      'Inter Services Selection Board (ISSB) 4-Day Comprehensive Evaluation (Psychometric, Group Discussions, Outdoor Tasks, Interview)',
      'Final Medical Board Examination at Combined Military Hospital (CMH)',
      'Final Merit List & Cadet Inductions'
    ],
    trainingAcademy: 'Bangladesh Military Academy (BMA), Bhatiary, Chattogram',
    trainingDuration: '3 Years (includes academic degree & tactical commissioning)',
    officialPortalUrl: 'https://joinbangladesharmy.army.mil.bd',
    relatedRank: 'army-second-lieutenant',
    source: 'Bangladesh Army Official Recruitment Portal & ISSB Official Rules'
  },
  {
    id: 'career-bna-officer-cadet',
    title: 'Bangladesh Naval Academy (BNA) Officer Cadet',
    force: 'Bangladesh Navy',
    category: 'Commissioned Officer',
    image: '/src/assets/images/navy_bridge_command_1793861251418.jpg',
    entryRoute: 'Direct Cadet Entry via ISSB',
    overview: 'Commissioning route for Executive, Marine Engineering, Electrical, and Logistics officers of the Bangladesh Navy. Training combines naval seamanship, navigation, military leadership, and maritime engineering degrees accredited by BUP.',
    eligibilityEducation: [
      'HSC / A-Level with Physics and Mathematics (Mandatory for Executive/Engineering/Electrical branches)',
      'Minimum GPA 4.5 in SSC and HSC with GPA 4.0 in Physics & Math',
      'Unmarried Bangladeshi citizen, Age 16.5 to 21 years'
    ],
    physicalStandards: [
      'Male Height: Minimum 5 ft 4 in (162.5 cm)',
      'Female Height: Minimum 5 ft 2 in (157.4 cm)',
      'Chest: Normal 30 in, Expanded 32 in',
      'Vision: 6/6 without glasses for Executive branch; acceptable refraction for Technical branches'
    ],
    selectionSteps: [
      'Preliminary Screening & Written Test at Naval Headquarters / Selection Centers',
      '4-Day ISSB Evaluation (Leadership, Situational Stress, Physical obstacle testing)',
      'Final Medical Examination at CMH Dhaka / Naval Hospital Chattogram',
      'Final Joining Order for BNA Cadets'
    ],
    trainingAcademy: 'Bangladesh Naval Academy (BNA), Patenga, Chattogram',
    trainingDuration: '3 Years at BNA + Sea Training aboard training vessels',
    officialPortalUrl: 'https://joinbangladeshnavy.navy.mil.bd',
    relatedRank: 'navy-captain',
    source: 'Bangladesh Navy Official Recruitment Portal'
  },
  {
    id: 'career-bafa-officer-cadet',
    title: 'Bangladesh Air Force Academy (BAFA) Officer Cadet',
    force: 'Bangladesh Air Force',
    category: 'Commissioned Officer',
    image: '/src/assets/images/baf_cockpit_simulator_1793861251680.jpg',
    entryRoute: 'Direct Cadet Entry via ISSB',
    overview: 'Entry into the General Duties Pilot (GD(P)), Aeronautical Engineering, Air Defense Weapon Controller, Logistics, and Admin branches of the Bangladesh Air Force. Aviation cadets receive solo flight training and BUP aeronautical degrees.',
    eligibilityEducation: [
      'HSC with Physics and Mathematics (for GD(P) and Engineering)',
      'Minimum GPA 4.5 in SSC and HSC with strong scores in Math & Physics',
      'Unmarried Bangladeshi citizen, Age 16.5 to 22 years'
    ],
    physicalStandards: [
      'Male Height: Minimum 5 ft 4 in (5 ft 6 in for GD(P) pilot stream)',
      'Female Height: Minimum 5 ft 2 in (5 ft 4 in for GD(P) pilot stream)',
      'Vision: 6/6 standard color vision mandatory for GD(P) Pilots (no color blindness)',
      'Pilot Aptitude Battery Test (PABT) qualification is mandatory for GD(P) candidates'
    ],
    selectionSteps: [
      'Preliminary Intelligence, English & Physics/Math Written Test',
      'Preliminary Medical Screening',
      '4-Day ISSB Evaluation with specialized Pilot Aptitude Testing (PABT)',
      'Central Medical Board (CMB) Aviation Medical Evaluation in Dhaka',
      'Final Induction to BAFA'
    ],
    trainingAcademy: 'Bangladesh Air Force Academy (BAFA), Jashore',
    trainingDuration: '3 Years combined academic and flight training',
    officialPortalUrl: 'https://joinbangladeshairforce.baf.mil.bd',
    relatedRank: 'air-chief-marshal',
    source: 'Bangladesh Air Force Recruitment Command'
  },
  {
    id: 'career-short-service-specialist',
    title: 'Direct Short Service Commission (Doctors, Engineers, Education)',
    force: 'Bangladesh Army',
    category: 'Specialist Entry',
    image: '/src/assets/images/cadet_issb_training_1793861251673.jpg',
    entryRoute: 'Graduate Specialist Direct Commission',
    overview: 'Direct officer commissioning for qualified civilian professionals such as Medical Doctors (Army Medical Corps), Dental Surgeons, Aeronautical/Civil Engineers (Corps of Engineers/EME), and Education Officers.',
    eligibilityEducation: [
      'MBBS / BDS from recognized medical colleges (BMDC registered) for Medical Corps',
      'BSc in Civil/Mechanical/Electrical/Computer Engineering for Technical Corps',
      'Maximum age typically up to 28 years on date of enrollment'
    ],
    physicalStandards: [
      'Standard Armed Forces medical fitness standards for specialist commissioned officers'
    ],
    selectionSteps: [
      'Specialist Written / Technical Screening Test',
      'Preliminary Medical & Armed Forces Selection Board Interview',
      'Final Medical Board Examination',
      'Specialist Basic Military Training at BMA'
    ],
    trainingAcademy: 'Bangladesh Military Academy (Short Course Wing), Bhatiary',
    trainingDuration: '24 Weeks Basic Military & Leadership Orientation',
    officialPortalUrl: 'https://joinbangladesharmy.army.mil.bd',
    relatedRank: 'army-captain',
    source: 'Armed Forces Specialist Commission Guidelines'
  }
];

export const RADAR_TELEMETRY_NODES = [
  {
    id: 'dhaka-command',
    name: 'Armed Forces Headquarters (Dhaka)',
    nativeName: 'সশস্ত্র বাহিনী বিভাগ, ঢাকা',
    coordinates: '23.8103° N, 90.4125° E',
    type: 'Command & Strategic GHQ',
    forces: ['Army GHQ', 'Naval HQ', 'Air HQ', 'Armed Forces Division'],
    status: 'Operational Command / High Readiness',
    position: [0.1, 0.4, 0.2] as [number, number, number]
  },
  {
    id: 'chattogram-naval',
    name: 'Chattogram Naval Command & BNS Issa Khan',
    nativeName: 'চট্টগ্রাম নৌ অঞ্চল ও ঈসা খাঁ ঘাঁটি',
    coordinates: '22.3569° N, 91.7832° E',
    type: 'Fleet Command & Naval Dockyard',
    forces: ['Frigate Flotilla', 'Submarine Base Support', 'SWADS Base'],
    status: 'Fleet Operational / Bay of Bengal Patrol',
    position: [0.5, -0.3, 0.4] as [number, number, number]
  },
  {
    id: 'zahurul-air-base',
    name: 'BAF Base Zahurul Haque (Chattogram)',
    nativeName: 'বিএএফ ঘাঁটি জহুরুল হক',
    coordinates: '22.2500° N, 91.8100° E',
    type: 'Air Defense & Coastal Aviation',
    forces: ['Fighter Squadrons', 'Maritime Reconnaissance'],
    status: 'QRA Active / Radar Sector 2',
    position: [0.6, -0.2, 0.1] as [number, number, number]
  },
  {
    id: 'bangabandhu-air-base',
    name: 'BAF Base Bangabandhu (Kurmitola, Dhaka)',
    nativeName: 'বিএএফ ঘাঁটি বঙ্গবন্ধু',
    coordinates: '23.8480° N, 90.3950° E',
    type: 'Primary Air Superiority Wing',
    forces: ['MiG-29 Squadron', 'C-130J Airlift Wing', 'Air Defense Grid'],
    status: 'QRA 24/7 Air Sovereignty Alert',
    position: [0.05, 0.48, -0.1] as [number, number, number]
  },
  {
    id: 'bay-of-bengal-patrol',
    name: 'Bay of Bengal Deep Sea EEZ Defense Sector',
    nativeName: 'বঙ্গোপসাগরীয় গভীর সমুদ্র প্রতিরক্ষা সেক্টর',
    coordinates: '20.5000° N, 90.0000° E',
    type: 'Sovereignty Sea Patrol',
    forces: ['Corvette Task Group', 'Offshore Patrol Vessels'],
    status: 'Continuous Maritime Surveillance',
    position: [0.3, -0.7, 0.6] as [number, number, number]
  },
  {
    id: 'sylhet-para-commando',
    name: 'Sylhet Cantonment (Para Commando Brigade)',
    nativeName: 'সিলেট সেনানিবাস (প্যারা কমান্ডো ব্রিগেড)',
    coordinates: '24.8949° N, 91.8687° E',
    type: 'Special Operations Base',
    forces: ['1st & 2nd Para Commando Brigades', 'Rapid Reaction Force'],
    status: 'Special Tactical Readiness',
    position: [0.45, 0.65, -0.3] as [number, number, number]
  },
  {
    id: 'un-peacekeeping-global',
    name: 'UN Peacekeeping Operations Global Vector',
    nativeName: 'জাতিসংঘ শান্তিরক্ষা বৈশ্বিক মিশন',
    coordinates: 'Global (UNMISS, MINUSCA, MONUSCO)',
    type: 'International Operations',
    forces: ['Bangladesh Joint UN Contingents', 'Field Hospitals', 'Riverine Units'],
    status: '#1 Global Contributor Legacy',
    position: [-0.6, 0.2, 0.5] as [number, number, number]
  }
];
