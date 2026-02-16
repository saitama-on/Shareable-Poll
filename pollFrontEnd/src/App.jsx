import {Routes , Route} from 'react-router-dom'
import Home from '../pages/home.jsx'
import PollPage from '../pages/poll.jsx'
import UsernamePage from '../pages/username.jsx'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function App() {

  const navigate = useNavigate();
  useEffect(()=>{
    const username = localStorage.getItem("username");
    if(!username){
      navigate("/choose-username");
    }
  },[])


  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/polls/:pollID' element={<PollPage/>}/>  
      <Route path='/choose-username' element={<UsernamePage/>}/>
    </Routes>
  )
}

export default App
