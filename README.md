Title : Shareable Poll application  

Purpose : Create Polls and share link among peers , get realtime results of the poll.  

Demo Video : https://drive.google.com/file/d/1YvpAlSs3yecAred7E-UqUBLoltRv07Rj/view?usp=sharing
(any delay in live results would be due to backend server delays of render)  
Demo Link : https://shareable-poll-frontend.onrender.com/  
(Backend might take 30-50 seconds to spin up as I am on free tier account)  

Key features:  
#1. Username based poll creation (username has to be unique) , no authentication required.  
#2. Get instant link for poll that can be shared and multiple users can join.  
#3. Real-time result updation .  
#4. Polls can be used later also , link doesn't expire.  


Two anti-abuse mechanisms used:  
#1 . Unique username based access , so that more than one submission cannot be made .   
    Implemented by storing the username in browser's localStorage and checking on submission whether there is already a submisson for this username or not for a particular poll.  
    ->Limitation : Same person can create multiple accounts using differnt browsers or can clear username in localStorage and add new one .  

#2 . Rate Limiting for poll creation: One user can only create 5 ( can be any number) per hour. This limits users from spamming servers with many polls.  
    ->Limitation : Same user can user different username by clearing localStorage and create more than 5 polls.  

Some Edge Cases Handled:    

#1.Input Validation : Handled empty inputs throughout the frontend codebase to ensure clean and complient data for Backend.  
#2.Error handling : Alerts implemented for cases where an action led to errors.  
#3. Rate Limiting : In cases where poll creation exceeded limit.  


Improvements that can be made:  
#1 . Ip address based account creation can be done , so that each Ip can create only one or few accoutns .  
    This will solve both of the above issues of abuses.      
#3. Check for existence of user can be implemented so that if a user tries to make submission after altering their username in localStorage , this new username can be checked in DB for its existence.  
#2 . Another alternative solution : Instead of localStorage , cookies + JWT can be used . Username can be extracted from cookies and then verification of submission can be performed .  


Tech Stack:  
#1. Backend : Nodejs , Expressjs, MongoDb  
#2. Frontend : Reactjs, CSS , Vite  
#3. Deployment : Render, git , github.  
#4. AI tools : Co-pilot(tab completions)  ,  Windsurf (UI elements)  



Steps to run Locally:
1. git clone <url-of-this-repository>
2. cd Shareable-Poll
        #Backend
           -cd poll -> npm install
           -create a .env file with credentials (refer demo .env)
           -node src/app.js
       #frontend
           -cd pollFrontEnd -> npm install
           -change the API_URL to http://localhost:3000
           -change shareLink url to frontend's url
           -npm run dev
   

