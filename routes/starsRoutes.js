import express from 'express';
const router = express.Router();
import * as starsController from '../controllers/startControllers.js';

router.get('/stars', starsController.getAllStars);
router.post('/stars', starsController.createStar);
router.get('/stars/:id', starsController.getStarById);
router.get('/stars/:filter', starsController.filterStars);

export default router;