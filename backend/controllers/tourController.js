import asyncHandler from "express-async-handler";
import {TourModel} from "../models/tourModel.js";
import {validateUser} from "../middlewares/validateUser.js";

const getTours = asyncHandler(async (req, res) => {
    const userId = req.params.userID;
    const [status, message] = await validateUser(userId);
    const tours = await TourModel.find({userId: userId});

    return res.json({
        status:status,
        data: tours
    });
});

const createTour = asyncHandler(async (req, res) => {
    const userId = req.params.userID;
    const { name, pointsToVisit, date, tourDescription } = req.body;
    let [status, message] = await validateUser(userId);
    if (!status) {
        return res.status(404).json({ status: false, message: message });
    }

    const validationResult = validateTourRequest(name, pointsToVisit, date, tourDescription);
    if (!validationResult) {
        return res.status(400).json({ status: false, message: 'Invalid tour request data.' });
    }

    try {
        await TourModel.create({
            name,
            pointsToVisit,
            date,
            tourCreator: userId,
            tourDescription
        });
        return res.status(201).json({ status: true, message: 'Tour has been created successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Failed to create tour. Please try again later.' });
    }
});

const updateTour = asyncHandler(async (req, res) => {
    const userId = req.params.userID;
    const tourId = req.params.tourID;
    const { name, pointsToVisit, date, tourDescription } = req.body;
    let [status, message] = await validateUser(userId);
    if (!status) {
        return res.status(404).json({ status: false, message: message });
    }

    const validationResult = validateTourRequest(name, pointsToVisit, date, tourDescription);
    if (!validationResult) {
        return res.status(400).json({ status: false, message: 'Invalid tour request data.' });
    }
    const tour = await TourModel.findById(tourId);
    if (!tour) {
        return res.status(404).json({status:false,message: 'Cannot find this tour.'});
    }
    try {
        tour.name = name;
        tour.pointsToVisit = pointsToVisit;
        tour.date = date;
        tour.tourDescription = tourDescription;
        await tour.save();
        return res.status(201).json({ status: true, message: 'Tour has been updated successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Failed to create tour. Please try again later.' });
    }

})
const removeTour = asyncHandler(async (req, res) => {
    const userId = req.params.userID;
    const tourId = req.params.tourID;
    let [status, message] = await validateUser(userId);
    if (!status) {
        return res.status(404).json({ status: false, message: message });
    }
    const tour = await TourModel.findById(tourId);
    if (!tour){
        return res.status(404).json({ status: false, message: 'This tour does not exist!' });
    }
    if (tourId.toString() !== tour.id.toString()){
        return res.status(401).json({ status: false, message: 'You cannot delete someone\'s trips!' });
    }
    try {
        await tour.deleteOne();
        return res.status(201).json({ status: true, message: 'Tour has been deleted successfully!' });

    }
    catch (e) {
        console.log(e)
    }
})

function validateTourRequest(...requestBody) {
    for (let requestItem of requestBody) {
        if (!requestItem || requestItem === '') {
            return false;
        }
    }
    return true;
}
export { getTours,createTour,updateTour,removeTour };
