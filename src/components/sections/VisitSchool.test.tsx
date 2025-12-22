import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VisitSchool } from './VisitSchool';
import { LanguageProvider } from '../../contexts/LanguageContext';

describe('VisitSchool', () => {
  it('renders without crashing', () => {
    render(
      <LanguageProvider>
        <VisitSchool />
      </LanguageProvider>
    );
    // Since we are running in JSDOM, we should be able to find elements by their role
    expect(screen.getByRole('button', { name: /Demander/i })).toBeInTheDocument();
  });
});
