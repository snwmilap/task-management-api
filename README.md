# Task Management API

A RESTful API for managing tasks built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- CRUD operations for tasks
- Task filtering and pagination
- Task statistics
- Input validation
- Error handling
- Security features (helmet, rate limiting, etc.)
- Testing with Jest

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Helmet** - Security headers
- **Morgan** - HTTP request logger
- **Jest** - Testing framework
- **Supertest** - HTTP testing

## Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/task-management-api.git
   cd task-management-api
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the root directory
   - Copy the contents from `.env.example`
   - Update the values as needed

4. Start the server
   ```
   npm run dev
   ```

## API Documentation

See the full API documentation in the [docs/api_documentation.md](docs/api_documentation.md) file.

## Testing

Run tests with:
```
npm test
```

## Deployment

### Deploying to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the build command as `npm install`
4. Configure the start command as `npm start`
5. Add environment variables in the Render dashboard

### Deploying to Vercel

1. Install the Vercel CLI
   ```
   npm install -g vercel
   ```

2. Login to Vercel
   ```
   vercel login
   ```

3. Deploy
   ```
   vercel --prod
   ```

## License

This project is licensed under the MIT License.
