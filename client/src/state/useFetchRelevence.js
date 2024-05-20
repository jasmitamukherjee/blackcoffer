import React,{useState,useEffect} from 'react'

const useFetchRelevance
 = () => {
    {
        const [relevance, setRelevance] = useState(null);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
      
        useEffect(() => {
          const fetchData = async () => {
            setLoading(true);
            try {
              const response = await fetch("https://blackcoffer-backend-gf2t.onrender.com/general/relevance");
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const result = await response.json();
              setRelevance(result);
              // console.log(result)
            } catch (error) {
              setError(error);
            } finally {
              setLoading(false);
            }
          };
      fetchData();
         
        }, []);
      
        return { relevance, error, loading };
      };
      
}

export default useFetchRelevance

