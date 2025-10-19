# 🛍️ MERN Shop

A modern **full-stack e-commerce application** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
It supports **user authentication, product management, shopping cart, orders, and Stripe payment integration**, with **admin and user dashboards**.  

---

## 🚀 Features

### 🧑‍💻 User Features
- 🔐 Register, Login, and Logout
- 🏠 Browse products with a beautiful UI
- 🛒 Add to Cart / Remove from Cart
- 💳 Secure Checkout and Payment
- 📦 Track Orders and Order History
- ❌ Order Failure & ✅ Success Pages

### 🛠️ Admin Features
- 📦 Add, Edit, or Delete Products
- 🧾 Manage Orders and View Details
- 📊 Dashboard Overview
- 🧭 Sidebar Navigation

---

## 🏗️ Tech Stack

### **Frontend**
- ⚛️ React + Vite
- 🎨 TailwindCSS
- 🧭 React Router
- 🧱 Zustand (State Management)
- ⚡ Context API (Authentication)

### **Backend**
- 🟢 Node.js
- ⚙️ Express.js
- 🗄️ MongoDB (Mongoose)
- 🔐 JWT Authentication
- 💳 Stripe (Payment Gateway)

---

## 📂 Folder Structure

```
mern-shop/
│
├── backend/                 # Server-side code
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Auth middlewares
│   ├── models/              # Mongoose models
│   ├── routes/              # Express routes
│   └── index.js             # Entry point
│
├── frontend/                # Client-side code
│   ├── src/
│   │   ├── admin/           # Admin pages
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth context
│   │   ├── layouts/         # Page layouts
│   │   ├── pages/           # App pages
│   │   ├── store/           # Zustand store
│   │   ├── App.jsx          # Root component
│   │   └── main.jsx         # Entry point
│   └── vite.config.js
│
└── vercel.json              # Deployment config
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/ankitjhagithub21/mern-shop.git
cd mern-shop
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```

### 4️⃣ Environment Variables

Create `.env` file in the **backend** folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

Create `.env` file in the **frontend** folder:
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 5️⃣ Run the Application

**Start Backend Server:**
```bash
cd backend
npm run dev
```

**Start Frontend Server:**
```bash
cd frontend
npm run dev
```

---

## 🔗 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### **Products**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### **Orders**
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order (Admin)

### **Payments**
- `POST /api/payments/create-payment-intent` - Create Stripe payment
- `POST /api/payments/webhook` - Stripe webhook handler

---

## 🚀 Deployment

### **Backend (Vercel)**
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### **Frontend (Vercel)**
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Vercel
3. Set environment variables

### **Database (MongoDB Atlas)**
1. Create MongoDB Atlas account
2. Create cluster and database
3. Get connection string
4. Add to environment variables

### **Stripe Setup**
1. Create Stripe account
2. Get API keys from dashboard
3. Set up webhook endpoint: `your-domain/api/payments/webhook`
4. Select `checkout.session.completed` event

---


## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ankit Kumar Jha**
- GitHub: [@ankitjhagithub21](https://github.com/ankitjhagithub21)
- LinkedIn: [Your LinkedIn Profile]

---

## 🙏 Acknowledgments

- Thanks to the MERN stack community
- Stripe for payment processing
- MongoDB Atlas for database hosting
- Vercel for deployment

---

⭐ **If you like this project, please give it a star!** ⭐


