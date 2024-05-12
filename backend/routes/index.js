import express from  'express';
import { body, param, query } from 'express-validator';

import {createTour, getAttractions, getTours, removeTour, updateTour} from '../controllers/tourController.js';
import {createUser, getUserData, updateUser, removeUser} from "../controllers/userController.js";

const router = express.Router();
router.get('/', (req, res, next) => {
  res.send("test connection");
});

router.get('/tours/:userID',getTours);
router.post('/tours/:userID',createTour);
router.put('/tours/:userID/:tourID',updateTour);
router.delete('/tours/:userID/:tourID',removeTour);
router.post('/attractions',getAttractions);

router.get('/users/:userID',getUserData);
router.post('/users',createUser);
router.post('/users/:userID',updateUser);
router.delete('/users/:userID',removeUser);

export default router;
