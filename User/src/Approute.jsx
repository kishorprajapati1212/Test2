import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Assets/Pages/Home.jsx'
import Navbar from './Assets/Component/Navbar'
import State_Home from './Assets/Pages/State_Home.jsx'
import Semi_State_Detail_Card from './Assets/Pages/Semi_State_Detail_Card.jsx'
import Carddetail from './Assets/Pages/Carddetail.jsx'
import All_state_detail from './Assets/Component/All_state_componet/All_state_detail.jsx'
import Signin_Home from './Assets/Pages/Signin_Home.jsx'
import UserSignin from './Assets/Component/Signin_And_Login/UserSignin.jsx'
import ArtistSignin from './Assets/Component/Signin_And_Login/ArtistSignin.jsx'
import Login from './Assets/Component/Signin_And_Login/Login.jsx'
import MapHome from './Assets/Pages/Features_pages/Map/MapHome.jsx'
import Watch_short from './Assets/Pages/Features_pages/Video/Watch_Short.jsx'
import Add_short from './Assets/Pages/Features_pages/Video/Add_short.jsx'
import Chatbot from './Assets/Pages/Chatbot.jsx'

export const Fetchuser = () =>{
  const userFromLocalStorage = localStorage.getItem("Cultrual");
  const oneuser = JSON.parse(userFromLocalStorage);

  return oneuser;
}

export const Approute = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Chatbot />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* ------------ Signin home ---------------- */}
          <Route path="/sigin_home" element={<Signin_Home />} />
          <Route path="/user_registration" element={<UserSignin />} />
          <Route path="/artist_registration" element={<ArtistSignin />} />
          <Route path="/login" element={<Login />} />
 
          {/* ------------- State Main Page ------------- */}
          <Route path="/state/:stateId" element={<State_Home />} />

          {/* ------------- State Main Page -> Category(Like: Food, history etc) ------------- */}
          <Route path="/state/:stateId/:section" element={<Semi_State_Detail_Card />} />

          {/* ------------- State Main Page -> Category -> Specific Item ------------- */}
          <Route path="/details/:stateId/:section/:itemId" element={<Carddetail />} />

          {/* ------------- Section/Category -> All state information ------------- */}
          <Route path="/All_state/:section" element={<All_state_detail />} />

          {/* -------------------- Map -------------------------- */}
          <Route path="/map" element={<MapHome />} />

          {/* --------------------------- Shorts ------------------------------- */}
          <Route path="/See_short" element={<Watch_short />} />
          <Route path="/Add_short" element={<Add_short />} />

          {/* <Route path="/" component={About} /> */}
        </Routes>
      </Router>
    </>
  )
}
