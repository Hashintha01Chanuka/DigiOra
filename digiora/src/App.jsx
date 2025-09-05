import React from 'react'
import Navbar from './Pages/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import AboutUsPage from './Components/About'
import ServicesPage from './Components/Services'
import Footer from './Pages/Footer'
import ContactPage from './Components/Contact'


const App = () => {
  return (
    <div>

     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<AboutUsPage/>}/>
      <Route path='/services' element={<ServicesPage/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      </Routes>
     <Footer/>
       
      
    </div>
  )
}

export default App
