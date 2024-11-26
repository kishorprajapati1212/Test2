// import React from "react";
// // import Navbar from "./Header_com/Navbar"
// import Category from "../Category";


// const Food = () => {
  
//   return (
//     <>
//     {/* <Navbar/> */}
// {/* <h1 style={{align:"center"}}> Festivals </h1> */}

// <Category  />
//     </>
//   );
// };

// export default Food;


// import React from "react";
// import Category from "../Category";
// import { categories } from "../CategoryData"; // Import category data
// import Navbar from "../../Header_com/Navbar";

// const Food = () => {
//   return (
//     <>
//     <Navbar />
//       <Category data={categories.festivals} />
//     </>
//   );
// };

// export default Food;


import React from "react";
import Navbar from "../../Header_com/Navbar";
// import "../Food/food.css";
import "../category.css";
// import Navbar from "../Header_com/Navbar";
// import { Categories } from "../Data/data"; // Import your data

const Food = () => {
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
              <h2 style={{ color: "black", fontWeight: 50 }}>Khaman</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                 src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Food"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Thepla</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Places"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Chorafali</h2>
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
              <h2 style={{ color: "black", fontWeight: 50 }}>Handvo</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="History"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Undhiyu</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                 src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Origin"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Khandvi</h2>
            </div>
            </div>
            </div>
    </>
  );
};

export default Food;




