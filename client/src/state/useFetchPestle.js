// hooks/useFetchData.js
import { useState, useEffect } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL;
// console.log('Base URL:', BASE_URL);

const useFetchPestle = () => {
  const [pestle, setpestle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5001/general/pestle");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setpestle(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
fetchData();
   
  }, []);

  return { pestle, error, loading };
};

export default useFetchPestle;
