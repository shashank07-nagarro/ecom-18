const isBrowser =
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const saveState = (key: string, state: any) => {
  if (!isBrowser) return;
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.warn('Error saving state to localStorage', e);
  }
};

export const loadState = (key: string) => {
  if (!isBrowser) return undefined;
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Error loading state from localStorage', e);
    return undefined;
  }
};

export const clearState = (key: string) => {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('Error clearing state from localStorage', e);
  }
};
