import "./home.css";
import Navbar from "../Header_com/Navbar";
import StateHeader from "../Header_com/StateHeader";
import FamousThings from "../home_com/FamousThings"
// import Slider from "./Slider"
import History from "./HistoryCont"
import TopReels from "./TopReels"
import Footer from "./Footer";


const Home = ()=>{
    return(  
    <>        
  <Navbar/>
<StateHeader/>
{/* <Slider/> */}
<History/>
<FamousThings/>
<TopReels/>
<Footer/>
    </>
      
    )
}

export default Home;