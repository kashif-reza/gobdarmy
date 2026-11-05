export interface SimulatorQuestion {
  id: string;
  category: 'Tactical Reaction (SRT)' | 'Aircraft & Fleet ID' | 'Radar & Azimuth Bearing' | 'Rank Hierarchy Protocol';
  question: string;
  scenario?: string;
  image?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  timeLimitSeconds: number;
}

export const SIMULATOR_QUESTIONS: SimulatorQuestion[] = [
  {
    id: 'sim-1',
    category: 'Aircraft & Fleet ID',
    question: 'Identify the multirole air superiority fighter aircraft depicted in this tactical cockpit HUD intercept profile:',
    scenario: 'BAF Air Defense radar detects a supersonic interceptor flying at Mach 2.0 with twin vertical fins and high-mounted delta wings. Cockpit instrumentation confirms dual Klimov turbofan thermal signature.',
    image: '/src/assets/images/baf_cockpit_simulator_1793861251680.jpg',
    options: [
      'Chengdu F-7BGI Airguard',
      'Mikoyan MiG-29B Fulcrum',
      'Lockheed Martin C-130J Super Hercules',
      'Bell 212 Utility Helicopter'
    ],
    correctAnswerIndex: 1,
    explanation: 'The MiG-29B Fulcrum is a twin-engine 4th generation air superiority fighter operated by No. 8 Squadron BAF with Klimov RD-33 turbofans and beyond-visual-range radar capabilities.',
    timeLimitSeconds: 25,
  },
  {
    id: 'sim-2',
    category: 'Radar & Azimuth Bearing',
    question: 'Your warship bridge radar observes an unidentified contact at Bearing 135° Range 14 Nautical Miles moving toward Chittagong outer anchorage at 22 knots. Which maritime quadrant does Bearing 135° represent?',
    scenario: 'Night watchstanders in the Combat Information Center (CIC) monitor automated radar plotting aids (ARPA) in the Bay of Bengal.',
    image: '/src/assets/images/navy_bridge_command_1793861251418.jpg',
    options: [
      'North-East (045° quadrant)',
      'South-East (090° to 180° quadrant)',
      'South-West (180° to 270° quadrant)',
      'North-West (270° to 360° quadrant)'
    ],
    correctAnswerIndex: 1,
    explanation: 'True bearing 135° lies exactly midway in the South-East quadrant (between East 090° and South 180°).',
    timeLimitSeconds: 20,
  },
  {
    id: 'sim-3',
    category: 'Tactical Reaction (SRT)',
    question: 'During a UN peacekeeping patrol in an isolated sector, your platoon encounters a washed-out river bridge with stranded humanitarian supply trucks on the opposite bank and sunset approaching in 45 minutes. What is the immediate primary leadership decision?',
    scenario: 'Officer Cadets and field commanders at BMA are evaluated on rapid tactical assessment and prioritizing civilian protection under strict mission mandates.',
    image: '/src/assets/images/cadet_issb_training_1793861251673.jpg',
    options: [
      'Abandon the mission immediately and return to headquarters camp without reporting.',
      'Establish a 360° defensive perimeter, establish encrypted radio contact with HQ, and dispatch a combat engineer reconnaissance team to sound river ford depth.',
      'Order all heavy supply trucks to drive directly into deep water without checking underwater bed firmness.',
      'Instruct troops to dismantle personal weapons to build a temporary crossing.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Standard military doctrine requires securing the perimeter, maintaining communications with operational command, and executing proper technical reconnaissance before committing vehicular assets.',
    timeLimitSeconds: 30,
  },
  {
    id: 'sim-4',
    category: 'Rank Hierarchy Protocol',
    question: 'In joint service operations, which Bangladesh Navy rank possesses the direct military hierarchy equivalence to a Bangladesh Army Major and a Bangladesh Air Force Squadron Leader?',
    scenario: 'Three-service protocol requires instant familiarity with military equivalence during combined-arms exercises.',
    options: [
      'Commander',
      'Commodore',
      'Lieutenant Commander',
      'Sub Lieutenant'
    ],
    correctAnswerIndex: 2,
    explanation: 'Lieutenant Commander (two medium gold rings with one thin ring between them) is the exact naval equivalent to an Army Major and BAF Squadron Leader.',
    timeLimitSeconds: 20,
  },
  {
    id: 'sim-5',
    category: 'Tactical Reaction (SRT)',
    question: 'Your UN Peacekeeping patrol convoy encounters an angry crowd blocking a humanitarian food corridor. You observe no weapons among civilians, but tension is rising rapidly. How does an officer proceed under UN Rules of Engagement (ROE)?',
    scenario: 'Bangladesh UN peacekeeper personnel are internationally praised for de-escalation, cultural sensitivity, and measured non-lethal conflict resolution.',
    image: '/src/assets/images/army_un_peacekeeping_1793861251951.jpg',
    options: [
      'Maintain disciplined standoff posture, use local language interpreters to initiate dialogue with community elders, and request UN civil liaison support while securing relief cargo.',
      'Fire warning shots directly into the crowd immediately.',
      'Surrender all vehicles and supplies to the crowd unconditionally.',
      'Order soldiers to break formation and run in different directions.'
    ],
    correctAnswerIndex: 0,
    explanation: 'UN peacekeeping doctrine stresses calm de-escalation, patient negotiation through interpreters, maintaining unit cohesion, and protecting vital relief supplies without resorting to unauthorized force.',
    timeLimitSeconds: 25,
  }
];
