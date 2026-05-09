import express from 'express'
import { subscribe } from '../controllers/subscribeData.js';


const subscribeRouter = express.Router();


subscribeRouter.post('/subscribe',subscribe)


export default subscribeRouter;