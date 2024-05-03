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

export { getTours };
