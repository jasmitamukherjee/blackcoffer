import Data from '../models/Data.js'

export const getData= async(req,res)=>{

    try{
        const {id} = req.params;
        const data= await Data.findById(id);
        res.status(200).json(data);

    }catch(error){
res.status(404).json({message : error.message})
    }
}