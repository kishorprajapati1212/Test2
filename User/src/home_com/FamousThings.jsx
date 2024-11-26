import React from 'react';
import './Famousthings.css'

const FamousThings = () => {
    return (
        <div className="FamousThings">
            <p>Famous Things</p>
            <div className="Fthings_card">
                <div className="card_area">
                    <div className="festivals cardF">
                        <div className="imgFest"></div>
                        <p>Festivals</p>
                    </div>
                    <div className="products cardF">
                        <div className="prod"></div>
                        <p>Products</p>
                    </div>
                    <div className="food cardF">
                        <div className="imgFood"></div>
                        <p>Food</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FamousThings;