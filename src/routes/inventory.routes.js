const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated');
const prisma = new PrismaClient();

router.get('/inventory', async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      include: {
        inventory: {
          include: {
            product: true
          }
        }
      }
    });
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching inventory' });
  }
});

module.exports = router;
