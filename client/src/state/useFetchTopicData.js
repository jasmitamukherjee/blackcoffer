
import { useState, useEffect } from 'react';

const useFetchTopicData = (topics) => {
  const [topicData, setTopicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (topics.length === 0) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await Promise.all(
          topics.map(async (topic) => {
            const response = await fetch(`http://localhost:5001/general/topic/${topic}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch data for topic: ${topic}`);
            }
            const result = await response.json();
            return { topic: result.topic, relevance: result.relevance, frequency: result.frequency };
          })
        );
        setTopicData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topics]);

  return { topicData, loading, error };
};

export default useFetchTopicData;
