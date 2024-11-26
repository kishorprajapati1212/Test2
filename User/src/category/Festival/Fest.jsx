// import React from "react";
// // import Navbar from "./Header_com/Navbar"
// import Category from "../Category";


// const Fest = () => {
  
//   return (
//     <>
//     {/* <Navbar/> */}
// {/* <h1 style={{align:"center"}}> Festivals </h1> */}
// <Category/>
//     </>
//   );
// };

// export default Fest;

import React from "react";
import Navbar from "../../Header_com/Navbar";
// import "../Food/food.css";
import "../category.css";
// import Navbar from "../Header_com/Navbar";
// import { Categories } from "../Data/data"; // Import your data

const Fest = () => {
// Console.log("Indian hertage niche upper che")
  return (
    <>
<Navbar/>
{/* <h1 style={{align:"center"}}>  </h1> */}
<div className="row">
          <div className="column">
            <div className="card">
              <img
                src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Festivals"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Navratri</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                 src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Food"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Diwali</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Places"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Ran Uttsav</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="card">
              <img
                 src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Product"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Holi</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="History"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Janmastmi</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                 src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Origin"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Vautha melo</h2>
            </div>
            </div>
            </div>
    </>
  );
};

export default Fest;




