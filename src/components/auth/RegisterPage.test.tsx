import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterPage } from './RegisterPage';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

// Mock useAuth
const mockRegister = vi.fn();
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    register: mockRegister.mockResolvedValue({}),
    user: null,
    loading: false
  })
}));

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        {component}
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('RegisterPage', () => {
  it('renders all registration fields', () => {
    renderWithProviders(<RegisterPage />);
    
    expect(screen.getByText(/Inscription Étudiant/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ex: Mahamat')).toBeInTheDocument(); // Nom
    expect(screen.getByPlaceholderText('Ex: Moussa')).toBeInTheDocument(); // Fullname (Prénom)
    expect(screen.getByText('Collège')).toBeInTheDocument(); // Cycle option
  });

  it('shows validation error when passwords do not match', () => {
    renderWithProviders(<RegisterPage />);
    
    // Fill password
    const passwordInput = screen.getAllByPlaceholderText('••••••')[0];
    const confirmInput = screen.getAllByPlaceholderText('••••••')[1];
    
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'password456' } });
    
    // Submit
    const submitBtn = screen.getByRole('button', { name: /Créer un Compte/i });
    fireEvent.click(submitBtn);
    
    expect(screen.getByText('Les mots de passe ne correspondent pas')).toBeInTheDocument();
  });
});
