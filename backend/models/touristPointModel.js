const mongoose = require('mongoose');

const touristPointSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            min:5,
            max:100
        },
        dateToVisit:{
            type:Date,
            required:true,
            default: Date.now()
        },
        placeAddress:{
            type:String,
            required:true,
            min:10,
            max:100
        },
        note:{
            type:String,
            required:false,
            max:255
        }
    }
)
module.exports = mongoose.model("TouristPoint",touristPointSchema);