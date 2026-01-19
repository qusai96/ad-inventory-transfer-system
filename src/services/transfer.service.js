const { PrismaClient } = require('../generated');  // relative to the file
const prisma = new PrismaClient();


exports.transferStock = async (productId, fromLocationId, toLocationId, quantity) => {
  return await prisma.$transaction(async (tx) => {
    const fromInventory = await tx.inventory.findUnique({
      where: { productId_locationId: { productId, locationId: fromLocationId } }
    });

    if (!fromInventory || fromInventory.quantity < quantity) {
      throw new Error('Not enough stock in source location');
    }

    const toLocation = await tx.location.findUnique({ where: { id: toLocationId } });
    if (toLocation.type === 'STORE') {
      const totalAtStore = await tx.inventory.aggregate({
        _sum: { quantity: true },
        where: { locationId: toLocationId }
      });

      const storeCapacity = toLocation.capacity || 0;
      const currentTotal = totalAtStore._sum.quantity || 0;

      if (currentTotal + quantity > storeCapacity) {
        throw new Error('Transfer would exceed store capacity');
      }
    }

    await tx.inventory.update({
      where: { productId_locationId: { productId, locationId: fromLocationId } },
      data: { quantity: { decrement: quantity } }
    });

    const toInventory = await tx.inventory.findUnique({
      where: { productId_locationId: { productId, locationId: toLocationId } }
    });

    if (toInventory) {
      await tx.inventory.update({
        where: { productId_locationId: { productId, locationId: toLocationId } },
        data: { quantity: { increment: quantity } }
      });
    } else {
      await tx.inventory.create({
        data: { productId, locationId: toLocationId, quantity }
      });
    }

    return `Transferred ${quantity} units successfully`;
  });
};
