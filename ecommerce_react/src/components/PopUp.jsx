import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase';
import './PopUp.css';

const PopUp = ({ product, onClose }) => {
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (product && product.id) {
            const fetchProductDetails = async () => {
                try {
                    const productRef = doc(db, "products", product.id);
                    const productSnap = await getDoc(productRef);

                    if (productSnap.exists()) {
                        setProductDetails({ id: productSnap.id, ...productSnap.data() });
                    } else {
                        console.error("No such product found in Firestore!");
                    }
                } catch (error) {
                    console.error("Error fetching product details:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProductDetails();
        }
    }, [product]);

    if (!product) return null;

    if (loading) {
        return (
            <div className="popup-overlay">
                <div className="popup-content">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!productDetails) {
        return (
            <div className="popup-overlay">
                <div className="popup-content">
                    <p>Product not found.</p>
                    <button className="close-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <img src={productDetails.image} alt={productDetails.name} className="popup-image" />
                <h3 className="popup-name">{productDetails.name}</h3>
                <p className="popup-description">{productDetails.description}</p>
                <p className="popup-price">{`$${productDetails.price}`}</p>
                <button className="buy-btn">BUY</button>
                <h3 className="popup-sku">{`SKU:${productDetails.sku}`}</h3>
            </div>
        </div>
    );
};

export default PopUp;
