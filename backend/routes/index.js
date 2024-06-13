import express from  'express';
import authenticateToken from "../middlewares/authenticateToken.js";
import {
  createTour,
  getAttractions,
  getTourById,
  getTours,
  removeTour,
  updateTour
} from '../controllers/tourController.js';
import {createUser,loginUser, getUserData, updateUser, removeUser} from "../controllers/userController.js";

const router = express.Router();
router.get('/', (req, res, next) => {
  res.send("test connection");
});

router.get('/tours/:userID',authenticateToken,getTours);
router.get('/tour/:tourID',getTourById);
router.post('/tours/:userID',createTour);
router.put('/tours/:userID/:tourID',updateTour);
router.delete('/tours/:userID/:tourID',removeTour);
router.post('/attractions',getAttractions);

router.get('/users/:userID',getUserData);
router.post('/register',createUser);
router.post('/login',loginUser);
router.post('/users/:userID',updateUser);
router.delete('/users/:userID',removeUser);

export default router;
