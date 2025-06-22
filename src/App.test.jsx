import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';

// Mock matchMedia for jsdom
defineMatchMediaMock();

function defineMatchMediaMock() {
  beforeAll(() => {
    window.matchMedia = window.matchMedia || function() {
      return {
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      };
    };
  });
}

import App from './App';

// Basic smoke test for the App component

describe('App', () => {
it('renders without crashing', () => {
  const { getAllByText } = render(<App />);
  const matches = getAllByText('Abhishek Kadavergu');
  expect(matches.length).toBeGreaterThan(0);
});
});
