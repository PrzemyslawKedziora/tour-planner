import mongoose from "mongoose";

const tourSchema = mongoose.Schema(
    {
        name:{
            type:String,
            min:5,
            max:30,
            default:"My new trip"
        },
        pointsToVisit:[{
          type: mongoose.Schema.Types.ObjectId,
          ref:"TouristPoint"
        }],
        date:{
            type:Date,
            required:false
        },
        tourCreator:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required:true
        },
        tourDescription:{
            type:String,
            max:255,
            required:false
        }
    }
);

const TourModel = mongoose.model("Tour",tourSchema);
export {TourModel};