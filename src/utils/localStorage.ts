export function setStorageItem(key: string, value: unknown) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error(err);
    }
}

export function getStorageItem<T>(key: string): T | undefined {
    try {
        const data = localStorage.getItem(key);
        return data ? (JSON.parse(data) as T) : undefined;
    } catch (err) {
        console.error(err);
    }
}

export function removeStorageItem(key: string) {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error(err);
    }
}

export function resetLocalStorage() {
    localStorage.clear()
}