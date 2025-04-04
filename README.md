# Booking-App

# Backend Function Flows

This document outlines the flow of functions in the backend application, including routes, controllers, and middleware interactions.

---

## 1. auth.js (Controller)

### 1.1 `register` Function Flow:
- **Flow**: 
  - `INDEX.JS` → `auth.js (routes)` (`POST /register`) → `auth.js (controller)` (`register`)
- **Middleware**: None
- **Explanation**:
  - The `register` function handles the user registration process. It validates if all required fields (username, email, password) are provided and if the email already exists in the database.
  - If validation passes, it hashes the password and saves the user to the database.
  - On success, a success message is returned, otherwise, an error is thrown.

### 1.2 `login` Function Flow:
- **Flow**:
  - `INDEX.JS` → `auth.js (routes)` (`POST /login`) → `auth.js (controller)` (`login`)
- **Middleware**: None
- **Explanation**:
  - The `login` function handles the user login process. It validates the user's credentials and generates a JWT token if the login is successful.
  - The token is sent in a cookie, and the user’s details are returned in the response.
  - If the login fails, an error is returned.

---

## 2. hotel.js (Controller)

### 2.1 `createHotel` Function Flow:
- **Flow**:
  - `INDEX.JS` → `hotel.js (routes)` (`POST /create`) → `verifyAdmin (middleware)` → `hotel.js (controller)` (`createHotel`)
- **Middleware**: `verifyAdmin`
- **Explanation**:
  - The `createHotel` function allows an admin to create a hotel.
  - The `verifyAdmin` middleware checks if the user has admin privileges before allowing the request to proceed.
  - The function then validates the hotel data and saves it to the database.

### 2.2 `updateHotel` Function Flow:
- **Flow**:
  - `INDEX.JS` → `hotel.js (routes)` (`PUT /:id`) → `verifyAdmin (middleware)` → `hotel.js (controller)` (`updateHotel`)
- **Middleware**: `verifyAdmin`
- **Explanation**:
  - The `updateHotel` function allows an admin to update hotel information.
  - The `verifyAdmin` middleware ensures only authorized users (admins) can update hotel details.
  - The function fetches the hotel by ID and updates its details.

### 2.3 `getHotel` Function Flow:
- **Flow**:
  - `INDEX.JS` → `hotel.js (routes)` (`GET /:id`) → `hotel.js (controller)` (`getHotel`)
- **Middleware**: None
- **Explanation**:
  - The `getHotel` function retrieves hotel details based on the provided hotel ID.
  - It returns the hotel data or an error if the hotel is not found.

### 2.4 `getAllHotels` Function Flow:
- **Flow**:
  - `INDEX.JS` → `hotel.js (routes)` (`GET /`) → `hotel.js (controller)` (`getAllHotels`)
- **Middleware**: None
- **Explanation**:
  - The `getAllHotels` function fetches all hotels from the database.
  - It returns the list of hotels or an error if no hotels are found.

---

## 3. room.js (Controller)

### 3.1 `createRoom` Function Flow:
- **Flow**:
  - `INDEX.JS` → `room.js (routes)` (`POST /create`) → `verifyAdmin (middleware)` → `room.js (controller)` (`createRoom`)
- **Middleware**: `verifyAdmin`
- **Explanation**:
  - The `createRoom` function allows an admin to create a new room.
  - The `verifyAdmin` middleware ensures only admins are authorized to create rooms.
  - The function validates the room data and saves it to the database.

### 3.2 `updateRoom` Function Flow:
- **Flow**:
  - `INDEX.JS` → `room.js (routes)` (`PUT /:id`) → `verifyAdmin (middleware)` → `room.js (controller)` (`updateRoom`)
- **Middleware**: `verifyAdmin`
- **Explanation**:
  - The `updateRoom` function allows an admin to update room information.
  - The `verifyAdmin` middleware ensures only authorized users can update room details.
  - The function updates the room data in the database.

### 3.3 `getRoom` Function Flow:
- **Flow**:
  - `INDEX.JS` → `room.js (routes)` (`GET /:id`) → `room.js (controller)` (`getRoom`)
- **Middleware**: None
- **Explanation**:
  - The `getRoom` function retrieves room details based on the room ID provided in the URL.
  - It returns the room details or an error if the room is not found.

### 3.4 `getAllRooms` Function Flow:
- **Flow**:
  - `INDEX.JS` → `room.js (routes)` (`GET /`) → `room.js (controller)` (`getAllRooms`)
- **Middleware**: None
- **Explanation**:
  - The `getAllRooms` function retrieves a list of all rooms from the database.
  - It returns the room data or an error if no rooms are found.

---

## 4. user.js (Controller)

### 4.1 `getUser` Function Flow:
- **Flow**:
  - `INDEX.JS` → `user.js (routes)` (`GET /:id`) → `verifyUser (middleware)` → `user.js (controller)` (`getUser`)
- **Middleware**: `verifyUser`
- **Explanation**:
  - The `getUser` function retrieves user details by the provided user ID.
  - The `verifyUser` middleware ensures the user is authorized to view the data (either their own data or if they are an admin).
  - The function returns the user’s data or an error if the user is not found.

### 4.2 `updateUser` Function Flow:
- **Flow**:
  - `INDEX.JS` → `user.js (routes)` (`PUT /:id`) → `verifyUser (middleware)` → `user.js (controller)` (`updateUser`)
- **Middleware**: `verifyUser`
- **Explanation**:
  - The `updateUser` function allows a user (or an admin) to update their profile.
  - The `verifyUser` middleware ensures only the user themselves or an admin can update their data.
  - The function updates the user's profile in the database.

### 4.3 `deleteUser` Function Flow:
- **Flow**:
  - `INDEX.JS` → `user.js (routes)` (`DELETE /:id`) → `verifyAdmin (middleware)` → `user.js (controller)` (`deleteUser`)
- **Middleware**: `verifyAdmin`
- **Explanation**:
  - The `deleteUser` function allows an admin to delete a user’s account.
  - The `verifyAdmin` middleware ensures only admin users can delete other users.
  - The function deletes the user from the database and responds with success or failure.

---

## Middleware

### 5.1 `verifyToken` Middleware Flow:
- **Flow**:
  - `INDEX.JS` → `verifyToken (middleware)` → `controller function`
- **Explanation**:
  - The `verifyToken` middleware checks if a valid JWT token is present in the request cookies.
  - If the token is valid, the request proceeds to the controller function; otherwise, an error is returned.

### 5.2 `verifyUser` Middleware Flow:
- **Flow**:
  - `INDEX.JS` → `verifyUser (middleware)` → `controller function`
- **Explanation**:
  - The `verifyUser` middleware ensures the user is authenticated and authorized to access certain resources.
  - It checks if the user’s ID matches the requested resource ID or if the user is an admin. If valid, it proceeds to the controller function.

### 5.3 `verifyAdmin` Middleware Flow:
- **Flow**:
  - `INDEX.JS` → `verifyAdmin (middleware)` → `controller function`
- **Explanation**:
  - The `verifyAdmin` middleware ensures that only admin users can perform specific actions, such as creating, updating, or deleting resources (like hotels, rooms, and users).
  - If the user is an admin, the request proceeds; otherwise, an error is thrown.

---

This README part outlines the backend function flows, including controllers, routes, and middleware interactions. Each section explains the path that a request takes from **INDEX.JS** to the appropriate route and controller function, with middleware applied when necessary.

**FURTHER UPDATES YET TO COME! ! ! STAY TUNED**
