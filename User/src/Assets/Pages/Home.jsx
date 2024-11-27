import FamousThings from "../Component/Home_components/FamousThings";
import History from "../Component/Home_components/History";
import Slider from "../Component/Home_components/Slider";
import States from "../Component/Home_components/StateHeader";
import TopReels from "../Component/Home_components/TopReels";
import "./css/home.css";



const Home = () => {

  return (
    <>
      {/* Home */}
      <States />
      <Slider />
      <History />
      <FamousThings />
      <TopReels />
    </>

  )
}

export default Home;