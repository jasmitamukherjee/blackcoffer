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
