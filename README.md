# Letmegrab: User Account and Product Management

## 📝 Project Overview

This project is a **React application** built with (React V16+), enabling users to register, log in, and manage their account information.

- Register a new user account.
- Log in using the registered credentials.
- View and update profile information, including the option to change the password.
- Log out while retaining user data for future sessions.

The application is styled using **Bootstrap** and custom CSS for a modern look and responsive design.

---

## 💻 Tech Stack

- **Frontend:**
  - React (V16+)
  - JavaScript
  - Bootstrap
  - CSS (Custom styling)
  - Icons

- **Tools & Libraries:**
  - `react-router-dom`: For navigation between different pages (Login, Register, Dashborad Profile).
  - `localStorage`: Used for persistent data storage (user information).

- **Development Environment:**
  - Node.js (LTS version)
  - npm: For package management.

---

## 📋 Features

### 1. **User Registration**
- Allows new users to register with a **user name**, **email id**, and **password**.
- Stores user information securely in `localStorage`.

### 2. **User Login**
- Users can log in using their registered email and password.
- Validates the credentials against the data stored in `localStorage`.
- Redirects to the profile page upon successful login.

### 3. **Dashboard Profile Management & Products**
- Displays user information (username).
- Allows users to update their products , view products , delete product.
- Ensures the updated data is saved back to `localStorage`.

### 4. **Persistent Storage**
- User data is stored in `localStorage`, allowing users to remain logged in even after refreshing the page or reopening the browser.
- Logging out only removes the login status, keeping the user data intact for future login attempts.

### 5. **Responsive UI**
- The application uses **Bootstrap** and custom CSS for a responsive and clean UI design.
- Includes interactive elements like password visibility toggle and form validation alerts.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (LTS version)
- npm (or yarn)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ArjunPrajapat98/Letmegrab.git
   cd react-user-account-app
2. Install the dependencies
    ```bash
    npm install
    ```
3. Start the development server
    ```bash
    npm start
    ```
4. Open the application in your browser
    http://localhost:3000