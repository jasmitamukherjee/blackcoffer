// useFetchTopicList.js
import { useState, useEffect } from 'react';

const useFetchTopicList = () => {
  const [topic, setTopicList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopicList = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5001/general/topic');
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

  return { topic, error, loading };
};

export default useFetchTopicList;
