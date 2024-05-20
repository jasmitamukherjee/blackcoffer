import React, { useState, useEffect } from 'react';

const useFetchYear = () => {
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://blackcoffer-backend-gf2t.onrender.com/general/year");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setStartYear(result.start_year);
        setEndYear(result.end_year);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { startYear, endYear, error, loading };
};

export default useFetchYear;
