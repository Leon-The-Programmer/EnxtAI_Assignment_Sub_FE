// pages/products/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import BuyModal from '../../components/buymodal';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Price',
        data: [100, 120, 110, 130, 125],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuy = async (productId, units) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/v1/txn/buy', {
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

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Price Chart',
      },
    },
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>Product Details</h2>
      <p>Name: {product.name}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      <p>PE Ratio: {product.peRatio}</p>
      <p>Created At: {product.createdAt}</p>
      <button style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }} onClick={() => setIsModalOpen(true)}>Buy</button>
      <Line options={chartOptions} data={chartData} />
      <BuyModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBuy={handleBuy} />
    </div>
  );
}