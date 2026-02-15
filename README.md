<div align='center'><h1> 🎟 Bellcorp Event Management Application</h1>
</div>
<p align='left'>
A full-stack MERN application that allows users to discover events, register for them, and manage their registrations through a personal dashboard.
</p>


---

## 🚀 Live Demo
- Frontend: https://bevents-ten.vercel.app
- Backend API: https://event-management-93cb.onrender.com/

---
## 📌 Features
#### 🔐 Authentication

- User Registration

- User Login

- JWT Based Authentication

- Protected Routes

#### 🎟 Event Listings
- Users can:

    - Browse available events

    - View detailed event information

    - Search events using text queries

    - Filter events by category and location
    - Register for events
    - Cancel registrations
- Each event includes:
    Event Name

   - Organizer

   - Location

   - Date & Time

   - Description

   - Capacity

   - Category

#### 🔎 Event Discovery Experience

- Dynamic data fetching

- Efficient browsing of large event collections

- Real-time search and filtering

- Handles changing event availability

#### 📊 User Dashboard

- Authenticated users can view:
    - Registered events

   - Upcoming events

   - Past event history
---

### 🧠 Tech Stack

#### Frontend
    React.js (Hooks)

    React Router DOM

    Bootstrap

    Axios
#### Backend
    Node.js

    Express.js

    MongoDB Atlas

    Mongoose
#### Authentication
    JSON Web Tokens (JWT)

    bcryptjs (Password Hashing)
---
## 📂 Project Structure
```
event-manager/
├── server/
│   ├── models/        # Mongoose Schemas (User, Event)
│   ├── routes/        # API Endpoints (authRoutes, eventRoutes)
│   ├── middleware/    # Auth guards
│   ├── .env           # DB URI, JWT Secret
│   └── server.js      # Entry point
├── client/
│   ├── src/
│   │   ├── components/ # Reusable UI (Navbar, EventCard)
│   │   ├── pages/      # Home, Dashboard, EventDetails
│   │   ├── context/    # User authentication state
│   │   └── App.js      # Routes
│   └── package.json
└── README.md
```
---
## Setup Instructions (Local)

## 🚀 Installation & Setup
#### 1️⃣ Clone Repository
    git clone

#### 2️⃣ Backend Setup
    cd server
    npm install
    Create .env file:

        -  MONGO_URI=your_mongodb_connectionmongodb+srv://sanjaythadaka614_db_user:yK69RS8zSt71LgiE@eventmanager.6sw2gf1.mongodb.net/?appName=EventManager
        -  JWT_SECRET=EventManager
        - PORT=3000
    Run server:

        - npm run dev

#### 3️⃣ Frontend Setup
    cd client
    npm install
    Create .env file:

        - VITE_API_URL=http://localhost:3000/api

    Run frontend:

        - npm run dev
---
## 🔗 API Endpoints

#### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register User |
| **POST** | `/api/auth/login` | Login User |


### Events
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/events` | Get all events (search & filter supported) |
| **GET** | `/api/events/` | Get event details |

### Registrations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/registrations/` | Register for event |
| **DELETE** | `/api/registrations/` | Cancel registration |
| **GET** | `/api/registrations/my-events`|Get user registrations|

---
### 🗄 Database Design
A many-to-many relationship is implemented using a Registration collection.

User ←→ Registration ←→ Event

- This allows:

    - One user → many events

    - One event → many users

    - Efficient scalability

---

## 👨‍💻 Author

<i>Sanjay Kumar Thadaka</i>
```
B.Tech Computer Science Engineering
Full Stack MERN Developer
```

---

## 📜 License

This project was developed as part of a technical assignment for Bellcorp.