import { asyncHandler } from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { Poll } from "../models/poll.model.js"
import { Option } from "../models/poll.model.js"
// import crypto from "crypto"



const createNewPoll = asyncHandler(async (req,res)=>{
    const {hostUsername , questionText , options , correctOption} = req.body

    //recieve validated data from frontend
    //upload to db

    //creare options in db
    console.log(options);

    let optionIds = [];
    for(let optionText of options){{
        if(!optionText) continue;
        const option = await Option.create({
            optionText
        })
        optionIds.push(option._id);
    }}
    console.log(optionIds);

    const poll = await Poll.create({
        questionText,
        options:optionIds,
        correctOption:optionIds[correctOption],
        createdBy:hostUsername,
        votes:[]
    })

    const pollID = poll._id;

    // const pollLink = `http://localhost:3000/polls?pollID=${pollID}`;
    // console.log(pollLink);

    res.status(201).json({
        success:true,
        message:"Poll created successfully",    
        pollID
    })

})

const getPollById = asyncHandler(async (req,res)=>{
    const {pollId} = req.params;

    const poll = await Poll.findById(pollId).populate("options").populate("correctOption");

    if(!poll){
        throw new apiError(404 , "Poll not found");
    }

    res.status(200).json({
        success:true,
        poll
    })
});


const voteInPoll = asyncHandler(async (req,res)=>{ 
    const {pollId} = req.body;
    const {username} = req.body;
    const {optionId} = req.body;


    const poll = await Poll.findById(pollId);

    if(!poll){
        throw new apiError(404 , "Poll not found");
    }

    const vote = [username , optionId];

    poll.votes.push(vote);
    const newPoll = await poll.save();

    res.status(200).json({
        success:true,
        message:"Vote submitted successfully",
        poll:newPoll
    })
 })
export {createNewPoll , getPollById , voteInPoll};