import express from  'express';
import { body, param, query } from 'express-validator';

import { getTours } from '../controllers/tourController.js';

const router = express.Router();
router.get('/', (req, res, next) => {
  res.send("test connection");
});

router.get('/tours/:userID',getTours);

export default router;
