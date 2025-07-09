import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import './App.css';
import Contact from './Components/Contact'
import About from './Components/About'
import Admin from './Components/Admin'
import AddPatient from './Components/AddPatient'
import ViewPatients from './Components/ViewPatients'
 
function App() {
  const [count, setCount] = useState(0)

  return (
    
      <div>
        <Navbar/>
        <Routes>
          <Route path="/l" element={<Login/>}/>
          <Route path="/s" element={<Signup/>}/>
          <Route path="/" element={<Home/>}/>
           <Route path="/c"element={<Contact/>}/>

           <Route path="/about"element={<About/>}/>
          <Route path="/n" element={<Admin/>}/>
          <Route path="/a" element={<AddPatient/>}/>
          <Route path="/v" element={<ViewPatients/>}/>
        </Routes>

      </div>
      
  )
}

export default App
