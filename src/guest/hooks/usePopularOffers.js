import { useCallback, useEffect, useState } from 'react';

export default function usePopularOffers(API_BASE, activeMenu) {
  const [popularOffers, setPopularOffers] = useState([]);

  const fetchOffers = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/offers/frontend`);
      if (res.ok) {
        const data = await res.json();
        setPopularOffers(data || []);
      }
    } catch (err) {
      console.error('Error fetching frontend offers:', err);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  // Refresh offers when returning to homepage (picks up new admin offer edits)
  useEffect(() => {
    if (activeMenu === 'Home') {
      fetchOffers();
    }
  }, [activeMenu, fetchOffers]);

  return popularOffers;
}
