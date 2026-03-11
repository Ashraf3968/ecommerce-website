# DigitQuo Ecommerce Starter

A basic ecommerce website starter built with React, Node.js, Express, and MongoDB.

## Included features

- Homepage
- Product listing page
- Product detail page
- Cart
- Checkout
- Review system
- Contact page

## Project structure

```text
client/   React + Vite frontend
server/   Express + MongoDB backend
```

## Getting started

### 1. Install dependencies

```bash
npm install --prefix server
npm install --prefix client
```

### 2. Configure environment variables

Copy the example env files and update values if needed.

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

### 3. Start MongoDB

Make sure a MongoDB instance is running locally on:

```text
mongodb://127.0.0.1:27017/digitquo-store
```

You can change this in `server/.env`.

### 4. Seed sample products

```bash
npm run seed:server
```

### 5. Run the apps

In one terminal:

```bash
npm run dev:server
```

In another terminal:

```bash
npm run dev:client
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## API endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/featured`
- `GET /api/products/categories`
- `GET /api/products/:slug`
- `POST /api/products/:id/reviews`
- `POST /api/orders`
- `POST /api/contact`
