import React, { useState, useEffect } from 'react';
import './Products.css'; 
import PopUp from './PopUp';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, "products");
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log("Fetched products:", productsList);
                setProducts(productsList); 
                console.error("Error fetching products from Firestore:", error);
            }finally {
                setLoading(false); 
            }
        };
    
        fetchProducts();
    }, []);

    if (loading) {
        return(
            <div>
                <img src="https://i.gifer.com/ZKZg.gif" alt="Loading..." className='loading' />
            </div>
        );
    }


    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    return (
        <div>
            <div className="product-grid">
                {products.length === 0 && <p>No products available.</p>}
                {products.map(product => (
                    <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">${product.price}</p>
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <PopUp product={selectedProduct} onClose={handleClosePopup} />
            )}
        </div>
    );
};

export default Products;
