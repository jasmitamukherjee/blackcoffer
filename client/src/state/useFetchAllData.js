import React,{useState,useEffect} from 'react'

const useFetchAllData = () => {
    {
        const [data, setdata] = useState(null);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
      
        useEffect(() => {
          const fetchData = async () => {
            setLoading(true);
            try {
              const response = await fetch("http://localhost:5001/general/data");
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const result = await response.json();
              setdata(result);
            } catch (error) {
              setError(error);
            } finally {
              setLoading(false);
            }
          };
      fetchData();
         
        }, []);
      
        return { data, error, loading };
      };
      
}

export default useFetchAllData
