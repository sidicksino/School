
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardPage } from './DashboardPage';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

// Mock Auth Context
const mockLogout = vi.fn();
const mockUser = {
    id: '123',
    surname: 'testuser',
    full_name: 'Test Student',
    cycle: 'Lycee',
    classe: 'Terminale D1',
    role: 'student',
    phone: '66000000'
};

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
    logout: mockLogout,
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

describe('DashboardPage', () => {
  it('renders student information', () => {
    renderWithProviders(<DashboardPage />);
    
    expect(screen.getByText('Test Student')).toBeInTheDocument();
    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText('Lycee')).toBeInTheDocument();
    expect(screen.getByText('Terminale D1')).toBeInTheDocument();
  });

  it('calls logout when button is clicked', () => {
    renderWithProviders(<DashboardPage />);
    
    const logoutBtn = screen.getByText(/Déconnexion/i); // Assuming default lang is FR or key fallback
    fireEvent.click(logoutBtn);
    
    expect(mockLogout).toHaveBeenCalled();
  });
});
