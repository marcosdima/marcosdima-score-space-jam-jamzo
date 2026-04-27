export { default as localStorageService } from './local-storage.js';
export { getElement, saveElement, removeElement } from './local-storage.js';
export { getTopResults as getOnlineTopResults, normalizeScoreEntry, saveScore as saveOnlineScore } from './api.js';
export {
  clearScores,
  getLocalScores,
  getOnlineScores,
  getUsername,
  saveScore,
  saveUsername,
  getCachedOnlineScores,
} from './score.js';
