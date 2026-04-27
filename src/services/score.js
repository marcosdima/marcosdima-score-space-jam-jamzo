import { getElement, removeElement, saveElement } from './local-storage.js';
import { getTopResults, normalizeScoreEntry, saveScore as saveOnlineScore } from './api.js';

const LOCAL_SCORES_KEY = 'scores';
const USERNAME_KEY = 'username';

const sortScores = (scores = []) => {
  return [...scores]
    .map((entry) => normalizeScoreEntry(entry))
    .sort((left, right) => right.score - left.score || new Date(right.created_at) - new Date(left.created_at));
};

export const getUsername = () => {
  const storedUsername = getElement(USERNAME_KEY, null);

  if (typeof storedUsername === 'string' && storedUsername.trim()) {
    return normalizeScoreEntry({ username: storedUsername }).username;
  }

  const defaultUsername = normalizeScoreEntry({}).username;
  saveElement(USERNAME_KEY, defaultUsername);

  return defaultUsername;
};

export const saveUsername = (username) => {
  const nextUsername = normalizeScoreEntry({ username }).username;

  saveElement(USERNAME_KEY, nextUsername);
  return nextUsername;
};

export const getLocalScores = () => {
  const storedScores = getElement(LOCAL_SCORES_KEY, []);

  return Array.isArray(storedScores) ? sortScores(storedScores) : [];
};

export const getOnlineScores = async () => {
  const onlineScores = await getTopResults();

  return sortScores(onlineScores);
};

export const saveScore = (score) => {
  const scoreEntry = normalizeScoreEntry({
    username: getUsername(),
    created_at: new Date().toISOString(),
    score,
  });

  const nextLocalScores = sortScores([...getLocalScores(), scoreEntry]);
  saveElement(LOCAL_SCORES_KEY, nextLocalScores);

  void saveOnlineScore(scoreEntry).catch((error) => {
    console.error('Unable to save online score', error);
  });

  return nextLocalScores;
};

export const clearScores = () => {
  removeElement(LOCAL_SCORES_KEY);
  return [];
};
