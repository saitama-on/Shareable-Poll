import React from 'react'
import {useState , useEffect} from 'react'
import '../src/styles/poll.css'
import {API_URL} from '../constants.js'



export default function PollPage(){

    //fetch poll data using pollId
    const pollId = window.location.pathname.split("/")[2];

    const [pollData , setPollData] = useState({
        questionText:"",
        options:[],
        correctOption:0,
        createdBy:"",
        votes:[]
    })

    const [correctVotes , setCorrectVotes] = useState([]);
    const [inCorrectVotes , setInCorrectVotes] = useState([]);


    useEffect(()=>{
        const fetchPollData = async()=>{
            const response = await fetch(`${API_URL}/polls/${pollId}`);
            const data = await response.json();
            setPollData(data.poll);
            await console.log(data.poll.options)
        }
        fetchPollData();
        updateVotes();
        
    },[])

    const updateVotes = async()=>{
        // const pollId = window.location.pathname.split("/")[2]; 

        const response = await fetch(`${API_URL}/polls/${pollId}`);
        const data = await response.json();
        
         const correctOptionId = data.poll?.correctOption?._id;
        // console.log(correctOptionId);
        const correctVotes = data.poll.votes?.filter(vote=>vote[1] === correctOptionId);
        const inCorrectVotes = data.poll.votes?.filter(vote=>vote[1] !== correctOptionId);
        // console.log(correctVotes);
        setCorrectVotes(correctVotes);
        setInCorrectVotes(inCorrectVotes);
    }


    //real-time updates 
    //checks for new votes every 5 seconds and updates the results section
    setTimeout(()=>{
        updateVotes();
    },5000 )


    //poll submit first checks if user has already voted 
    //do a db lookup for this poll's votes and check if user name present 
    //if yes then don't allow vote to submit
    //else submit the vote and save username in votes collection for this poll
    const handlePollSubmit = async()=>{

        const username = localStorage.getItem("username");
        await updateVotes();

        const votes = pollData.votes;
        for(let vote of votes){
            if(vote[0] === username){
                alert("You have already voted in this poll");
                return ;
            }
        }
        
            const voteResponse = await fetch(`${API_URL}/polls/vote` , {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    pollId,
                    username,
                    optionId:pollData.selectedOption
                })
            })

            const voteData = await voteResponse.json();
            // console.log(voteData);
            if(voteData.success){
                alert("Vote submitted successfully");
                // setPollData(voteData.poll);
                await updateVotes();
            }
        
        
    }

    return (

        <div>
            <div>
                <p>Poll created by : {pollData.createdBy}</p>
                <a href="/">Back to Home</a>
            </div>
            <div className="poll-container">

                <div className='poll-section'>

                    <div className='question-container'>
                        <h2>{pollData.questionText}</h2>
                    </div>

                    <div className='options-container'>
                        {pollData.options.map((option , index)=>{
                            return (
                                <div key={index} className='option'>
                                    <input type="radio" name="option" id={`option${index}`} value={option._id} onChange={(e)=>setPollData({...pollData , selectedOption: e.target.value})}/>
                                    <label htmlFor={`option${index}`}>{option.optionText}</label>
                                </div>
                            )
                        })}
                    </div>

                    <button onClick={handlePollSubmit}>Submit</button>
                </div>


                <div className='results-section'>
                    {/* display poll results here in realtime using ws */}

                    <div className="results-card correct">
                        <h3>Correct Votes: {correctVotes?.length || 0}</h3>
                        <ol className="votes-list custom-scrollbar">
                            {correctVotes?.map((vote , index)=>{
                                return (
                                    <li key={index}>{vote[0]}</li>
                                )
                            })}
                        </ol>
                    </div>

                    <div className="results-card incorrect">
                        <h3>Incorrect Votes: {inCorrectVotes?.length || 0}</h3>
                        <ol className="votes-list custom-scrollbar">
                            {inCorrectVotes?.map((vote , index)=>{
                                return (
                                    <li key={index}>{vote[0]}</li>
                                )
                            })} 
                        </ol>
                    </div>
                </div>

            
            </div>
        </div>
        
    )
}