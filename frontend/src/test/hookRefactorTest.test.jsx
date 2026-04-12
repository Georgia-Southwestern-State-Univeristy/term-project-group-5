import { renderHook, act, waitFor } from '@testing-library/react';
import { useFlightSearch } from './hooks/useFlightSearch';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// 1. Mock Global Dependencies
global.fetch = vi.fn();
const mockSearchParams = new URLSearchParams({
  departure: "JFK",
  destination: "CDG",
  search: "flight"
});

describe('useFlightSearch Refactor Test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should correctly sort flights by price (Cheapest First)', async () => {
    // Mock successful API response
    const mockFlights = [
      { id: '1', price: { total: "500.00" }, airline: "Delta", segments: [{ numberOfStops: 1 }] },
      { id: '2', price: { total: "200.00" }, airline: "United", segments: [{ numberOfStops: 0 }] }
    ];

    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockFlights,
    });

    // Render the refactored hook
    const { result } = renderHook(() => useFlightSearch(mockSearchParams));

    // Wait for the useEffect fetch to complete
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Act: Set sort to price
    act(() => {
      result.current.setSortBy("price");
    });

    // Assert: Check if United (200.00) is now at index 0
    expect(result.current.sortedFlights[0].id).toBe('2');
    expect(result.current.sortedFlights[1].id).toBe('1');
  });

  it('should handle API errors gracefully (Reliability Test)', async () => {
    // Mock a failed API response
    fetch.mockResolvedValue({ ok: false });

    const { result } = renderHook(() => useFlightSearch(mockSearchParams));

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Assert: Error state is populated correctly
    expect(result.current.error).toBe("Unable to load flight offers.");
    expect(result.current.flights).toHaveLength(0);
  });
});