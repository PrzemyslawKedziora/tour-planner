import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel.js"
import validateUser from "../middlewares/validateUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const loginUser = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const user = await UserModel.findOne({email});
    if (!user){
        return res.json({
            status: false,
            data:"This user does not exist!"
        });
    }
    const userData = {
        id: user.id,
        username: user.username,
        email: user.email
    }
    const accessToken = jwt.sign(
        { user: userData },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "100m" }
    );
    return res.json({
        status: true,
        token:accessToken,
        userId: userData.id || null,
    });

});
const createUser = asyncHandler(async(req,res)=>{
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
    }
    const user = await UserModel.findOne({email});
    if (user){
        return res.status(409).json({
            status:true,
            message:"This user already exist!"
        })
    }
    const hashedPassword =  await bcrypt.hash(password,10);
    try {
        await UserModel.create({
            username: username,
            email: email,
            password: hashedPassword
        }).then(()=>{
            return res.status(201).json({
                message: "User created successfully!"
            });
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
export {getUserData,loginUser,createUser,updateUser,removeUser}