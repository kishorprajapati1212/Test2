import React from "react";
import "../home_com/home.css";
import "./category.css";
// import Navbar from "../Header_com/Navbar";
// import { Categories } from "../Data/data"; // Import your data


const Category = () => {
  return (
    <>
{/* <Navbar/> */}
{/* <h1 style={{align:"center"}}>  </h1> */}
<div className="row">
          <div className="column">
            <div className="card">
              <img
                src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Festivals"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Festivals</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                 src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Food"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Food</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Places"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Places</h2>
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
              <h2 style={{ color: "black", fontWeight: 50 }}>Product</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="History"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>History</h2>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                 src="/Photes/UT.jpg"
                style={{ width: "70%" }}
                alt="Origin"
              />
              <h2 style={{ color: "black", fontWeight: 50 }}>Origin</h2>
            </div>
            </div>
            </div>
    </>
  );
};

export default Category;

// import React from "react";
// import "./category.css";
// import Navbar from "../Header_com/Navbar";
// import "../home_com/home.css";

// const Category = ({ data }) => {
//   return (
//     <>
//       <Navbar />
//       <div className="row">
//         {data.map((item, index) => (
//           <div key={index} className="column">
//             <div className="card">
//               <img
//                 src={process.env.PUBLIC_URL + item.image} // Use PUBLIC_URL for images in the public folder
//                 alt={item.title}
//                 style={{ width: "70%" }}
//               />
//               <h2 style={{ color: "black", fontWeight: 500 }}>{item.title}</h2>
//               <p style={{ color: "gray", opacity: "0.8" }}>{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
    
//     </>
//   );
// };

// export default Category;

