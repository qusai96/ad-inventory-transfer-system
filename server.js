const express = require('express');
const bodyParser = require('body-parser');
const inventoryRoutes = require('./src/routes/inventory.routes'); 
const transferRoutes = require('./src/routes/transfer.routes'); // optional if you want transfers

const app = express();
app.use(bodyParser.json());

// Only API routes
app.use('/api', inventoryRoutes);
app.use('/api', transferRoutes);  // keep if using transfer

// Optional root route for testing
app.get('/', (req, res) => {
  res.send('Inventory Transfer System Backend is running!');
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
