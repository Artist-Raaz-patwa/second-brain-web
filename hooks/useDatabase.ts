import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, set, push, remove as fbRemove, off } from 'firebase/database';
import { db } from '../services/firebase';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

// FIX: The hook's interface should be generic over the item type `T`.
// The `data` property holds an array of `T`, while `add`, `update`, and `remove` operate on single items.
interface DatabaseHook<T extends { id: string }> {
    data: T[] | null;
    loading: boolean;
    error: Error | null;
    add: (item: Omit<T, 'id'>) => Promise<void>;
    update: (id: string, updates: Partial<T>) => Promise<void>;
    remove: (id: string) => Promise<void>;
}

/**
 * A generic hook to interact with a Firebase Realtime Database path.
 * It handles real-time data fetching, loading and error states,
 * and provides CRUD operations. It also uses localStorage as a
 * fallback for a seamless offline experience.
 *
 * @template T The type of the individual item stored at the database path (e.g., Note).
 * @param {string | null} path The path in the Firebase Realtime Database to sync with.
 * @returns {DatabaseHook<T>} An object containing the data and methods to manipulate it.
 */
// FIX: The hook should return `DatabaseHook<T>` to match the implemented functions.
export function useDatabase<T extends { id: string }>(path: string | null): DatabaseHook<T> {
    const [data, setData] = useState<T[] | null>(() => (path ? getFromLocalStorage(path) : null));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!path) {
            setLoading(false);
            return;
        }

        const dbRef = ref(db, path);

        // Set initial data from localStorage if available
        const cachedData = getFromLocalStorage<T[]>(path);
        if (cachedData) {
            setData(cachedData);
        }

        const unsubscribe = onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            // Firebase returns null for empty paths, so we default to an empty array
            const dataArray: T[] = val ? Object.keys(val).map(key => ({ id: key, ...val[key] })) : [];
            setData(dataArray);
            saveToLocalStorage(path, dataArray);
            setLoading(false);
        }, (err) => {
            console.error(err);
            setError(err);
            setLoading(false);
        });
        
        // Detach the listener when the component unmounts
        return () => {
            off(dbRef, 'value', unsubscribe);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    const add = useCallback(async (item: Omit<T, 'id'>) => {
        if (!path) return;
        try {
            const dbRef = ref(db, path);
            const newRef = push(dbRef);
            await set(newRef, item);
        } catch (err) {
            console.error(err);
            setError(err as Error);
        }
    }, [path]);

    const update = useCallback(async (id: string, updates: Partial<T>) => {
        if (!path) return;
        try {
            // This is a simplified update. For deep updates, use the `update` function from firebase.
            const itemRef = ref(db, `${path}/${id}`);
            const existingData = data?.find(d => d.id === id);
            if(existingData) {
                await set(itemRef, { ...existingData, ...updates, id: undefined });
            }
        } catch (err) {
            console.error(err);
            setError(err as Error);
        }
    }, [path, data]);

    const remove = useCallback(async (id: string) => {
        if (!path) return;
        try {
            const itemRef = ref(db, `${path}/${id}`);
            await fbRemove(itemRef);
        } catch (err) {
            console.error(err);
            setError(err as Error);
        }
    }, [path]);

    return { data, loading, error, add, update, remove };
}
