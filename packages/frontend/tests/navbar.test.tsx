import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import Navbar from '@/components/navbar';

// Mock Next.js navigation hook
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

// Mock window.location
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('Navbar', () => {
  beforeEach(() => {
    // Reset localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true
    });
    
    // Reset pathname mock
    (usePathname as any).mockReturnValue('/');
    
    // Reset location mock
    mockLocation.href = '';
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render the HAUL text", async () => {
      render(<Navbar />);

      const textElement = screen.getByText("HAUL");
      expect(textElement).toBeDefined();
  });

  it("should render all navigation links when not logged in", async () => {
      render(<Navbar />);

      // Check for HAUL logo/link
      expect(screen.queryByText('HAUL')).not.toBeNull()

      // Check for Login button when not logged in
      expect(screen.queryByText('Login')).not.toBeNull()
  });

  it("should render all navigation links when logged in", async () => {
      // Mock localStorage to simulate logged in user
      Object.defineProperty(window, 'localStorage', {
          value: {
              getItem: (key: string) => {
                  if (key === 'user') {
                      return JSON.stringify({ username: 'testuser' });
                  }
                  return null;
              },
              setItem: () => {},
              removeItem: () => {},
          },
          writable: true
      });

      render(<Navbar />);

      // Check for HAUL logo/link
      const haulLink = screen.getByText("HAUL");
      expect(haulLink).toBeDefined();

      // Check for navigation links (visible on desktop)
      const trendsLink = screen.getByText("TRENDS");
      expect(trendsLink).toBeDefined();

      const findsLink = screen.getByText("FINDS");
      expect(findsLink).toBeDefined();

      const storesLink = screen.getByText("STORES");
      expect(storesLink).toBeDefined();

      const profileLink = screen.getByText("PROFILE");
      expect(profileLink).toBeDefined();

      // Check for welcome message and logout button
      const welcomeMessage = screen.getByText("Welcome, testuser");
      expect(welcomeMessage).toBeDefined();

      const logoutButton = screen.getByText("Logout");
      expect(logoutButton).toBeDefined();
  });

  it("should handle storage events and update user info", async () => {
    const mockGetItem = vi.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true
    });

    // Initially no user
    mockGetItem.mockReturnValue(null);
    
    render(<Navbar />);
    
    // Verify login button is shown initially
    expect(screen.queryByText('Login')).not.toBeNull();

    // Simulate user login via storage event
    mockGetItem.mockReturnValue(JSON.stringify({ username: 'newuser' }));
    
    const storageEvent = new StorageEvent('storage', {
      key: 'user',
      newValue: JSON.stringify({ username: 'newuser' }),
    });
    
    fireEvent(window, storageEvent);
    
    await waitFor(() => {
      expect(screen.queryByText('Welcome, newuser')).not.toBeNull();
    });
  });

  it("should handle userLogin custom events", async () => {
    const mockGetItem = vi.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true
    });

    // Initially no user
    mockGetItem.mockReturnValue(null);
    
    render(<Navbar />);

    // Simulate user login via custom event
    mockGetItem.mockReturnValue(JSON.stringify({ username: 'eventuser' }));
    
    const loginEvent = new Event('userLogin');
    fireEvent(window, loginEvent);
    
    await waitFor(() => {
      expect(screen.queryByText('Welcome, eventuser')).not.toBeNull();
    });
  });

  it("should ignore storage events for other keys", async () => {
    const mockGetItem = vi.fn().mockReturnValue(null);
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true
    });
    
    render(<Navbar />);
    
    // Simulate storage event for different key
    const storageEvent = new StorageEvent('storage', {
      key: 'otherKey',
      newValue: 'someValue',
    });
    
    fireEvent(window, storageEvent);
    
    // Should not call getItem for user info update
    expect(mockGetItem).toHaveBeenCalledTimes(1); // Only initial call
  });

  it("should handle logout correctly", async () => {
    const mockRemoveItem = vi.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => JSON.stringify({ username: 'testuser' }),
        setItem: vi.fn(),
        removeItem: mockRemoveItem,
      },
      writable: true
    });

    render(<Navbar />);

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockRemoveItem).toHaveBeenCalledWith('authToken');
    expect(mockRemoveItem).toHaveBeenCalledWith('user');
    expect(mockLocation.href).toBe('/login');
  });

  it("should highlight active navigation link based on pathname", async () => {
    // Mock pathname to be on trends page
    (usePathname as any).mockReturnValue('/trends');
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => JSON.stringify({ username: 'testuser' }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true
    });

    render(<Navbar />);

    const trendsLink = screen.getByText("TRENDS");
    expect(trendsLink.className).toContain('font-bold');

    const findsLink = screen.getByText("FINDS");
    expect(findsLink.className).toContain('font-normal');
  });

  it("should render mobile menu when screen is small", async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => JSON.stringify({ username: 'testuser' }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true
    });

    render(<Navbar />);

    // Mobile menu should be present (even if hidden by CSS)
    const menuButton = screen.getByRole('button', { name: '' }); // IoMenu button
    expect(menuButton).toBeDefined();
  });

  it("should clean up event listeners on unmount", async () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<Navbar />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('userLogin', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('userLogin', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("should update user info when localStorage has invalid JSON", async () => {
    const mockGetItem = vi.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true
    });

    // Return invalid JSON
    mockGetItem.mockReturnValue('invalid json');
    
    // Should throw when parsing invalid JSON
    expect(() => render(<Navbar />)).toThrow();
  });

  it("should handle localStorage getItem returning null initially", async () => {
    const mockGetItem = vi.fn().mockReturnValue(null);
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true
    });
    
    render(<Navbar />);
    
    expect(screen.queryByText('Login')).not.toBeNull();
    expect(screen.queryByText('Welcome,')).toBeNull();
  });
});