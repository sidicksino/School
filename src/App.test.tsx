import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Just verifying it renders. We can add more specific assertions later.
    // For example, checking if the main semantic tags exist
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header usually has banner role
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
