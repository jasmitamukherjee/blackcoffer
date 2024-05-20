// hooks/useFetchData.js
import { useState, useEffect } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL;
// console.log('Base URL:', BASE_URL);

const useFetchData = (id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://blackcoffer-backend-gf2t.onrender.com/general/data/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { data, error, loading };
};

export default useFetchData;
