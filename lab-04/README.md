# Lab 4: Registration, Login and JWT Authentication

## Student Details

| Field | Details |
|---|---|
| **Student Name** | Sirisha Nagam |
| **Student Registration Number** | 252U1R5109 |
| **Class & Section** | AIDE – 2B |
| **Study Level** | UG |
| **Year & Term** | II & II |
| **Subject Name** | Foundation of Data Science |
| **Name of the Assessment** | Group Assignment |
| **Date of Submission** | 15-11-2026 |

---


| Field | Details |
|---|---|
| **Deployment Platform** | Render |
| **Live Application URL** | https://backend-lab4-dky6.onrender.com |
| **Deployment Status** | deployed |

The application will be deployed after completing local testing and verification.

---

## 1. Objective

The objective of this lab is to implement user registration and login functionality using Node.js, Express.js, SQLite, bcrypt and JSON Web Tokens (JWT).

Through this lab, I learned how to securely store passwords using hashing and authenticate users using JWT tokens.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite
- bcrypt
- JSON Web Token (jsonwebtoken)
- Postman
- Visual Studio Code

## 3. Project Structure

```text
lab-04/
│
├── screenshots/
│   ├── Decode the JWT token.png
│   ├── Duplicate username.png
│   ├── Missing fields.png
│   ├── Missing username.png
│   ├── SQLite users table.png
│   ├── Successful login.png
│   ├── Successful registration.png
│   ├── Unknown username.png
│   └── Wrong password.png
│
├── db.js
├── server.js
├── users.db
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 4. Installation

The required packages were installed using:

```bash
npm install express sqlite3 bcrypt jsonwebtoken
```

## 5. Database Configuration

SQLite is used to store the registered user information.

The users table contains the following columns:

| Column | Description |
|---|---|
| id | Unique user ID |
| username | Unique username |
| name | User's name |
| password | Hashed password |

## 6. API Endpoints

### A. User Registration

**Method:** POST

**Endpoint:** `/register`

This API allows a new user to register by providing a username, name and password.

The password is hashed using bcrypt before storing it in the SQLite database.

### B. User Login

**Method:** POST

**Endpoint:** `/login`

This API checks whether the username exists and verifies the password using bcrypt.

If the login details are correct, a JWT token is generated and returned to the user.

## 7. Validation and Security

- Checks whether all required fields are provided.
- Prevents duplicate usernames.
- Hashes passwords using bcrypt.
- Verifies passwords during login using `bcrypt.compare()`.
- Generates JWT tokens after successful login.
- Does not include passwords in the JWT payload.

## 8. Screenshots and Results

The following screenshots show the testing results of the registration and login APIs using Postman and SQLite.

### 8.1 Successful User Registration

A new user was successfully registered and the details were stored in the database.

![Successful Registration](screenshots/Successful%20registration.png)

### 8.2 Registration with Missing Username

The API returns an error when the username is not provided.

![Missing Username](screenshots/Missing%20username.png)

### 8.3 Duplicate Username Validation

The API prevents registering another user with an already existing username.

![Duplicate Username](screenshots/Duplicate%20username.png)

### 8.4 Registration with Missing Fields

The API validates the required fields before registering a user.

![Missing Fields](screenshots/Missing%20fields.png)

### 8.5 Successful User Login

The user successfully logged in using the registered username and password and received a JWT token.

![Successful Login](screenshots/Successful%20login.png)

### 8.6 Login with Wrong Password

The API returns an error when an incorrect password is entered.

![Wrong Password](screenshots/Wrong%20password.png)

### 8.7 Login with Unknown Username

The API rejects login attempts when the username does not exist.

![Unknown Username](screenshots/Unknown%20username.png)

### 8.8 JWT Token Decoding

The generated JWT token was decoded to understand its header, payload and signature.

![Decode JWT Token](screenshots/Decode%20the%20JWT%20token.png)

### 8.9 SQLite Database Verification

The registered user information was checked in SQLite Viewer. The password is stored as a hashed value instead of plain text.

![SQLite Users Table](screenshots/SQLite%20users%20table.png)

## 9. Conclusion

Through this lab, I learned how to implement user registration and login functionality using Node.js and Express.js. I understood how bcrypt helps protect user passwords through hashing and how JWT is used for authentication.

I successfully tested different registration and login scenarios using Postman and verified the stored user information in SQLite.

This lab helped me understand the basic concepts of backend authentication, password security and user management.