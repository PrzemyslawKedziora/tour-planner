import {UserModel} from "../models/userModel.js";

export async function validateUser(userId) {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return [false, 'This user does not exist!'];
        }
        return [true, 'This user exists.'];
    } catch (error) {
        console.error(error);
        return [false, 'An error occurred while validating user.'];
    }
}