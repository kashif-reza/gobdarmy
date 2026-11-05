import { ComparisonItem, RankItem } from '../types/tactical';

export interface SimulatorAnswerRecord {
  questionId: string;
  selected: number;
  correct: boolean;
}

export interface SimulatorEvaluationResult {
  totalScore: number;
  scorePercent: number;
  assessmentLabel: 'Highly Recommended' | 'Recommended' | 'Needs Review';
  streamRecommendation: string;
}

/**
 * Evaluates a candidate's aptitude simulator performance.
 */
export function evaluateSimulatorScore(
  answers: SimulatorAnswerRecord[],
  totalQuestions: number
): SimulatorEvaluationResult {
  const safeTotal = Math.max(1, totalQuestions);
  const totalScore = answers.filter((a) => a.correct).length;
  const scorePercent = Math.round((totalScore / safeTotal) * 100);

  const assessmentLabel =
    scorePercent >= 80
      ? 'Highly Recommended'
      : scorePercent >= 60
      ? 'Recommended'
      : 'Needs Review';

  const streamRecommendation =
    scorePercent >= 80
      ? 'High Aptitude: BAF General Duties Pilot GD(P) / Naval Executive Surface Combat'
      : scorePercent >= 60
      ? 'Strong Aptitude: Army Armoured / Infantry Officer Cadet Stream (BMA Long Course)'
      : 'Development Stream: Engineering / Logistics Technical Officer Corps';

  return {
    totalScore,
    scorePercent,
    assessmentLabel,
    streamRecommendation,
  };
}

/**
 * Validates whether an item can be added to the side-by-side comparison tray.
 */
export function validateComparisonAddition(
  currentItems: ComparisonItem[],
  candidateId: string,
  candidateType: ComparisonItem['type']
): { allowed: boolean; reason?: 'duplicate' | 'full' | 'mismatch' } {
  if (currentItems.some((c) => c.id === candidateId)) {
    return { allowed: false, reason: 'duplicate' };
  }
  if (currentItems.length >= 2) {
    return { allowed: false, reason: 'full' };
  }
  if (currentItems.length === 1 && currentItems[0].type !== candidateType) {
    return { allowed: false, reason: 'mismatch' };
  }
  return { allowed: true };
}

/**
 * Filters and sorts ranks by force, category, and search query.
 */
export function filterAndSortRanks(
  ranks: RankItem[],
  forceFilter: string,
  categoryFilter: string,
  query: string
): RankItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  return ranks
    .filter((r) => {
      if (forceFilter !== 'All' && r.force !== forceFilter) return false;
      if (categoryFilter !== 'All' && r.category !== categoryFilter) return false;
      if (normalizedQuery) {
        const hay = `${r.name} ${r.nativeName} ${r.careerLevel} ${r.insigniaDescription}`.toLowerCase();
        if (!hay.includes(normalizedQuery)) return false;
      }
      return true;
    })
    .sort((a, b) => a.hierarchyLevel - b.hierarchyLevel);
}
