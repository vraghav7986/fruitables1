# 🍏 Fruitables – Organic E‑commerce Platform

A full-stack MERN application for buying fresh organic fruits, vegetables, and groceries.  
It includes a customer‑facing store, a secure admin panel, and a user dashboard with order history.

---
Live Link :- [fruitables1.vercel.app
](https://fruitables1.vercel.app/)
## ✨ Features

- **User Authentication** – JWT-based login/registration  
- **Product Catalog** – Search, filter by category, view details  
- **Shopping Cart** – Add/remove items, adjust quantity  
- **Checkout** – Enter shipping details, select payment method, place order  
- **Order Management** – Users can view their order history  
- **Admin Panel** – Manage products (CRUD) and update order status  
- **Responsive Design** – Works on desktop, tablet, and mobile  
- **Protected Routes** – Guest users are redirected to login for cart & checkout  

---

## 🛠️ Tech Stack

**Frontend (Customer Store)**  
- React.js  
- React Router  
- Bootstrap 5  
- Axios  
- Swiper (carousel)  
- React Toastify  

**Frontend (Admin Panel)**  
- React.js  
- React Router  
- Bootstrap 5  
- Axios  

**Backend**  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JSON Web Token (JWT)  
- Bcryptjs  

---  
PORT=9999
MONGO_URI=mongodb://localhost:27017/fruitables
JWT_SECRET=your_secret_key



<img width="1897" height="1088" alt="image" src="https://github.com/user-attachments/assets/262ade6d-cecf-48d2-879f-26c19d0b42bb" />

<img width="1886" height="1080" alt="image" src="https://github.com/user-attachments/assets/fef53df8-3837-4719-b3e7-810b011c14a6" />
<img width="1899" height="1087" alt="image" src="https://github.com/user-attachments/assets/11294a6a-0892-4151-bf3b-7811ba35aef9" />
<img width="1893" height="1046" alt="image" src="https://github.com/user-attachments/assets/29a7753a-b721-4fd3-a654-7154851d2103" 
  <img width="1896" height="747" alt="image" src="https://github.com/user-attachments/assets/b51b8f24-c7a2-4b21-b03d-3d2b3fe4e4cb" />



---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git (optional)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/fruitables.git
cd fruitables

## 📁 Project Structure
Mernproject/
├── backend/
│ ├── config/ # DB connection
│ ├── Controller/ # Business logic (auth, products, orders, cart)
│ ├── middleware/ # Auth middleware (user & admin)
│ ├── model/ # Mongoose models
│ ├── Routes/ # Express routes
│ ├── .env
│ └── app.js
├── frontend/ # Main customer store
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Home, Shop, Cart, Checkout, etc.
│ │ ├── CartContext.js
│ │ └── api.js
│ └── package.json
└── admin/ # Admin dashboard (separate React app)
├── src/
│ ├── pages/ # Dashboard, Products, Orders
│ ├── components/ # Layout, PrivateRoute
│ ├── api.js
│ └── utils/
└── package.json
