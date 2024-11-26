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
import "../category.css";
// import { Categories } from "../Data/data"; // Import your data

const Product = () => {
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
              <h2 style={{ color: "black", fontWeight: 50 }}>Chaniya Choli</h2>
            </div>
          </div>   
          </div>
    </>
  );
};

export default Product;




