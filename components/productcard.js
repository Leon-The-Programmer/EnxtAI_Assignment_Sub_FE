// components/ProductCard.js
import Link from 'next/link';
import BuyModal from './buymodal';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuy = async (productId, units) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('https://enxtai-assignment-sub.onrender.com/api/v1/txn/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, units }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

  return (
    <div style={{ width: '250px', border: '1px solid #ccc', borderRadius: '10px', padding: '20px', margin: '20px' }}>
        <h3>{product.name}</h3>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href={`/products/${product.id}`}>View Details</Link>
            <button style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }} onClick={() => setIsModalOpen(true)}>Buy</button>
        </div>
        <BuyModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBuy={handleBuy} />
    </div>
  );
}