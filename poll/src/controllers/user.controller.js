import { asyncHandler } from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { User } from "../models/user.model.js"
//options for cookie
//if httpOnly and secure true , only sever can modify cookie
const options ={
    httpOnly:true,
    secure:true
}


const registerUser = asyncHandler(async (req, res) => {
    // 1. get detials from API call
    // 2. check if fields are non-empty else throw err
    // 3. check for duplicate email or username
    // 4. check for image and avatar
    // 5. upload image to cloudinary
    // 6. create a user object and upload uiser data
    // 7. send details to user without password and reres token

    // 1. get details
    // console.log(req.body)
    const {username} = req.body
    const ipAddress = req.ip

    console.log(ipAddress)

    // 2. checking for empty fields
    if (
        [username,ipAddress].some((field) => {
            return field?.trim() === ""
        })

    ) {
        throw new apiError(400, "Enter all fields!!");
    }


    // 3. Check for duplicate emails or username 

    // const existingUser = await User.findOne({
    //     $or: [{ username }, { ipAddress }]
    // })

    // if (existingUser) {
    //     throw new apiError(400, "email or username already taken")
    // }


    // //create new user

    const user = await User.create({
        ipAddress:ipAddress,
        username: username.toLowerCase()
    })
    // const userID = user._id;

    // const createdUser = await User.findById(user._id);
    const createdUser = {
        username:username.toLowerCase(),
        ipAddress:ipAddress,
        userID:user._id
    }

    if (!createdUser) {
        throw new apiError(500, "Something went wrong while user regsitration ")
    }


    return res.
    cookie("accessToken" ,"YASH" ,  options)
    .status(201).json(
        new apiResponse(201, createdUser, "Account Registerd Successfully!!")
    )

})

const checkUsername = asyncHandler(async(req,res)=>{
    const {username} = req.body;


    const existing = await User.findOne({username:username})

    if(existing){
        return res.status(200).json({
            success:false,
            message:"Username already taken"
        })
    }

    return res.status(200).json({
        success:true,
        message:"Username is available"
        })
    });


export {
        registerUser , 
        checkUsername
    }