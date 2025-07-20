# 🧓 ConnectWell — Community Support Platform

**ConnectWell** is a full-stack web platform that connects **elderly people** seeking help with **volunteers** willing to support them. It integrates a smart voice assistant via **Vapi AI**, enabling users to request help using natural speech.

---

## 🌐 Live Project Demo

link:- https://drive.google.com/file/d/1ISIiCMgon6BsNrpBS1w_3F6SFaJF4vh0/view?usp=drive_link

---

PPT Link:- https://drive.google.com/file/d/1hDx9oWzAEBSg0OWBfTpeSQ7tUQVWTkOM/view?usp=sharing

---

## 🚀 Features

- 🧑‍💼 **User roles**: Elderly, Volunteer, and Disabled
- 🔐 **Login, Signup, and Logout** with secure authentication
- 🔑 **JWT-based Authentication** for secure access
- 📝 **Elderly users can submit help requests just by speaking**
- 📋 **All user requests are visible on the dashboard**
- 🗑️ **Users can delete their own requests from the dashboard**
- 📧 **On deletion, a cancel request email is automatically sent to the assigned volunteer**
- 🤝 **Volunteers get notified via email and can assist**
- 🗣️ **Vapi AI Voice Assistant integration** to handle help via voice
- 📧 **Automatic email sending via Gmail (Nodemailer + App Password)**
- 🧼 **Fully modular backend** with separated controllers, routes, and middleware

---

## 🛠️ Tech Stack

----------------------------------------------------
| Layer     | Tech                                 |
|-----------|--------------------------------------|
| Frontend  | React, TailwindCSS, Framer Motion    |
| Backend   | Node.js, Express.js                  |
| Database  | MongoDB + Mongoose                   |
| Auth      | JWT (JSON Web Tokens)                |
| Hashing   | bcryptjs                             |
| Email     | Nodemailer + Gmail App Password      |
| Voice     | Vapi AI Tool Integration             |
----------------------------------------------------
---

## 📁 Project Structure

```

connectwell/
│
├── client/                    # 🔵 Frontend (React)
│ ├── node_modules/              # Dependencies
│ ├── public/                    # Static assets
│ ├── src/                       # Main frontend source
│ │ ├── components/               # Reusable components
│ │ │ ├── ElderDashboard.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── LandingPage.jsx
│ │ │ ├── Navbar.jsx
│ │ │ ├── Register.jsx
│ │ │ └── VapiCall.jsx
│ │ ├── utils/
│ │ │ └── auth.js                 # Auth helper (token storage, etc.)
│ │ ├── App.js
│ │ ├── App.css
│ │ ├── App.test.js
│ │ ├── index.js
│ │ ├── index.css
│ │ ├── logo.svg
│ │ ├── reportWebVitals.js
│ │ └── setupTests.js
│ ├── .env                       # Frontend env 
│ ├── package.json
│ ├── package-lock.json
│ ├── postcss.config.js
│ └── tailwind.config.js
│
├── server/                    # 🟠 Backend (Node + Express)
│ ├── node_modules/              # Dependencies
│ ├── config/                    # App-level configs
│ │ ├── db.js                      # MongoDB connection
│ │ └── mailer.js                  # Nodemailer transporter config
│ ├── controllers/                 # Route logic 
│ │ ├── authController.js
│ │ ├── emailController.js
│ │ └── requestController.js
│ ├── middleware/                  # Express middleware
│ │ └── auth.js                     # JWT verification
│ ├── models/                      # Mongoose schemas
│ │ ├── HelpRequest.js
│ │ └── User.js
│ ├── routes/                      # API route definitions
│ │ ├── auth.js
│ │ ├── email.js
│ │ └── requests.js
│ ├── utils/                       #  Reusable helper functions
│ │ └── tempUserCache.js           # In-memory cache for Vapi tool user
│ ├── .env                           # Server secrets
│ ├── index.js                       # Main entry point for server
│ ├── insertsampleusers.js           # sample data inserter function
│ ├── package.json
│ └── package-lock.json
│
├── .gitignore
└── README.md                     # You are here right now
```


---
