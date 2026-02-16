import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../constants.js'



export default function Home() {

    const navigate = useNavigate();

    const [pollData , setPollData] = useState({
        hostUsername:localStorage.getItem("username"),
        questionText:"",
        no_of_options:2,
        options:["","","","",""],
        correctOption:1
      })
      const [joinData , setJoinData] = useState({
        link:"",
      });

      const [pollLink , setPollLink] = useState(null);

      const handleJoinData = (e)=>{
        setJoinData((prev)=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        });
      }

      const handleJoinPoll = ()=>{
        console.log(joinData.link);
        if(joinData.link.trim() === ""){
            alert("Poll link cannot be empty");
            return;
        }

        navigate(`/polls/${joinData.link.split("/").slice(-1)[0]}`);
      }

    const handleChangeData = (e)=>{
    setPollData((prev)=>{
      return {
        ...prev,
        [e.target.name]:e.target.value
      }
    });
  }
    const handleChangeOptions = (e)=>{
    const index = e.target.name ;
    const value = e.target.value ;
    setPollData((prev)=>{
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return {
        ...prev,
        options:newOptions
      }
    })
    // console.log(index);
  }
    const validateData=(data)=>{
    const {questionText , options , correctOption , no_of_options} = data;
    console.log(data);

    if( !questionText || correctOption<=0 || correctOption>no_of_options){
      return false;
    }

    let cnt=0;
    for(let option of options){
      if(!option && cnt < data.no_of_options){
        return false;
      }
      cnt++;
    }
    return true;
  }
    const handleStartPoll = async()=>{
    // console.log(pollData);
    if(!validateData(pollData)){
      alert("Please fill all the fields correctly");
      return ;
    }

    //send data to backend to start a poll and generate a poll link

    const response = await fetch(`${API_URL}/polls/create-poll`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(pollData)
    });

    const data = await response.json();
    if(data.success){
        let pollLink = `https://shareable-poll-frontend.onrender.com/polls/${data.pollID}`;
        setPollLink(pollLink);
        setJoinData((prev)=>{
          return {
            ...prev,
            link:pollLink
          }
        })
    }
}

    return (
        <div className="main-container">

            {/* split the page into two halves 
            one side create new poll
            other side join with poll link */}

            <div className='left-container'>
                <h1>Create New Poll</h1>
                <div>
                    <label>Enter question</label>
                    <input type="text" placeholder="Enter question" name="questionText" value={pollData.questionText} onChange={(e)=>handleChangeData(e)}/>
                    <label>Enter number of options</label>
                    
                    <input type="number" min={2} max={4} placeholder="Enter number of options" name="no_of_options" value={pollData.no_of_options} onChange={(e)=>handleChangeData(e)}/>
                    <label>Enter options</label>
                        {Array.from({length:pollData.no_of_options}, (_,i)=>(
                        <input key={i} type='text' placeholder={`Option ${i+1}`} name={i+1} onChange={(e)=>handleChangeOptions(e)}/>
                        ))}
                    <label>Enter correct option number</label>
                    <input type="number"min={1} max={pollData.no_of_options} placeholder="Enter correct option" name="correctOption" value={pollData.correctOption} onChange={(e)=>handleChangeData(e)}/>
                    <button onClick={handleStartPoll}>Start Poll</button>

                    {pollLink && <div className='poll-link' onClick={() => navigator.clipboard.writeText(pollLink)}>
                        <p>Poll Link : {pollLink}</p>
                    </div>}
                </div>

            </div>

            <div className='right-container'>
                <h1>Join Poll</h1>
                <div>
                  <label>Enter poll link</label>
                    <input type="text" name='link' value={joinData.link} onChange={(e)=>handleJoinData(e)}></input>
                    <button onClick={handleJoinPoll}>Join Poll</button>
                </div>
            </div>
        </div>
    )
}
