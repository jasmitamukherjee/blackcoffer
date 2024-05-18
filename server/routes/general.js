import express from 'express';
import {getData} from '../controllers/general.js'
const router=express.Router();
router.get("/data/:id",getData)
export default router;

