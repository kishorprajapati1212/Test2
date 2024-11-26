import React from 'react';
import './History.css'

const History = () => {
    return (
        <div className="history_card">
            <div className="title">History</div>
            <div className="cards">
                <div className="war">
                    <div className="war_internal">
                        <p>WAR</p>
                        <button>Learn More</button>
                    </div>
                </div>
                <div className="origin">
                    <div className="og_internal">
                        <p>Origin</p>
                        <button>Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;