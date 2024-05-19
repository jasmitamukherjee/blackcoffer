// useFetchTopicData.js
import { useState, useEffect } from 'react';

const useFetchTopicData = (topic) => {
  const [frequency, setFrequency] = useState(null);
  const [relevance, setRelevance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopicData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/general/topic/${topic}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFrequency(data.frequency);
        setRelevance(data.relevance);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [topic]);

  return { frequency, relevance, error, loading };
};

export default useFetchTopicData;
