import express from  'express';
import { body, param, query } from 'express-validator';

import { getTours } from '../controllers/tourController.js';
import {createUser, getUserData, updateUser, removeUser} from "../controllers/userController.js";

const router = express.Router();
router.get('/', (req, res, next) => {
  res.send("test connection");
});

router.get('/tours/:userID',getTours);

router.get('/users/:userID',getUserData);
router.post('/users',createUser);
router.post('/users/:userID',updateUser);
router.delete('/users/:userID',removeUser);

export default router;
