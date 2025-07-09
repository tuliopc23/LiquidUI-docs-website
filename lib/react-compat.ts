/**
 * React compatibility shim for Next.js 15 and React 19
 * Fixes issues with createContext and other React APIs during SSR
 */

import React from 'react';

// Check if we're in a browser environment
export const isBrowser = typeof window !== 'undefined';

// Safe component wrapper for SSR
export const withSSRSafety = <P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  const SafeComponent = (props: P) => {
    try {
      return React.createElement(Component, props);
    } catch (error) {
      console.warn('Component failed during SSR:', error);
      return null;
    }
  };

  SafeComponent.displayName = `withSSRSafety(${Component.displayName || Component.name || 'Component'})`;
  return SafeComponent;
};

export default {
  isBrowser,
  withSSRSafety,
};
