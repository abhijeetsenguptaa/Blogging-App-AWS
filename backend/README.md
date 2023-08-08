# Blogging-App-AWS

## Overview

Blogging-App-AWS is a full stack web application that allows users to create, read, update, and delete blog posts. It is an authentication-based app that utilizes JSON Web Tokens (JWT) for user authentication. The application provides various endpoints to handle user registration, login, and managing blog posts.

## Base URL

- Live: [http://3.110.164.90:3003/](http://3.110.164.90:3003/)
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

## Blog Post Routes

### Create a New Blog Post

- Method: POST
- URL: `/blogs/create`
- Description: Create a new blog post.

**Request Body:**

| Field   | Type   | Description             |
| ------- | ------ | ----------------------- |
| title   | String | The title of the blog post. |
| content | String | The content of the blog post. |

**Responses:**

- 201 (Created):
  ```json
  {
    "id": "blog_post_id",
    "title": "Sample Blog Post",
    "content": "This is a sample blog post content."
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "error": "Please provide a title and content for the blog post."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to create the blog post."
  }
  ```

### Get All Blog Posts

- Method: GET
- URL: `/blogs`
- Description: Get information about all blog posts.

**Query Parameters:**

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| limit     | Number | Limit the number of blog posts to be returned. Default is 10.  |
| page      | Number | Specify the page number for pagination. Default is page 1.     |
| sortBy    | String | Sort the blog posts by a specific field (e.g., "createdAt").   |
| sortOrder | String | Specify the sorting order, "asc" (ascending) or "desc" (descending). Default is "asc". |

**Responses:**

- 200 (OK):
  ```json
  {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "blogs": [
      {
        "id": "blog_post_id_1",
        "title": "Sample Blog Post 1",
        "content": "This is the content of sample blog post 1."
      },
      {
        "id": "blog_post_id_2",
        "title": "Sample Blog Post 2",
        "content": "This is the content of sample blog post 2."
      },
      // More blog post objects
    ]
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to fetch blog posts."
  }
  ```

**Description:**

This endpoint allows you to retrieve information about all the blog posts in the system. You can use query parameters to customize the results according to your preferences.

**Query Parameters:**

- `limit`: Use this parameter to limit the number of blog posts returned in a single response. For example, `limit=10` will return a maximum of 10 blog posts in each response. The default value is 10.

- `page`: Use this parameter to specify the page number for pagination. Each page will contain the number of blog posts specified by the `limit` parameter. For example, `page=2` will return the second set of blog posts, and so on. The default value is 1.

- `sortBy`: You can use this parameter to sort the blog posts based on a specific field. Accepted values include "createdAt" (time of creation), "title" (blog post title), or any other field present in the blog post schema.

- `sortOrder`: This parameter specifies the sorting order, and it can have two possible values: "asc" (ascending) and "desc" (descending). The default sorting order is "asc".

Please note that pagination allows you to efficiently retrieve large datasets of blog posts without overwhelming the server or the client with a single massive response. Use the `currentPage`, `totalPages`, and `totalItems` fields in the response to navigate through the paginated results.

### Get Single Blog Post by ID

- Method: GET
- URL: `/blogs/:id`
- Description: Get information about a single blog post by its ID.

**Responses:**

- 200 (OK):
  ```json
  {
    "id": "blog_post_id",
    "title": "Sample Blog Post",
    "content": "This is a sample blog post content."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "Blog post not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to fetch the blog post."
  }
  ```

### Update Blog Post by ID

- Method: PUT
- URL: `/blogs/:id`
- Description: Update a blog post by its ID.

**Request Body:**

| Field   | Type   | Description                   |
| ------- | ------ | ----------------------------- |
| title   | String | The updated title of the blog post. |
| content | String | The updated content of the blog post. |

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "Blog post updated successfully."
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "error": "Please provide a title or content to update."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "Blog post not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to update the blog post."
  }
  ```

### Delete Blog Post by ID

- Method: DELETE
- URL: `/blogs/:id`
- Description: Delete a blog post by its ID.

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "Blog post deleted successfully."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "Blog post not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to delete the blog post."
  }
  ```

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
