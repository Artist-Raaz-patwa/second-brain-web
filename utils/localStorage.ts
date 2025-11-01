
/**
 * Saves a value to localStorage under a specific key.
 * @param key The key to save the data under.
 * @param value The value to save (will be JSON.stringified).
 */
export const saveToLocalStorage = <T,>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};

/**
 * Retrieves a value from localStorage by its key.
 * @param key The key of the data to retrieve.
 * @returns The parsed data, or null if not found or if an error occurs.
 */
export const getFromLocalStorage = <T,>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error("Error getting from localStorage:", error);
        return null;
    }
};
