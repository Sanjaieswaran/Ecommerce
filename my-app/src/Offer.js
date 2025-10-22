import React from "react";
import './Offer.css';

function Offer() {
    return (
<section id="offers" aria-label="Promotional Offers">
    <h2>New Year Sale</h2>
    <div className="slider-container" role="region" aria-live="polite" aria-atomic="true">
        <div className="offer-text">
             50% off on all mobile phones! Grab yours before the sale ends! 
        </div>
    </div>
    <div className="class-grid">
        <div className="class-item" tabindex="0" aria-label="OnePlus Mobile Offer: ₹30,000 reduced to ₹25,000">
            <img src="images/1+.jpeg" alt="OnePlus Mobile" />
            <h3>OnePlus Mobile</h3>
            <p><del>₹30,000.00</del> <strong>₹25,000.00</strong></p>
        </div>
        <div className="class-item" tabindex="0" aria-label="Apple iPhone Offer: ₹100,000 reduced to ₹70,000">
            <img src="images/apple.jpeg" alt="Apple iPhone" />
            <h3>Apple iPhone</h3>
            <p><del>₹100,000.00</del> <strong>₹70,000.00</strong></p>
        </div>
        <div className="class-item" tabindex="0" aria-label="Vivo Mobile Offer: ₹20,000 reduced to ₹10,000">
            <img src="images/vivo.jpeg" alt="Vivo Mobile" />
            <h3>Vivo Mobile</h3>
            <p><del>₹20,000.00</del> <strong>₹10,000.00</strong></p>
        </div>
        <div className="class-item" tabindex="0" aria-label="Preethi Mixture Offer: ₹20,000 reduced to ₹15,000">
            <img src="images/preethi.jpeg" alt="Preethi Mixture" />
            <h3>Preethi Mixture</h3>
            <p><del>₹20,000.00</del> <strong>₹15,000.00</strong></p>
        </div>
        <div className="class-item" tabindex="0" aria-label="Realme Mobile Offer: ₹30,000 reduced to ₹25,000">
            <img src="images/relme.jpeg" alt="Realme Mobile" />
            <h3>Realme AC</h3>
            <p><del>₹30,000.00</del> <strong>₹25,000.00</strong></p>
        </div>
        <div className="class-item" tabindex="0" aria-label="OnePlus Mobile Offer: ₹30,000 reduced to ₹25,000">
            <img src="images/pickachu.jpg" alt="OnePlus Mobile" />
            <h3>Pickachu Mobile</h3>
            <p><del>₹50.00</del> <strong>₹10.00</strong></p>
        </div>
        <div className="class-item" tabindex="0" aria-label="Apple iPhone Offer: ₹100,000 reduced to ₹70,000">
            <img src="images/miw.jpeg" alt="Apple iPhone" />
            <h3>MI Washing MachineiPhone</h3>
            <p><del>₹100,000.00</del> <strong>₹70,000.00</strong></p>
        </div>
        <div className="class-item" tabindex="0" aria-label="Vivo Mobile Offer: ₹20,000 reduced to ₹10,000">
            <img src="images/redmi.jpeg" alt="Vivo Mobile" />
            <h3>Redmi Mobile</h3>
            <p><del>₹20,000.00</del> <strong>₹10,000.00</strong></p>
        </div>
    </div>
</section>
    );
}
export default Offer;