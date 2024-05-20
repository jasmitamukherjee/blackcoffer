// useFetchTopicList.js
import { useState, useEffect } from 'react';

const useFetchTopicList = () => {
  const [topics, setTopicList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopicList = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://blackcoffer-backend-gf2t.onrender.com/general/topic');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTopicList(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicList();
  }, []);

  return { topics, error, loading };
};

export default useFetchTopicList;
