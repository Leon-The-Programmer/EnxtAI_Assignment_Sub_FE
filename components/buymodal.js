// components/BuyModal.js
import { useState } from 'react';

export default function BuyModal({ product, isOpen, onClose, onBuy }) {
  const [units, setUnits] = useState(1);
  const [buyResult, setBuyResult] = useState(null);
  const [error, setError] = useState(null);

  const handleBuy = async () => {
    if (units < 1 || units > 10) {
      setError('Units must be between 1 and 10');
      return;
    }
    try {
      await onBuy(product.id, units);
      setBuyResult({ success: true });
    } catch (error) {
      setBuyResult({ success: false, message: error.message });
    }
  };

  const handleUnitsChange = (e) => {
    const value = e.target.valueAsNumber;
    if (value >= 1 && value <= 10) {
      setUnits(value);
      setError(null);
    } else {
      setError('Units must be between 1 and 10');
    }
  };

  if (!isOpen) return null;

  if (buyResult) {
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
        width: '300px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {buyResult.success ? (
          <div>
            <h2>Purchase Successful!</h2>
            <button style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }} onClick={onClose}>Okay</button>
          </div>
        ) : (
          <div>
            <h2>Purchase Failed</h2>
            <p>Reason: {buyResult.message}</p>
            <button style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }} onClick={onClose}>Okay</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
      width: '300px',
      height: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <h2>Buy {product.name}</h2>
      <label>
        Units:
        <input type="number" value={units} onChange={handleUnitsChange} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </label>
      <button style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }} onClick={handleBuy}>Proceed</button>
      <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }} onClick={onClose}>Cancel</button>
    </div>
  );
}