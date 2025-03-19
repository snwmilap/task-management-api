# Task Management API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication Endpoints

### Register User
- **URL**: `/users/register`
- **Method**: `POST`
- **Description**: Register a new user
- **Auth required**: No
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "123456"
  }
  ```
- **Success Response**: 
  - **Code**: 201
  - **Content**: 
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "60d0fe4f5311236168a109ca",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "user"
      }
    }
    ```

### Login User
- **URL**: `/users/login`
- **Method**: `POST`
- **Description**: Login a user
- **Auth required**: No
- **Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "123456"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "60d0fe4f5311236168a109ca",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "user"
      }
    }
    ```

### Get Current User
- **URL**: `/users/me`
- **Method**: `GET`
- **Description**: Get current logged in user
- **Auth required**: Yes
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "id": "60d0fe4f5311236168a109ca",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "user",
        "createdAt": "2023-07-15T12:00:00.000Z"
      }
    }
    ```

### Logout User
- **URL**: `/users/logout`
- **Method**: `GET`
- **Description**: Logout user and clear cookie
- **Auth required**: Yes
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {}
    }
    ```

### Update User Profile
- **URL**: `/users/profile`
- **Method**: `PUT`
- **Description**: Update user profile
- **Auth required**: Yes
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Body**:
  ```json
  {
    "name": "John Updated",
    "email": "johnupdated@example.com"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "id": "60d0fe4f5311236168a109ca",
        "name": "John Updated",
        "email": "johnupdated@example.com",
        "role": "user"
      }
    }
    ```

### Update Password
- **URL**: `/users/password`
- **Method**: `PUT`
- **Description**: Update user password
- **Auth required**: Yes
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Body**:
  ```json
  {
    "currentPassword": "123456",
    "newPassword": "654321"
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

## Task Endpoints

### Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Description**: Create a new task
- **Auth required**: Yes
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Body**:
  ```json
  {
    "title": "Complete Node.js project",
    "description": "Finish the task management API",
    "priority": "high",
    "dueDate": "2023-12-31T23:59:59.000Z"
  }
  ```
- **Success Response**: 
  - **Code**: 201
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "_id": "60d0fe4f5311236168a109ca",
        "title": "Complete Node.js project",
        "description": "Finish the task management API",
        "completed": false,
        "priority": "high",
        "dueDate": "2023-12-31T23:59:59.000Z",
        "user": "60d0fe4f5311236168a109cb",
        "createdAt": "2023-07-15T12:00:00.000Z",
        "updatedAt": "2023-07-15T12:00:00.000Z"
      }
    }
    ```

### Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Description**: Get all tasks for the current user
- **Auth required**: Yes
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters**:
  - `completed` (boolean, optional): Filter by completion status
  - `priority` (string, optional): Filter by priority
  - `page` (number, optional): Page number
  - `limit` (number, optional): Number of tasks per page
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "count": 1,
      "pagination": {
        "next": {
          "page": 2,
          "limit": 10
        }
      },
      "data": [
        {
          "_id": "60d0fe4f5311236168a109ca",
          "title": "Complete Node.js project",
          "description": "Finish the task management API",
          "completed": false,
          "priority": "high",
          "dueDate": "2023-12-31T23:59:59.000Z",
          "user": "60d0fe4f5311236168a109cb",
          "createdAt": "2023-07-15T12:00:00.000Z",
          "updatedAt": "2023-07-15T12:00:00.000Z"
        }
      ]
    }
    ```

### Get Single Task
- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Description**: Get a single task
- **Auth required**: Yes
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **URL Parameters**:
  - `id`: Task ID
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "_id": "60d0fe4f5311236168a109ca",
        "title": "Complete Node.js project",
        "description": "Finish the task management API",
        "completed": false,
        "priority": "high",
        "dueDate": "2023-12-31T23:59:59.000Z",
        "user": "60d0fe4f5311236168a109cb",
        "createdAt": "2023-07-15T12:00:00.000Z",
        "updatedAt": "2023-07-15T12:00:00.000Z"
      }
    }
    ```

### Update Task
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Description**: Update a task
- **Auth required**: Yes
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **URL Parameters**:
  - `id`: Task ID
- **Body**:
  ```json
  {
    "title": "Updated task title",
    "completed": true
  }
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "_id": "60d0fe4f5311236168a109ca",
        "title": "Updated task title",
        "description": "Finish the task management API",
        "completed": true,
        "priority": "high",
        "dueDate": "2023-12-31T23:59:59.000Z",
        "user": "60d0fe4f5311236168a109cb",
        "createdAt": "2023-07-15T12:00:00.000Z",
        "updatedAt": "2023-07-15T12:00:00.000Z"
      }
    }
    ```

### Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Description**: Delete a task
- **Auth required**: Yes
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **URL Parameters**:
  - `id`: Task ID
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {}
    }
    ```

### Get Task Statistics
- **URL**: `/tasks/stats`
- **Method**: `GET`
- **Description**: Get task statistics
- **Auth required**: Yes
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "success": true,
      "data": {
        "completionStats": [
          {
            "_id": false,
            "count": 5,
            "tasks": [
              { "title": "Task 1", "priority": "high" },
              { "title": "Task 2", "priority": "medium" }
            ]
          },
          {
            "_id": true,
            "count": 3,
            "tasks": [
              { "title": "Task 3", "priority": "low" }
            ]
          }
        ],
        "priorityStats": [
          {
            "_id": "low",
            "count": 2
          },
          {
            "_id": "medium",
            "count": 3
          },
          {
            "_id": "high",
            "count": 3
          }
        ]
      }
    }
