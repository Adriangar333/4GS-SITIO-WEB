import { useSyncExternalStore } from 'react';

let selectedService: number | null = null;
const listeners = new Set<() => void>();

function emitChange() {
    listeners.forEach((l) => l());
}

export function setSelectedService(idx: number | null) {
    selectedService = idx;
    emitChange();
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

function getSnapshot() {
    return selectedService;
}

function getServerSnapshot() {
    return null;
}

export function useSelectedService() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Non-hook raw read for use inside useFrame / animation loops
export function getSelectedService(): number | null {
    return selectedService;
}
