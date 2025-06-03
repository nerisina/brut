import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App/App';

describe('Login Component', () => {
    it('should render title', () => {
        render(<App />);
        expect(screen.getByText(/Brut/i)).toBeInTheDocument();
    });
});