import Data from '../models/Data.js';

export const getData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Data.findById(id);
        res.status(200).json(data);
        console.log("data", data);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log("error happened");
    }
};

export const getLocation = async (req, res) => {
    try {
        const data = await Data.find({}, 'country');
        const countries = data.map(entry => entry.country);
        res.status(200).json(countries);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getRegion = async (req, res) => {
    try {
        const data = await Data.find({}, 'region');
        const region = data.map(entry => entry.region);
        res.status(200).json(region);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getOverview = async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getIntensity = async (req, res) => {
    try {
        const data = await Data.find({}, 'intensity');
        const intensity = data.map(entry => entry.intensity);
        res.status(200).json(intensity);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getLikelihood= async (req, res) => {
    try {
        const data = await Data.find({}, 'likelihood');
        const likelihood = data.map(entry => entry.likelihood);
        res.status(200).json(likelihood);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



export const getRelevence= async (req, res) => {
    try {
        const data = await Data.find({}, 'relevance');
        const relevance = data.map(entry => entry.relevance);
        res.status(200).json(relevance);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getSource= async (req, res) => {
    try {
        const data = await Data.find({}, 'source');
        const source = data.map(entry => entry.source);
        res.status(200).json(source);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPestle = async (req, res) => {
    try {
        const data = await Data.find({}, 'pestle');
        const pestleCount = {};
        
        // Count occurrences of each pestle
        data.forEach(entry => {
            if (entry.pestle) {
                pestleCount[entry.pestle] = (pestleCount[entry.pestle] || 0) + 1;
            }
        });

        // Convert pestle count object to array of objects containing pestle name and frequency
        const pestle = Object.entries(pestleCount).map(([pestle, count]) => ({ pestle, count }));
        
        res.status(200).json(pestle);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getIntensityAndLikelihood = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Data.findById(id);
        
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        const intensity = data.intensity;
        const likelihood = data.likelihood;
        
        res.status(200).json({ intensity, likelihood });
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getYear = async (req, res) => {
    try {
      const data = await Data.find({}, 'start_year end_year');
  
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Data not found" });
      }
  
      const start_year = data.map(item => item.start_year);
      const end_year = data.map(item => item.end_year);
  
      res.status(200).json({ start_year, end_year });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Define route for frequency and relevance endpoint
 export const  getTopicData=async (req, res) => {
    const { topic } = req.params;
    // Filter the dataset to get entries with the specified topic
    const topicEntries = await Data.find({ topic });
    
    // Calculate frequency and relevance
    const frequency = topicEntries.length;
    const totalRelevance = topicEntries.reduce((acc, curr) => acc + curr.relevance, 0);
    const relevance = frequency === 0 ? 0 : totalRelevance / frequency;
    
    res.json({ topic, frequency, relevance });
};



// export const getTopic= async (req, res) => {
//     try {
//         const data = await Data.find({}, 'topic');
//         const topic = data.map(entry => entry.topic);
//         res.status(200).json(topic);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };
export const getTopic = async (req, res) => {
    try {
      const data = await Data.find({}, 'topic');
      const topic = [...new Set(data.map(entry => entry.topic))];
      res.status(200).json(topic);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


  
  