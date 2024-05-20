import express from 'express';
import {getData,getIntensity,getLocation,getOverview,getIntensityAndLikelihood, getLikelihood, getRelevence,getYear, getRegion, getTopicData, getTopic,getSource,getPestle} from '../controllers/general.js'

const router=express.Router();
router.get("/data/:id",getData)
router.get("/location",getLocation)
router.get("/overview",getOverview)
router.get("/intensity",getIntensity)
router.get("/likelihood",getLikelihood)
router.get("/relevance",getRelevence)
router.get("/region",getRegion)
router.get("/topic/:topic",getTopicData)
router.get("/topic",getTopic)
router.get("/source",getSource)
router.get("/pestle",getPestle)
router.get("/year",getYear)


// router.get('/dashboard',getDashboardStats)
export default router;

