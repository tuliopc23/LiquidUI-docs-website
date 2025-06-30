import { useState, useCallback } from 'react';
import { GlassToastProps } from '../types';

interface ToastState {
    toasts: GlassToastProps[];
}

export const useToast = () => {
    const [state, setState] = useState<ToastState>({ toasts: [] });

    const toast = useCallback((props: Omit<GlassToastProps, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast: GlassToastProps = {
            ...props,
            id,
            duration: props.duration || 5000,
        };

        setState((prev) => ({
            toasts: [...prev.toasts, newToast],
        }));

        if (newToast.duration && newToast.duration > 0) {
            setTimeout(() => {
                setState((prev) => ({
                    toasts: prev.toasts.filter((t) => t.id !== id),
                }));
            }, newToast.duration);
        }

        return id;
    }, []);

    const dismiss = useCallback((id: string) => {
        setState((prev) => ({
            toasts: prev.toasts.filter((t) => t.id !== id),
        }));
    }, []);

    return {
        toasts: state.toasts,
        toast,
        dismiss,
    };
};

// Singleton toast function - this will be set by ToastProvider
export let toast: (props: Omit<GlassToastProps, 'id'>) => string = () => {
    throw new Error('Toast provider not initialized. Use ToastProvider in your app root.');
}; 