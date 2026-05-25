import { useEffect, useState } from 'react';

export default function usePopularOffers(API_BASE) {
  const [popularOffers, setPopularOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`${API_BASE}/offers/frontend`);
        if (res.ok) {
          const data = await res.json();
          setPopularOffers(data || []);
        }
      } catch (err) {
        console.error('Error fetching frontend offers:', err);
      }
    };
    fetchOffers();
  }, [API_BASE]);

  return popularOffers;
}

