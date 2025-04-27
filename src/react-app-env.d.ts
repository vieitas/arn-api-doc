/// <reference types="react-scripts" />

declare module 'react';
declare module 'react-dom';
declare module 'react/jsx-runtime';

interface Window {
  // Add any custom window properties here
}

// Add any custom JSX properties here
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
