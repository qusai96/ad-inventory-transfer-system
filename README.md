# Inventory Transfer System

Technical Assessment – Qusai Abureden

A simple full-stack inventory transfer system.
It allows viewing stock at multiple locations and transferring quantities between them.
Built with Node.js, Prisma, MySQL, and React, with the frontend and backend in a single repository.


 Quick Start

1. Clone the repository

bash
git clone https://github.com/qusai96/ad-inventory-transfer-system.git
cd ad-inventory-transfer-system


2. Create your .env file

bash
cp .env-sample .env


 Edit .env if you need to adjust MySQL credentials.

3. Install dependencies and generate Prisma client

bash
npm install
npx prisma generate


4. Apply migrations and seed the database

bash
npx prisma migrate dev --name init
node src/seed.js


5. Run backend and frontend

bash
# Backend
node server.js

# Frontend (new terminal)
cd frontend
npm install
npm start


- Backend: http://localhost:3000
- Frontend: http://localhost:3001


Tech Stack

-Backend

* Node.js
* Express.js
* Prisma ORM
* MySQL

-Frontend

* React
* Axios



-Backend lives in the project root.
-Frontend is inside /frontend.
-Postman collection is included for easy testing.



Environment Configuration

1. Copy the sample .env:

bash
cp .env-sample .env


2. Update if needed:

env
DATABASE_URL="mysql://username:password@localhost:3306/inventory_db"


 .env is ignored by Git .env-sample is for reference.



Prisma Setup

1. Install dependencies:

bash
npm install


2. Generate Prisma client:

bash
npx prisma generate


3. Run migrations (creates tables automatically):

bash
npx prisma migrate dev --name init


4. Seed database:

bash
node src/seed.js


Creates sample products, locations, and initial inventory.




Using the Postman Collection

A Postman collection is included for convenience:

InventoryTransfer.postman_collection.json

--Design Notes

- Backend uses Prisma transactions to ensure atomic transfers
- Authentication intentionally omitted for simplicity
- Frontend and backend live in the same repository for simplicity
