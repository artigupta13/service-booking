# Service Booking Application

This is a Node.js application for managing services and bookings.

## Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```
    PORT=3000
    MONGODB_URI=<mongodb-uri>
    SECRET_KEY=<secret-key>
    ```

    Replace `<mongodb-uri>` with your MongoDB connection URI and `<secret-key>` with a secret key for JWT token generation.

4. **Start the server:**

    ```bash
    npm start
    ```

## API Documentation

### Authentication

- **POST /api/register**: Register a new user with username, email, password, and role (customer or admin).
- **POST /api/login**: Log in with username and password. Returns a JWT token.


### Services

- **GET /api/services**: Get all services.
- **POST /api/services**: Add a new service.
- **GET /api/services/:id**: Get service by ID.
- **PUT /api/services/:id**: Update service by ID.
- **DELETE /api/services/:id**: Delete service by ID.

### Jobs

- **GET /api/jobs**: Get all jobs.
- **POST /api/jobs**: Add a new job.
- **GET /api/jobs/:id**: Get job by ID.
- **PUT /api/jobs/:id**: Update job by ID.
- **DELETE /api/jobs/:id**: Delete job by ID.

## Architecture and Libraries

This application is built with Express.js for the server framework and MongoDB for the database. Here are some of the key libraries used:

- **bcryptjs**: For password hashing.
- **cookie-parser**: For parsing cookies.
- **csurf**: For CSRF protection.
- **dotenv**: For loading environment variables.
- **express**: For building the RESTful API.
- **helmet**: For setting HTTP headers for security.
- **jsonwebtoken**: For JWT-based authentication.
- **mongodb**: For interacting with MongoDB database.
- **validator**: For data validation.
