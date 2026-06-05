import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCountryCheck() {
  const [allowed, setAllowed] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/geo')
      .then((res) => {
        setAllowed(res.data.allowed);
        if (res.data.currency) {
          localStorage.setItem('currency', res.data.currency);
        }
      })
      .catch(() => setAllowed(false))
      .finally(() => setLoading(false));
  }, []);

  return { allowed, loading };
}