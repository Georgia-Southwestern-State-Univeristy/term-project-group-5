import { renderHook, act } from '@testing-library/react';
import { useFlightSearch } from '../hooks/useFlightSearch';

test('should sort flights by price correctly', async () => {
  const mockParams = new URLSearchParams("search=flight");
  const { result } = renderHook(() => useFlightSearch(mockParams));

  // Manually set mock flights since the fetch is mocked/internal
  act(() => {
    result.current.setFlights([
      { id: 1, price: { total: "500" } },
      { id: 2, price: { total: "200" } }
    ]);
    result.current.setSortBy("price");
  });

  expect(result.current.sortedFlights[0].id).toBe(2); // Cheapest first
});