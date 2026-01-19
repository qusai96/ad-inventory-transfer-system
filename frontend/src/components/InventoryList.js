function InventoryList({ locations }) {
    return (
      <div>
        <h2>Current Inventory</h2>
  
        {locations.map(location => (
          <div key={location.id} style={{ marginBottom: 20 }}>
            <h3>
              {location.name} ({location.type})
            </h3>
  
            <ul>
              {location.inventory.map(item => (
                <li key={item.productId}>
                  {item.product.name} — {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  
  export default InventoryList;
  