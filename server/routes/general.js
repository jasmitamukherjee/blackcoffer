import express from 'express';
import {getData,getIntensity,getLocation,getOverview} from '../controllers/general.js'

const router=express.Router();
router.get("/data/:id",getData)
router.get("/location",getLocation)
router.get("/overview",getOverview)
router.get("/intensity",getIntensity)

// router.get('/dashboard',getDashboardStats)
export default router;

