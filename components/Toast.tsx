import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '../lib/utils';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback(
    ({ type, title, message, duration = 5000 }: Omit<ToastProps, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { id, type, title, message, duration };
      
      setToasts((prevToasts) => [...prevToasts, newToast]);
      
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
      
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 max-w-md w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ id, type, title, message, onClose }: ToastProps & { onClose: () => void }) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 dark:bg-green-900/20',
    error: 'bg-red-50 dark:bg-red-900/20',
    info: 'bg-blue-50 dark:bg-blue-900/20',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20',
  };

  const borderColors = {
    success: 'border-green-200 dark:border-green-800',
    error: 'border-red-200 dark:border-red-800',
    info: 'border-blue-200 dark:border-blue-800',
    warning: 'border-yellow-200 dark:border-yellow-800',
  };

  return (
    <div
      className={cn(
        'liquid-glass p-4 rounded-lg border shadow-lg animate-in slide-in-from-right-full',
        bgColors[type],
        borderColors[type]
      )}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium">{title}</h3>
          {message && <div className="mt-1 text-sm opacity-90">{message}</div>}
        </div>
        <button
          type="button"
          className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}