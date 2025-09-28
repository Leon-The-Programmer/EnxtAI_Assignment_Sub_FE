import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState({});

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://enxtai-assignment-sub.onrender.com/api/v1/portfolio', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Portfolio Dashboard</h2>
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', position: 'relative' }}>
            <h3>Summary</h3>
            <p><strong>Wallet:</strong> {portfolioData.wallet}</p>
            <p><strong>Total Invested:</strong> {portfolioData.totalInvested}</p>
            <p><strong>Current Value:</strong> {portfolioData.currentVal}</p>
            <p><strong>Returns:</strong> {portfolioData.returns}</p>
            <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <Link href="/transactions">
                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>View All Transactions</span>
                </Link>
            </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Holdings:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Product</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Units</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Buy Price</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Current Price</th>
            </tr>
          </thead>
          <tbody>
            {portfolioData.holdings?.map((holding) => (
              <tr key={holding.productId}>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{holding.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{holding.units}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{holding.buyPrice}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{holding.currentPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}