import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login';

describe('Login Component', () => {
    it('should render title', () => {
        render(<Login />);
        expect(screen.getByText(/Brut/i)).toBeInTheDocument();
    });
});