import React from 'react'
// import Theme from './Theme.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Assets/Pages/Home.jsx'
import Login from './Assets/Pages/User_Login/Login.jsx'
// import About from './Assets/Pages/About.jsx'
import Navbar from './Assets/Component/Navbar.jsx'
import Sign from './Assets/Pages/User_Login/Sign.jsx'
import Forgot from './Assets/Pages/User_Login/Forgot.jsx'
import Profilehome from './Assets/Pages/Profile/Profilehome.jsx'
import Profilepayemnt from './Assets/Pages/Profile/Profilepayemnt.jsx'
import Videohistroy from './Assets/Pages/Profile/Videohistroy.jsx'
import Imagehistory from './Assets/Pages/Profile/Imagehistory.jsx'
import Imagegen from './Assets/Pages/Imagegen.jsx'
import Videogen from './Assets/Pages/Videogen.jsx'
import Testvideogen from './Assets/Pages/Testvideogen.jsx'
import Skyboxgen from './Assets/Pages/Skyboxgen.jsx'
import { Test } from './CSS/Test.jsx'
import VideoGenerator from './Assets/Pages/Testvideogen.jsx'


export const Approute = () => {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* ------------------------ LoginRoutes -------------------------------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Sign />} />
          <Route path="/forgotpas" element={<Forgot />} />

          {/* ---------------------------- Profile --------------------------------- */}
          <Route path="/profile/home" element={<Profilehome />} />
          <Route path="/profile/image" element={<Imagehistory />} />
          <Route path="/profile/video" element={<Videohistroy />} />
          <Route path="/profile/billing" element={<Profilepayemnt />} />

          {/* ------------------------------ Genartion Paths ------------------------------------ */}
          <Route path="/Image_generation" element={<Imagegen />} />
          <Route path="/Video_generation" element={<Videogen />} />
          <Route path="/Skybox_generation" element={<Skyboxgen />} />
          <Route path="/test_gen" element={<VideoGenerator />} />


          {/* <Route path="/Test" element={<Test />} /> */}



          {/* <Route path="/" component={About} /> */}
        </Routes>
      </Router>
    </>
  )
}
