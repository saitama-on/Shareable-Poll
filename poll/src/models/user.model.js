import {mongoose , Schema} from "mongoose";
import jwt from "jsonwebtoken"


const UserSchema = new Schema(
    {

        username :{
            type:String,
            required : true,
            unique : true,
            lowercase:true,
            trim:true

        },

        ipAddress:{
            type:String,
            required:true
        }


    },{timestamps:true}

);


UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : 123456,
            username:this.username,
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User' , UserSchema)