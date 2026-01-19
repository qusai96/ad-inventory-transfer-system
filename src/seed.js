const { PrismaClient } = require('./generated'); // updated path
const prisma = new PrismaClient();

async function main() {

  const warehouse = await prisma.location.upsert({
    where: { name: 'Main Warehouse' },
    update: {},
    create: {
      name: 'Main Warehouse',
      type: 'WAREHOUSE',
      capacity: null
    }
  });

  const store = await prisma.location.upsert({
    where: { name: 'Downtown Store' },
    update: {},
    create: {
      name: 'Downtown Store',
      type: 'STORE',
      capacity: 50
    }
  });

  const productA = await prisma.product.upsert({
    where: { sku: 'PROD-A' },
    update: {},
    create: { name: 'Product A', sku: 'PROD-A' }
  });

  const productB = await prisma.product.upsert({
    where: { sku: 'PROD-B' },
    update: {},
    create: { name: 'Product B', sku: 'PROD-B' }
  });

  await prisma.inventory.upsert({
    where: { productId_locationId: { productId: productA.id, locationId: warehouse.id } },
    update: {},
    create: { productId: productA.id, locationId: warehouse.id, quantity: 100 }
  });

  await prisma.inventory.upsert({
    where: { productId_locationId: { productId: productB.id, locationId: warehouse.id } },
    update: {},
    create: { productId: productB.id, locationId: warehouse.id, quantity: 50 }
  });

  await prisma.inventory.upsert({
    where: { productId_locationId: { productId: productA.id, locationId: store.id } },
    update: {},
    create: { productId: productA.id, locationId: store.id, quantity: 10 }
  });

  console.log('seed data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
