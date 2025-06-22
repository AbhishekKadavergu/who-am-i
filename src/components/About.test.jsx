import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from './About';
// Improved tests for the About component

describe('About', () => {
    it('renders the hero section with name', () => {
        const { getAllByText } = render(<About />);
        const matches = getAllByText(/Abhishek Kadavergu/i);
        expect(matches.length).toBeGreaterThan(0);
    });

    it('renders the Who Am I section', () => {
        const { getAllByRole } = render(<About />);
        const headings = getAllByRole('heading', { name: /who am i/i });
        expect(headings.length).toBeGreaterThan(0);
    });

    it('renders the What I Do section', () => {
        const { getAllByRole } = render(<About />);
        const headings = getAllByRole('heading', { name: /what i do/i });
        expect(headings.length).toBeGreaterThan(0);
    });

    it('renders the Beyond the Resume section', () => {
        const { getAllByRole } = render(<About />);
        const headings = getAllByRole('heading', { name: /beyond the resume/i });
        expect(headings.length).toBeGreaterThan(0);
    });

    it('renders the Why This Site section', () => {
        const { getAllByRole } = render(<About />);
        const headings = getAllByRole('heading', { name: /why this site/i });
        expect(headings.length).toBeGreaterThan(0);
    });

    it('logs all headings for debug', () => {
        render(<About />);
        const headings = screen.getAllByRole('heading');
        // Print all heading texts for debug
        headings.forEach((h, i) => {
            // eslint-disable-next-line no-console
            console.log(`Heading ${i}:`, h.textContent);
        });
        expect(headings.length).toBeGreaterThan(0);
    });
});
