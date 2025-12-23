
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Programs } from './Programs';
import { LanguageProvider } from '../../contexts/LanguageContext';

describe('Programs', () => {
  it('renders all 4 educational cycles', () => {
    render(
      <LanguageProvider>
        <Programs />
      </LanguageProvider>
    );
    
    // Check for keys that typically appear in the titles
    expect(screen.getByText(/Maternelle/i)).toBeInTheDocument();
    expect(screen.getByText(/Primaire/i)).toBeInTheDocument();
    expect(screen.getByText(/Collège/i)).toBeInTheDocument();
    expect(screen.getByText(/Lycée/i)).toBeInTheDocument();
  });
});
