import React from 'react'
// import Theme from './Theme.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Assets/Pages/Home.jsx'
import Navbar from './Assets/Component/Navbar'
import State_Home from './Assets/Pages/State_Home.jsx'
import Semi_State_Detail_Card from './Assets/Pages/Semi_State_Detail_Card.jsx'
import Carddetail from './Assets/Pages/Carddetail.jsx'
import All_state_detail from './Assets/Component/All_state_componet/All_state_detail.jsx'

export const Approute = () => {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* ------------- State Main Page ------------- */}
          <Route path="/state/:stateId" element={<State_Home />} />

          <Route path="/state/:stateId/:section" element={<Semi_State_Detail_Card />} />
          <Route path="/details/:stateId/:section/:itemId" element={<Carddetail />} />

          <Route path="/All_state/:section" element={<All_state_detail />} />

          {/* <Route path="/" component={About} /> */}
        </Routes>
      </Router>
    </>
  )
}
