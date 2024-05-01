import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

const getTours = asyncHandler(async (req, res) => {
    const userID = req.query.userId;
    return res.json({
        response: 'its working!'
    });
});

export { getTours };
