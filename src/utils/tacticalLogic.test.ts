import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateSimulatorScore,
  validateComparisonAddition,
  filterAndSortRanks,
} from './tacticalLogic';
import { RANKS_DATA } from '../data/defenseData';

test('evaluateSimulatorScore calculates proficiency and recommendations accurately', () => {
  const highResult = evaluateSimulatorScore(
    [
      { questionId: '1', selected: 1, correct: true },
      { questionId: '2', selected: 1, correct: true },
      { questionId: '3', selected: 1, correct: true },
      { questionId: '4', selected: 2, correct: true },
      { questionId: '5', selected: 0, correct: false },
    ],
    5
  );
  assert.equal(highResult.totalScore, 4);
  assert.equal(highResult.scorePercent, 80);
  assert.equal(highResult.assessmentLabel, 'Highly Recommended');

  const midResult = evaluateSimulatorScore(
    [
      { questionId: '1', selected: 1, correct: true },
      { questionId: '2', selected: 1, correct: true },
      { questionId: '3', selected: 1, correct: true },
      { questionId: '4', selected: 0, correct: false },
      { questionId: '5', selected: 1, correct: false },
    ],
    5
  );
  assert.equal(midResult.scorePercent, 60);
  assert.equal(midResult.assessmentLabel, 'Recommended');

  const lowResult = evaluateSimulatorScore([], 5);
  assert.equal(lowResult.scorePercent, 0);
  assert.equal(lowResult.assessmentLabel, 'Needs Review');
});

test('validateComparisonAddition enforces max 2 items, no duplicates, and matching category types', () => {
  const emptyCheck = validateComparisonAddition([], 'army-general', 'rank');
  assert.equal(emptyCheck.allowed, true);

  const firstItem = [{ id: 'army-general', type: 'rank' as const, data: {} }];
  const dupCheck = validateComparisonAddition(firstItem, 'army-general', 'rank');
  assert.equal(dupCheck.allowed, false);
  assert.equal(dupCheck.reason, 'duplicate');

  const mismatchCheck = validateComparisonAddition(firstItem, 'equip-mig-29', 'equipment');
  assert.equal(mismatchCheck.allowed, false);
  assert.equal(mismatchCheck.reason, 'mismatch');

  const validSecondCheck = validateComparisonAddition(firstItem, 'navy-admiral', 'rank');
  assert.equal(validSecondCheck.allowed, true);

  const fullList = [
    { id: 'army-general', type: 'rank' as const, data: {} },
    { id: 'navy-admiral', type: 'rank' as const, data: {} },
  ];
  const fullCheck = validateComparisonAddition(fullList, 'air-chief-marshal', 'rank');
  assert.equal(fullCheck.allowed, false);
  assert.equal(fullCheck.reason, 'full');
});

test('filterAndSortRanks filters by force, category, and query in hierarchy order', () => {
  const armyGenerals = filterAndSortRanks(
    RANKS_DATA,
    'Bangladesh Army',
    'Commissioned Officer',
    'General'
  );
  assert.ok(armyGenerals.length >= 3);
  assert.equal(armyGenerals[0].id, 'army-general');
  assert.equal(armyGenerals[0].hierarchyLevel, 1);
  assert.ok(armyGenerals[0].hierarchyLevel <= armyGenerals[1].hierarchyLevel);
});
