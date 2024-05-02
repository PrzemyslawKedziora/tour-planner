import asyncHandler from "express-async-handler";
import {TourModel} from "../models/tourModel.js";
import {validateRequest} from "../middlewares/validateUser.js";

const getTours = asyncHandler(async (req, res) => {
    const userId = req.params.userID;
    const [status, message] = await validateRequest(userId);
    const tours = await TourModel.find({userId: userId});

    return res.json({
        status:status,
        data: tours
    });
});

export { getTours };
