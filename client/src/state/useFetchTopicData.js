// // useFetchTopicData.js
// import { useState, useEffect } from 'react';

// const useFetchTopicData = (topic) => {
//   const [frequency, setFrequency] = useState(null);
//   const [topicrelevance, setRelevance] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [topicState,setTopic] = useState(null)
//   useEffect(() => {
//     const fetchTopicData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`http://localhost:5001/general/topic/${topic}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setFrequency(data.frequency);
//         setRelevance(data.relevance);
//         setTopic(data.topic)

//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTopicData();
//   }, [topic]);

//   return { topicState,frequency, topicrelevance, error, loading };
// };

// export default useFetchTopicData;


// src/state/useFetchTopicData.js

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
