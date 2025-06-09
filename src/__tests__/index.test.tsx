/**
 * @jest-environment jsdom
 */

import HomePage from '@/app/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('HomePage', () => {
  it('deve renderizar o container principal', () => {
    render(<HomePage />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('deve exibir o título de boas-vindas', () => {
    render(<HomePage />);
    expect(screen.getByTestId('title')).toHaveTextContent(/bem-vindo/i);
  });

  it('deve exibir o subtítulo de instrução', () => {
    render(<HomePage />);
    expect(screen.getByTestId('subtitle')).toHaveTextContent(/faça login para continuar/i);
  });

  it('deve renderizar o ReactLogo', () => {
    render(<HomePage />);
    // O ReactLogo está dentro do span com data-testid="react-logo"
    expect(screen.getByTestId('react-logo')).toBeInTheDocument();
  });
});
