import { useState } from 'react'
import { Approute } from './Approute'
import { Box } from '@mui/material'
import Footer from './Assets/Component/Footer'

function App() {

  return (
    <>
      <Box sx={{  backgroundSize: "cover", width: "100%", border:"1px solid black" }}>

        <Approute />
        <Footer />
      </Box>

    </>
  )
}

export default App
