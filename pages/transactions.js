import { useState, useEffect } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/v1/txn/get-txn?page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, [page, limit]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transactions</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Product</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Units</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Buy Price</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{transaction.product.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{transaction.units}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{transaction.buyPrice}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{new Date(transaction.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', display: 'flex' }}>
            {page > 1 && (
                <button onClick={handlePrevPage}>
                Prev
                </button>
            )}
            <div style={{ marginLeft: 'auto' }}>
                {page < totalPages && (
                <button onClick={handleNextPage}>
                    Next
                </button>
                )}
            </div>
       </div>
    </div>
  );
}