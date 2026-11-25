import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../app/App';

describe('PK Portfolio React Application', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.body.removeAttribute('data-theme');
    window.history.pushState({}, '', '/');
  });

  it('renders all primary portfolio sections and headings', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Kawin P/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Who I Am/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Professional Experience/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Academic Background/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Featured Work/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Technical Arsenal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Credentials/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Recognition/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Let's Connect/i })).toBeInTheDocument();
  });

  it('toggles dark/light theme and persists preference to localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    await user.click(toggle);

    expect(document.body.getAttribute('data-theme')).toBe('dark');
    expect(window.localStorage.getItem('theme')).toBe('dark');

    const toggleBack = screen.getByRole('button', { name: /switch to light mode/i });
    await user.click(toggleBack);

    expect(document.body.getAttribute('data-theme')).toBe('light');
    expect(window.localStorage.getItem('theme')).toBe('light');
  });

  it('opens experience modal with details & tech stack and closes via Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    const v3Tile = screen.getByRole('button', { name: /Data Science Intern/i });
    await user.click(v3Tile);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('active');
    expect(within(dialog).getByText('Data Science Intern')).toBeInTheDocument();
    expect(within(dialog).getByText('V3 Analytics')).toBeInTheDocument();
    expect(within(dialog).getByText('2024 (6 Months)')).toBeInTheDocument();
    expect(within(dialog).getByText('scikit-learn')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(dialog).not.toHaveClass('active');
  });

  it('navigates projects carousel using next button and dot indicators', async () => {
    const user = userEvent.setup();
    render(<App />);

    const dots = screen.getAllByRole('button', { name: /Go to slide/i });
    expect(dots).toHaveLength(6);
    expect(dots[0]).toHaveClass('active');

    const nextBtn = screen.getByRole('button', { name: /Next project/i });
    await user.click(nextBtn);

    expect(dots[1]).toHaveClass('active');
  });

  it('validates contact form fields and submits valid message', async () => {
    const user = userEvent.setup();
    render(<App />);

    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    await user.click(submitBtn);

    expect(await screen.findByText(/Please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter your mobile number/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter your message/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Your Name/i), 'Test User');
    await user.type(screen.getByLabelText(/Your Email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Your Mobile Number/i), '+91 9876543210');
    await user.type(screen.getByLabelText(/Your Message/i), 'Hello Kawin!');
    await user.click(submitBtn);

    expect(screen.getByRole('button', { name: /Sending/i })).toBeDisabled();

    await waitFor(
      () => {
        expect(screen.getByRole('button', { name: /Message Sent!/i })).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2100));
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Send Message/i })).toBeEnabled();
    });
  }, 10000);

  it('renders 404 page for unknown routes with link back home', async () => {
    window.history.pushState({}, '', '/non-existent-route');
    render(<App />);

    expect(await screen.findByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Page Not Found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Portfolio/i })).toHaveAttribute('href', '/');
  });
});
