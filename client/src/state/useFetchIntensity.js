import React,{useState,useEffect} from 'react'

const useFetchIntensity = () => {
    {
        const [intensity, setIntensity] = useState(null);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
      
        useEffect(() => {
          const fetchData = async () => {
            setLoading(true);
            try {
              const response = await fetch("http://localhost:5001/general/intensity");
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const result = await response.json();
              setIntensity(result);
            } catch (error) {
              setError(error);
            } finally {
              setLoading(false);
            }
          };
      fetchData();
         
        }, []);
      
        return { intensity, error, loading };
      };
      
}

export default useFetchIntensity
