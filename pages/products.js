import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../components/productcard';
import Link from 'next/link';

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/v1/products');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
          setError(error.message);
        }
      };
      fetchProducts();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Link href="/portfolio" style={{ backgroundColor: 'transparent', border: 'none', padding: '10px', textDecoration: 'underline' }}>
          View Portfolio
        </Link>
        <button style={{ backgroundColor: 'transparent', border: 'none', padding: '10px', textDecoration: 'underline' }} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2>Product Listing</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}