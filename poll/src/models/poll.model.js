import {mongoose , Schema, SchemaType} from "mongoose";
import {User} from "./user.model.js"


const OptionSchema = new Schema({

    optionText:{
        type:String,
        required:true,
        trim:true
    }
});

const PollSchema = new Schema({

    questionText:{
        type:String,
        required:true,
        trim:true
    },

    options:[
        {
            type: Schema.Types.ObjectId,
            ref:"Option"
        }
    ],

    createdBy:{
        type:String,
        required:true,
    },

    correctOption:{
        type:Schema.Types.ObjectId,
        ref:"Option"
    },

    votes:[
        [{
            type:String,
            required:true,
        } , { type:Schema.Types.ObjectId , ref:"Option" }]
    ]



},{timestamps:true});


const Poll = mongoose.model("Poll" , PollSchema);
const Option = mongoose.model("Option" , OptionSchema);

export {Poll , Option};
