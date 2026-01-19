import { useState } from 'react';
import api from '../api';

function TransferForm({ locations, onSuccess }) {
  const [productId, setProductId] = useState('');
  const [fromLocationId, setFromLocationId] = useState('');
  const [toLocationId, setToLocationId] = useState('');
  const [quantity, setQuantity] = useState('');

  // Extract unique products from locations
  const products = [];
  locations.forEach(loc => {
    loc.inventory.forEach(item => {
      if (!products.find(p => p.id === item.product.id)) {
        products.push(item.product);
      }
    });
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/transfer', {
        productId: Number(productId),
        fromLocationId: Number(fromLocationId),
        toLocationId: Number(toLocationId),
        quantity: Number(quantity),
      });

      alert(res.data.message);
      if (res.data.success) {
        onSuccess();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Transfer failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Transfer Product</h2>

      {/* Product */}
      <select value={productId} onChange={e => setProductId(e.target.value)} required>
        <option value="">Select Product</option>
        {products.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <br /><br />

      {/* From Location */}
      <select value={fromLocationId} onChange={e => setFromLocationId(e.target.value)} required>
        <option value="">From Location</option>
        {locations.map(loc => (
          <option key={loc.id} value={loc.id}>{loc.name}</option>
        ))}
      </select>
      <br /><br />

      {/* To Location */}
      <select value={toLocationId} onChange={e => setToLocationId(e.target.value)} required>
        <option value="">To Location</option>
        {locations.map(loc => (
          <option key={loc.id} value={loc.id}>{loc.name}</option>
        ))}
      </select>
      <br /><br />

      {/* Quantity */}
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        required
      />
      <br /><br />

      <button type="submit">Transfer</button>
    </form>
  );
}

export default TransferForm;
