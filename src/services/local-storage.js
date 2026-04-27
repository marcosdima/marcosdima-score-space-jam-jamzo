const hasStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const getElement = (key, defaultValue = null) => {
  if (!hasStorage()) return defaultValue;

  const storedValue = window.localStorage.getItem(key);

  if (storedValue === null) return defaultValue;

  try {
    return JSON.parse(storedValue);
  } catch {
    return storedValue;
  }
};

export const saveElement = (key, value) => {
  if (!hasStorage()) return value;

  window.localStorage.setItem(key, JSON.stringify(value));
  return value;
};

export const removeElement = (key) => {
  if (!hasStorage()) return;

  window.localStorage.removeItem(key);
};

const localStorageService = {
  getElement,
  saveElement,
  removeElement,
};

export default localStorageService;
