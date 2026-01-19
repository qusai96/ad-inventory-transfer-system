import { useEffect, useState } from 'react';
import api from './api';
import InventoryList from './components/InventoryList';
import TransferForm from './components/TransferForm';

function App() {
  const [locations, setLocations] = useState([]);

  const loadInventory = async () => {
    const res = await api.get('/inventory');
    setLocations(res.data);
  };

  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Inventory Transfer System</h1>

      <InventoryList locations={locations} />
      <hr />
      <TransferForm locations={locations} onSuccess={loadInventory} />
      </div>
  );
}

export default App;
