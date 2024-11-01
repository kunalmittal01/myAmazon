# Amazon Clone

An e-commerce application replicating core features of Amazon built using React, Firebase, and Redux Toolkit. This project provides functionalities like user authentication, product browsing, adding/removing items from the cart, and real-time updates with Firestore.

## Demo

Check out the live version of the project here: https://kunals-amazon.netlify.app

## Table of Contents

* Features
* Technologies
* Setup and Installation
* Features Overview
* Folder Structure
* Contributing
* License
* Features
* User Authentication:

Firebase Authentication (Email & Password)

Forgot Password functionality

Logout & User Session Management

#### Product Search with Suggestions:

1. Instant search with product suggestions as the user types.
Voice search functionality using Web Speech API.
Firestore Integration:

2. Store and retrieve cart items using Firestore for authenticated users.

3. Add, update, and delete items in real-time from Firestore.
Cart Management:

4. Add to Cart, Remove from Cart.
Clear entire cart (deletes all items from Firestore).
Responsive Design:

5. Fully responsive across mobile, tablet, and desktop devices.
Built with Tailwind CSS for styling.
Redux Toolkit:

6. Centralized state management for handling cart and authentication.

7. Asynchronous actions for Firestore operations.
Technologies.

* React (Frontend UI library)
* Redux Toolkit (State management)
* Firebase (Authentication and Firestore)
* Tailwind CSS (Styling)
* React Router (Routing for pages)
* Web Speech API (Voice search)
* Vite (Development bundler)
* Setup and Installation
* Prerequisites
* Node.js (v14 or later)
* Firebase project (set up in Firebase console)
* Firebase Setup
* Create a Firebase project at Firebase Console.
* Enable Authentication with Email & Password.
* Set up Firestore for storing cart items.
* Update Firestore security rules to allow read/write for *     authenticated users.

## Installation Steps

### Clone the repository:

git clone https://github.com/your-username/amazon-clone.git

cd amazon-clone


## Install dependencies:

npm install

## Set up Firebase:

Create a .env file at the root with your Firebase configuration:

env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id


## Run the application:

npm run dev

Open http://localhost:3000 in your browser.

## Features Overview

### User Authentication

* Sign Up & Login: Users can register or log in using Firebase Authentication.

* Forgot Password: Users can reset their password via email.
Session Management: User sessions persist, and their cart is synced across sessions.

### Cart Management

* Add to Cart: Users can add items to their cart. The cart is synced in Firestore.

* Remove from Cart: Users can remove individual items from their cart.

* Clear Cart: Users can clear all items in their cart in one click, removing items from Firestore.

### Product Search

* Instant Search Suggestions: As users type in the search bar, product suggestions are displayed.

* Voice Search: Users can search using their voice with the Web Speech API.

### Firestore Integration

* Cart items are stored in Firestore for authenticated users, allowing data to persist even after refresh.

* Firestore is also used to clear all cart items with a single function.

## Folder Structure

src/
│
├── components/           # Reusable components (Cart, Product, etc.)
├── features/             # Redux slices for cart and user state
├── pages/                # Pages (Home, Cart, Login)
├── firebase.config.js     # Firebase configuration
├── App.jsx               # Main application file
├── index.css             # Global styles
└── main.jsx              # Main entry point for the app


Contributions are welcome! Please fork the repository and submit a pull request for any changes or feature additions.

