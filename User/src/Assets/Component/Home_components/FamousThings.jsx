import React from 'react';
import { Link } from 'react-router-dom';
import './css/FamousThings.css';

const FamousThings = () => {
    const cardDetails = [
        { title: "festival", image: "/Slider_img/F5.jpg" },
        { title: "food", image: "/Slider_img/K4.jpg" },
        { title: "place", image: "/Slider_img/P2.jpg" },
       
    ];

    return (
        <div className="FamousThings">
            <div className="title">Famous Things</div>
            <div className="Fthings_card">
                <div className="card_area">
                    {cardDetails.map((card, index) => (
                        <div key={index} className="card">
                            <div className="card_image">
                                <img src={card.image} alt={card.title} />
                            </div>
                            <div className="card_content">
                                <p>{card.title}</p>
                                <Link to={`/All_state/${card.title}`}>
                                    <button>Learn More</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FamousThings;
