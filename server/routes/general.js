import express from 'express';
import {getData,getIntensity,getLocation,getOverview,getIntensityAndLikelihood} from '../controllers/general.js'

const router=express.Router();
router.get("/data/:id",getData)
router.get("/location",getLocation)
router.get("/overview",getOverview)
router.get("/intensity",getIntensity)
router.get("/intensityandlikelihood/:id",getIntensityAndLikelihood)


// router.get('/dashboard',getDashboardStats)
export default router;

