// import FamousThings from "../Component/Home_components/FamousThings";
// import History from "../Component/Home_components/History";
// import Slider from "../Component/Home_components/Slider";
// import States from "../Component/Home_components/StateHeader";
// import TopReels from "../Component/Home_components/TopReels";
// import "./css/home.css";
import Product from "../../../Old_UI_Coponents/Home_components/Product";
import Attraction from "../Component/New_Home_page/Attr";
import ShortsPage from "../Component/New_Home_page/ShortsPage";
import Slider from "../Component/New_Home_page/Slider";
import State_Home from "../Component/New_Home_page/State_Home";


// const Kp_Home = () => {

//   return (
//     <>
//       {/* Home */}
//       <Product />
//       {/* <States />
//       <Slider />
//       <History />
//       <FamousThings />
//       <TopReels /> */}
//     </>

//   )
// }

const Home = () => {

  return (
    <>
      {/* Home */}
      <Slider />
      <State_Home />
      <Attraction />
      <ShortsPage />
      <Product />
    
    </>

  )
}

export default Home;