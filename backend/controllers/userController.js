import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel.js"
import {validateUser} from "../middlewares/validateUser.js";
import bcrypt from "bcrypt";

const getUserData = asyncHandler(async(req,res)=>{
    const userId = req.params.userID;
    const [status, message] = await validateUser(userId);
    if(!status){
        return res.json({
            message: message
        });
    }
    const user = await UserModel.findById(userId);
    return res.json({
        status: status,
        data:user
    });
})
const createUser = asyncHandler(async(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const [status, message] = await validateRequest(userId);
    if(status) {
        return res.json({
            message: message
        });
    }
    const hashedPassword =  await bcrypt.hash(password,10);
    try {
        await UserModel.create({
            username,
            email,
            password: hashedPassword
        }).then(()=>{
            return res.json({
                message: "User created succesfully!"
            })
        })
    }
    catch (e) {
        console.log('error\n',e)
    }
});
const updateUser = asyncHandler(async(req,res)=>{
    const userId = req.params.userID;
    const [status, message] = await validateUser(userId);
    if(!status) {
        return res.json({
            message: message
        });
    }
    await UserModel.findById(userId);
    try {
       await UserModel.findByIdAndUpdate(userId);
        return res.json({
            message: 'User has been updated succesfully!'
        })
    }catch (e) {
        return res.json({
            message: e
        })
    }
})
const removeUser = asyncHandler(async(req,res)=>{
    const userId = req.params.userID;
    const [status, message] = await validateUser(userId);
    if(!status) {
        return res.json({
            message: message
        });
    }
    const user = await UserModel.findById(userId);
   try {
       await user.deleteOne();
       return res.json({
           message: "User removed succesfully!"
       })
   }catch (e) {
       return res.json({
           message: e
       })
   }
})
export {getUserData,createUser,updateUser,removeUser}