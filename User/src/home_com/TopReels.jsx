import React from 'react';
import './Reels.css'
const TopReels = () => {
    return (
        <div className="reels">
            <p>Top reels</p>
            <div className="reels_card">
                <div className="card_area">
                    <div className="reel1 cardr">
                        <div className="r1">
                            <video controls>
                                <source src="" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className="reel2 cardr">
                        <div className="r2">
                            <video controls>
                                <source src="" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className="reel3 cardr">
                        <div className="r3">
                            <video controls>
                                <source src="" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopReels;