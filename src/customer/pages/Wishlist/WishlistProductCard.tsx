import React, { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../../types/productTypes';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import { addProductToWishlist } from '../../../Redux Toolkit/Customer/WishlistSlice';
import { addItemToCart } from '../../../Redux Toolkit/Customer/CartSlice';

interface WishlistProductCardProps {
    item: Product;
}

const WishlistProductCard: React.FC<WishlistProductCardProps> = ({ item }) => {
    const navigate  = useNavigate();
    const dispatch  = useAppDispatch();
    const [removing, setRemoving] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleRemove = (e: MouseEvent) => {
        e.stopPropagation();
        setRemoving(true);
        if (item.id) dispatch(addProductToWishlist({ productId: item.id }));
    };

    const handleAddToCart = (e: MouseEvent) => {
        e.stopPropagation();
        dispatch(addItemToCart({
            jwt: localStorage.getItem('jwt'),
            request: { productId: item.id, size: item.sizes?.[0] ?? 'FREE SIZE', quantity: 1 },
        }));
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const saved = item.mrpPrice - item.sellingPrice;

    return (
        <>
            <style>{`
                .wpc-card {
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: box-shadow 0.15s, border-color 0.15s, opacity 0.3s, transform 0.3s;
                    cursor: pointer;
                    position: relative;
                }
                .wpc-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); border-color: #c9c9c9; }
                .wpc-card.removing { opacity: 0; transform: scale(0.95); pointer-events: none; }

                .wpc-img-wrap { position: relative; overflow: hidden; background: #f9f9f9; }
                .wpc-img {
                    width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top;
                    transition: transform 0.3s;
                }
                .wpc-card:hover .wpc-img { transform: scale(1.04); }

                /* Remove button */
                .wpc-remove {
                    position: absolute; top: 8px; right: 8px;
                    width: 26px; height: 26px;
                    background: rgba(255,255,255,0.92);
                    border: 1px solid #ddd;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    font-size: 13px; color: #666;
                    transition: background 0.15s, color 0.15s;
                    z-index: 2;
                }
                .wpc-remove:hover { background: #fff; color: #b12704; border-color: #b12704; }

                /* Discount badge */
                .wpc-badge {
                    position: absolute; bottom: 8px; left: 8px;
                    background: #CC0C39;
                    color: #fff;
                    font-size: 11px; font-weight: 700;
                    padding: 2px 7px;
                    border-radius: 3px;
                }

                /* Details */
                .wpc-details { padding: 10px 12px 12px; display: flex; flex-direction: column; gap: 3px; flex: 1; }
                .wpc-seller { font-size: 11px; color: #888; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .wpc-title  { font-size: 13px; color: #0F1111; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .wpc-price-row { display: flex; align-items: baseline; gap: 6px; margin-top: 4px; }
                .wpc-price   { font-size: 15px; font-weight: 700; color: #0F1111; }
                .wpc-mrp     { font-size: 12px; color: #888; text-decoration: line-through; }
                .wpc-saving  { font-size: 11px; color: #007600; font-weight: 600; }
                .wpc-delivery { font-size: 11px; color: #007600; margin-top: 3px; }

                /* Add to cart button */
                .wpc-cart-btn {
                    margin: 8px 12px 12px;
                    padding: 7px 0;
                    background: linear-gradient(to bottom, #FFD814, #F8B200);
                    border: 1px solid #C7980A;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #111;
                    cursor: pointer;
                    transition: background 0.15s;
                    width: calc(100% - 24px);
                }
                .wpc-cart-btn:hover { background: linear-gradient(to bottom, #f7ca00, #e5a800); }
                .wpc-cart-btn.added {
                    background: linear-gradient(to bottom, #e8f5e9, #c8e6c9);
                    border-color: #43a047;
                    color: #2e7d32;
                }
            `}</style>

            <div
                className={`wpc-card ${removing ? 'removing' : ''}`}
                onClick={() => navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)}
            >
                {/* Image */}
                <div className="wpc-img-wrap">
                    <img className="wpc-img" src={item.images?.[0]} alt={item.title} />
                    {item.discountPercent > 0 && (
                        <span className="wpc-badge">-{item.discountPercent}%</span>
                    )}
                    <button className="wpc-remove" onClick={handleRemove} title="Remove from wishlist">✕</button>
                </div>

                {/* Details */}
                <div className="wpc-details">
                    <span className="wpc-seller">{item.seller?.businessDetails?.businessName}</span>
                    <span className="wpc-title">{item.title}</span>
                    <div className="wpc-price-row">
                        <span className="wpc-price">₹{item.sellingPrice}</span>
                        {item.mrpPrice > item.sellingPrice && (
                            <>
                                <span className="wpc-mrp">₹{item.mrpPrice}</span>
                                <span className="wpc-saving">Save ₹{saved}</span>
                            </>
                        )}
                    </div>
                    <span className="wpc-delivery">FREE Delivery</span>
                </div>

                {/* Add to Cart */}
                <button
                    className={`wpc-cart-btn ${addedToCart ? 'added' : ''}`}
                    onClick={handleAddToCart}
                >
                    {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
            </div>
        </>
    );
};

export default WishlistProductCard;