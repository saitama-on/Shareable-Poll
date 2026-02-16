import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../src/styles/username.css'
import {API_URL} from '../constants.js'


export default function UsernamePage(){

    const [username , setUsername] = useState("");
    // const [validUsername , setValidUsername] = useState(false);
    const navigate = useNavigate();

    const handleContinue = async()=>{
        if(username.trim() === ""){
            alert("Username cannot be empty");
            return;
        }

        //check if username is already taken in db

        const response = await fetch(`${API_URL}/users/check-username`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:username
            })
        })
        const data = await response.json();
        if(data.success){
            // alert("Username is available");

            //if username is availabe register this user 
            //and save username in localSorage and navigate to home page

            const registerResponse = await fetch(`${API_URL}/users/register` , {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username:username
                })
            });

            const registerData = await registerResponse.json();
            console.log(registerData);
            if(registerData.success){
                localStorage.setItem("username" , username);
                navigate("/");
            }
        

        }else{
            alert("Username is already taken");
            setUsername("");
        }
    }
    return (
        <div className="username-container">
            <h1>Choose a username</h1>
            <input type="text" placeholder="Enter username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <button onClick={handleContinue}>Continue</button>
        </div>
    )
}