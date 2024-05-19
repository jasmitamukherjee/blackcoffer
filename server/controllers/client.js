
import Data from "../models/Data.js"
export const getLocation = async(req,res)=>{
    try {
        const datas = await Data.find()
        const mapped_locations = datas.reduce()
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}