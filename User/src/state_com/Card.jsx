import React from "react";
import "../home_com/home.css";
import "./Card.css"


const Card = () => {
  return (
    <>
        <div className="about">
          <h4>About State:</h4>
          <p>
            Gujarat is a state along the western coast of India. Its coastline
            of about 1,600 km is the longest in the country, most of which lies
            on the Kathiawar peninsula...
          </p>
        </div>

        {/* Cards Section */}
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

export default Card;
