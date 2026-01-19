const express = require('express');
const cors = require('cors');

const inventoryRoutes = require('./src/routes/inventory.routes');
const transferRoutes = require('./src/routes/transfer.routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
}));

app.use(express.json());

app.use('/api', inventoryRoutes);
app.use('/api', transferRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
