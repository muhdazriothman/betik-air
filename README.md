# ✈️ Betik Air - Flight Search & Booking API

An API for searching and booking flights built with NestJS and TypeScript. This application provides endpoints for user authentication and flight search functionality.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication
- **Flight Search**: Search for round-trip flights with customizable parameters
- **API Documentation**: Complete Swagger/OpenAPI documentation

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/betik-air.git
   cd betik-air
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run start:dev
```

This will start the server in development mode with hot-reload enabled. The API will be available at `http://localhost:3000`.

### Production Mode

```bash
npm run build
npm run start:prod
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

## 🔑 Authentication

The API uses JWT for authentication. To authenticate:

1. Send a POST request to `/auth/login` with:
   ```json
   {
     "username": "admin",
     "password": "admin"
   }
   ```

2. You will receive a JWT token in response:
   ```json
   {
     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5..."
   }
   ```

3. Include this token in the `Authorization` header for subsequent requests:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5...
   ```

## 📚 API Documentation

API documentation is available in OpenAPI/Swagger format. You can:

1. View the raw Swagger file at: `swagger.yml` in the project root
2. View the interactive documentation when the application is running:
   ```
   http://localhost:3000/api
   ```

For a quick reference, you can also import the `swagger.yml` file into tools like:
- [Swagger Editor](https://editor.swagger.io/)
- [Postman](https://www.postman.com/) (Import as OpenAPI specification)

### Available Endpoints

| Method | Endpoint         | Description                   | Authentication |
|--------|------------------|-------------------------------|----------------|
| POST   | /auth/login      | Authenticate user             | No             |
| GET    | /flight/search   | Search for flights            | Yes            |

### Flight Search Parameters

The `/flight/search` endpoint accepts the following query parameters:

- `departureDate`: Departure date in format DD-MM-YYYY
- `returnDate`: Return date in format DD-MM-YYYY
- `origin`: Origin location code
- `originId`: Origin location ID
- `destination`: Destination location code
- `destinationId`: Destination location ID

Example request:
```
GET /flight/search?departureDate=15-05-2025&returnDate=27-05-2025&origin=KUL&originId=1&destination=SIN&destinationId=2
```
