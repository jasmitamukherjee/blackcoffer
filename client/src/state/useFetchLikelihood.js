import React,{useState,useEffect} from 'react'

const useFetchLikelihood = () => {
    {
        const [likelihood, setLikelihood] = useState(null);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
      
        useEffect(() => {
          const fetchData = async () => {
            setLoading(true);
            try {
              const response = await fetch("https://blackcoffer-backend-gf2t.onrender.com/general/likelihood");
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const result = await response.json();


              setLikelihood(result);
            } catch (error) {
              setError(error);
            } finally {
              setLoading(false);
            }
          };
      fetchData();
         
        }, []);
      
        return { likelihood, error, loading };
      };
      
}

export default useFetchLikelihood
