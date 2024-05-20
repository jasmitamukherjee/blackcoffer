// hooks/useFetchData.js
import { useState, useEffect } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL;
// console.log('Base URL:', BASE_URL);

const useFetchSource = () => {
  const [source, setsource] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://blackcoffer-backend-gf2t.onrender.com/general/source");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setsource(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
fetchData();
   
  }, []);

  return { source, error, loading };
};

export default useFetchSource;
