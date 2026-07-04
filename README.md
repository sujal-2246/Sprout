# 🌱 Sprout - Multi-Vendor Marketplace

A modern **Full Stack Multi-Vendor Marketplace** built using **React, Vite, Express.js, and PostgreSQL**. The application allows users to browse products, search items, filter by category, tags, and price, and view stock availability through a clean, responsive interface.

---

## 📌 Features

### 🎨 Frontend

- Modern Dark UI with Glassmorphism Design
- Responsive Layout
- Product Search (Debounced)
- Category Filtering
- Tag Filtering
- Price Range Filtering
- Product Sorting
- Pagination
- Skeleton Loading Cards
- Stock Availability Indicator
- URL-based Filter State

### ⚙️ Backend

- RESTful API using Express.js
- Query Validation
- Dynamic Filtering
- Pagination
- Sorting
- Mock Database Support
- PostgreSQL Integration

### 🗄️ Database

- Normalized PostgreSQL Schema
- Products
- Vendors
- Categories
- Tags
- Product Variants
- Seed Data
- SQL Query Builder

---

# 🛠️ Tech Stack

| Technology   | Purpose         |
| ------------ | --------------- |
| React        | Frontend        |
| Vite         | Build Tool      |
| Tailwind CSS | Styling         |
| Express.js   | Backend API     |
| PostgreSQL   | Database        |
| Node.js      | Runtime         |
| Lucide React | Icons           |
| Git & GitHub | Version Control |

---

# 📂 Project Structure

```text
Sprout/
│
├── backend/
│   ├── src/
│   │   ├── data/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── example-queries.sql
│
└── README.md
```

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/sujal-2246/Sprout.git

cd Sprout
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a **.env** file inside the backend folder.

```env
PORT=4000

USE_MOCK_DB=true

PGHOST=localhost
PGPORT=5432
PGDATABASE=sprout
PGUSER=postgres
PGPASSWORD=your_password
```

Start the backend server.

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm install lucide-react

npm run dev
```

---

# 🌐 Application URLs

| Service      | URL                                |
| ------------ | ---------------------------------- |
| Frontend     | http://localhost:5173              |
| Backend API  | http://localhost:4000              |
| Health Check | http://localhost:4000/health       |
| Products API | http://localhost:4000/api/products |

---

# 📡 Example API Request

```http
GET /api/products?category=keyboards&tags=wireless,mechanical&minPrice=50&page=1&limit=10
```

---

# 📸 Screenshots

## Home Page

> Add your homepage screenshot here.

```
docs/homepage.png
```

## Product Listing

> Add product listing screenshot here.

```
docs/products.png
```

## Search & Filters

> Add filter/search screenshot here.

```
docs/filters.png
```

---

# 📖 API Endpoints

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| GET    | /health                       | Check server status |
| GET    | /api/products                 | Get all products    |
| GET    | /api/products?search=keyboard | Search products     |
| GET    | /api/products?category=audio  | Filter by category  |
| GET    | /api/products?page=2          | Pagination          |

---

# 🎯 Future Improvements

- User Authentication
- Shopping Cart
- Wishlist
- Product Reviews & Ratings
- Image Upload
- Admin Dashboard
- Order Management
- Payment Gateway Integration
- Deployment (Vercel + Render)

---

# 👨‍💻 Author

**Sujal Ragbale**

- GitHub: https://github.com/sujal-2246

---

# ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub!
