# Blogging-App-AWS

## Overview

Blogging-App-AWS is a full stack web application that allows users to create, read, update, and delete blog posts. It is an authentication-based app that utilizes JSON Web Tokens (JWT) for user authentication. The application provides various endpoints to handle user registration, login, and managing blog posts.

## Base URL

- Live: 
- Local: [http://localhost:8080](http://localhost:8080)

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. To access protected routes, clients must include a valid token in the `Authorization` header with the "Bearer" scheme.

## Endpoints

### User Routes

#### Register a New User

- Method: POST
- URL: `/users/register`
- Description: Register a new user with the provided details.

**Request Body:**

| Field       | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| firstName   | String   | The first name of the user.              |
| lastName    | String   | The last name of the user.               |
| email       | String   | The email of the user.                   |
| password    | String   | The password of the user.                |
| age         | Number   | The age of the user.                     |
| gender      | String   | The gender of the user.                  |

**Responses:**

- 201 (Created):
  ```json
  {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 30,
    "gender": "male"
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "error": "Please provide all required fields."
  }
  ```
- 409 (Conflict):
  ```json
  {
    "error": "User with this email already exists."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to register the user."
  }
  ```

#### User Login

- Method: POST
- URL: `/users/login`
- Description: Authenticate user login.

**Request Body:**

| Field       | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| email       | String   | The email of the user.                   |
| password    | String   | The password of the user.                |

**Responses:**

- 200 (OK):
  ```json
  {
    "token": "jwt_token"
  }
  ```
- 401 (Unauthorized):
  ```json
  {
    "error": "Invalid credentials."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to authenticate."
  }
  ```

#### Reset User Password

- Method: POST
- URL: `/users/reset-password`
- Description: Reset the user's password.

**Request Body:**

| Field       | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| email       | String   | The email of the user.                   |
| password    | String   | The new password for the user.           |

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "Password reset successful."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "User not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Password reset failed."
  }
  ```

### Get All Users

- Method: GET
- URL: `/users`
- Description: Get information about all users.

**Query Parameters:**

| Parameter   | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| gender      | String   | Filter users by gender (male, female, etc.).       |
| sort        | String   | Sort users by age or time (createdAt).          |
| order       | String   | Specify sorting order (asc or desc). Default is asc. |

**Responses:**

- 200 (OK):
  ```json
  [
    {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "age": 30,
      "gender": "male"
    },
    // More user objects
  ]
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to fetch users."
  }
  ```

**Description:**

This endpoint allows you to retrieve information about all the users registered in the system. You can filter the users based on their gender and sort the results by age or the time of their registration (createdAt).

**Query Parameters:**

- `gender`: You can specify a gender value (e.g., "male", "female") to filter the users based on their gender. If this parameter is not provided, all users will be returned regardless of their gender.

- `sort`: You can use this parameter to sort the users based on their age or the time of their registration. Accepted values are "age" and "createdAt". If this parameter is not provided, the users will be sorted by their database IDs.

- `order`: This parameter specifies the sorting order, and it can have two possible values: "asc" (ascending) and "desc" (descending). The default sorting order is "asc".

#### Get Single User by ID

- Method: GET
- URL: `/users/:id`
- Description: Get information about a single user by their ID.

**Responses:**

- 200 (OK):
  ```json
  {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 30,
    "gender": "male"
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "User not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to fetch user."
  }
  ```

#### Delete User by ID

- Method: DELETE
- URL: `/users/:id`
- Description: Delete a user by their ID.

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "User deleted successfully."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "User not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to delete user."
  }
  ```

#### Update User Information by ID

- Method: PUT
- URL: `/users/:id`
- Description: Update user information by their ID.

**Request Body:**

| Field       | Type     | Description                                       |
| ----------- | -------- | ------------------------------------------------- |
| firstName   | String   | The updated first name of the user.              |
| lastName    | String   | The updated last name of the user.               |
| email       | String   | The updated email of the user.                   |
| age         | Number   | The updated age of the user.                     |
| gender      | String   | The updated gender of the user.                  |

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "User information updated successfully."
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "error": "Please provide at least one field to update."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "User not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to update user information."
  }
  ```

### Blog Post Routes

### Error Responses

- 400 (Bad Request):
  ```json
  {
    "error": "Bad request. Please check your request data."
  }
  ```
- 401 (Unauthorized):
  ```json
  {
    "error": "Unauthorized. Please provide a valid token."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "Resource not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Internal server error. Please try again later."
  }
  ```

## Getting Started

1. Clone the repository from [GitHub Repository URL].
2. Install the required dependencies by running `npm install`.
3. Set up environment variables by creating a `.env` file and defining the necessary variables (e.g., `PORT`, `DB_URI`, `SECRET_KEY`, etc.).
4. Start the server by running `npm run server`.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- cors
- mysql

## Contributing

If you want to contribute to Blogging-App-AWS, please fork the repository, create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or inquiries, please contact us at [senguptabhijeet@gmail.com](mailto:senguptabhijeet@gmail.com).

---
