import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, value: T) {
    const [storedValue, setStoredValue] = useState<T>(value);

    useEffect(() => {
        try {
            const item = localStorage.getItem(key);
            if (item) setStoredValue(JSON.parse(item));
        } catch (error) {
            console.error("Error leyendo localStorage:", error);
        }
    }, [key]);

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    const removeValue = () => {
        try {
            localStorage.removeItem(key);
            setStoredValue(value);
        } catch (error) {
            console.error(error);
        }
    };

    return { storedValue, setValue, removeValue };
}