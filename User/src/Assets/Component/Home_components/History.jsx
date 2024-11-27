import React from 'react';
import { Link } from 'react-router-dom';
import './css/History.css';

const History = () => {
    const cardDetails = [
        { title: "war_history", image: "/Slider_img/W5.jpg" },
        { title: "origin_history", image: "/Slider_img/W6.jpg" },
    ];

    return (
        <div className="history_card">
            <div className="title">History</div>
            <div className="cards">
                {cardDetails.map((card, index) => (
                    <div key={index} className="card">
                        <div className="card_image">
                            <img src={card.image} alt={card.title} />
                        </div>
                        <div className="card_content">
                            <p>{card.title.replace('_', ' ').toUpperCase()}</p>
                            <Link to={`/All_state/${card.title}`}>
                                <button>Learn More</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
