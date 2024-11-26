import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Reactdom from './Reactdom';
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
        
          <Reactdom />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;
