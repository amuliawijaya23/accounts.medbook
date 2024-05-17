# Accounts Server: accounts.medbook.com

## Description

---

The accounts.medbook server application provides authentication and authorization services for the hospital1.medbook client application. It implements an OAuth 2.0 authorization server using oauth2orize to manage secure access to user medical data stored in a MongoDB database.

The client application communicates with the accounts.medbook server. You can find the server repository here: [hospital1.medbook](https://github.com/amuliawijaya23/hospital1.medbook)

## Features

---

- User Authentication: Provides local authentication for users to log in.
- OAuth 2.0 Authorization: Implements OAuth 2.0 authorization flows using oauth2orize.
- Session Management: Manages user sessions securely.
- Secure Data Access: Grants scoped access tokens to client applications for secure access to user medical data.

## Tech Stack

---

- Express: A minimal and flexible Node.js web application framework used for building the server.
- MongoDB: A NoSQL database used to store user data, including medical records and OAuth tokens.
- Passport: An authentication middleware for Node.js, used to handle local authentication.
- OAuth2orize: A toolkit for implementing OAuth 2.0 authorization servers in Node.js.
- Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js, used to interact with MongoDB.
- Express-Session: Middleware to manage session data.
- Connect-Ensure-Login: Middleware to ensure that a user is logged in before accessing certain routes.

## Installation

---

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (v4.x or higher)

### Step 1: Clone the Repository

Clone the GitHub repository to your local machine:

```
git clone git@github.com:amuliawijaya23/accounts.medbook.git

cd accounts.medbook
```

### Step 2: Install Dependencies

Install all the necessary dependencies for the application:

```
npm install
```

### Step 3: Set Up Environment Variables

Create a .env file in the root directory of the project by copying the provided .env.example file:

```
cp .env.example .env
```

### Step 4: Start the Application

Start the application using the following command:

```
npm run dev
```

---

### Server Login Page

![Server Login Page](/assets//server-login-page.png)

### Authorization Decision Page

![Auth Decision](/assets//authorization-page.png)
