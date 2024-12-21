# **Server Side Stories**

**Project Name: `server-side-stories`**

##### [`Vercel Link`](https://server-side-stories.vercel.app/)

## Features:

### This project has two types of roles:

1.  ### User
2.  ### Admin

# Describing about login and register

- This backend project allows users register and which data keep in a MongoDB database.
- A schema pattern must be followed for register. The schema includes:

  - **name**
  - **email**
  - **password**
  - **role(autometically will be User)**
  - **isBlocked(autometically will be false)**

    **Example:**  
     `post request`

    ```bash
        https://server-side-stories.vercel.app/api/auth/register
    ```

    `request body`

    ```bash
            {
               "name": "John Doe",
                "email": "john@example.com",
                "password": "securepassword"
            }
    ```

- This backend project also allows to users login and which data retrive from MongoDB database
- A schema pattern must be followed for login. The schema includes:

  - **email**
  - **password**  
    **Example:**  
     `post request`

    ```bash
        https://server-side-stories.vercel.app/api/auth/login
    ```

    `request body`

    ```bash
            {
                "email": "john@example.com",
                "password": "securepassword"
            }
    ```

## 🔍 Scopes of User

- By login user can create blog
- A schema pattern must be followed for create blog. The schema includes:

  - **title**
  - **content**
  - **author(default: logged user)**
  - **isPublished (default: true)**

  **Example:**  
   `post request`

  ```bash
      https://server-side-stories.vercel.app/api/blogs
  ```

  `request body`

  ```bash
          {
                "title": "My First Blog",
                "content": "This is the content of my blog."
          }
  ```

- By login user can update blog which is created by himself

  **Example**  
   `patch request`

  ```bash
     https://server-side-stories.vercel.app/api/blogs/6765ce8cf3b9a1c4ad03021e
  ```

  `request body`

  ```bash
          {
                "title": "Updated Blog Title",
                "content": "Updated content."
          }
  ```

- By login user can delete any blog which is created by himself by providing the blog's specific `ID`.  
   **Example**  
   `delete request`

  ```bash
  https://server-side-stories.vercel.app/api/blogs/6765cc7af3b9a1c4ad030216
  ```

- By login or without login whatever anyone can get all blogs  
  **Example**  
   `get request`

  ```bash
    https://server-side-stories.vercel.app/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
  ```

  ## 🚫 Restriction of User

  - user can not delete other blog
  - user can not update other person's blog
  - A user can not blocked other user

## 🔍 Scopes of Admin

- Only logged in admin can delete any blog
  **Example**  
   `delete request`

  ```bash
     https://server-side-stories.vercel.app/api/admin/blogs/6765ce8cf3b9a1c4ad03021e
  ```

- Only logged in admin can delete any blog
  **Example**  
   `patch request`

  ```bash
      https://server-side-stories.vercel.app/api/admin/users/6765cc7af3b9a1c4ad030216/block
  ```

  `request body`

  ```bash
        {
          "isBlocked":true
        }
  ```

  ## 🚫 Restriction of Admin

  - Can not create blog
  - can not update any blog

## 🦸‍♂️ Technologies I have used:

- **npm**: Utilized for installing, updating, and managing project dependencies.
- **Express.js**: Framework used for server-side development.
- **MongoDB**: Database for data storage.
- **Mongoose**: For database schema validation.
- **TypeScript**: Ensures type safety and improves code maintainability.
- **dotenv**: Manages environment variables.
- **cors**: Handles cross-origin requests and enhances security.
- **nodemon**: Automatically restarts the server on code changes.
- **zod**: Used for data validation.
- **Bcrypt**: Secures user passwords.
- **jwt**: Manages authentication and authorization.
- **vercel**: Deploys the project to the cloud.
- **MongoDB Compass**: Facilitates quick database inspection.
- **NoSQL Booster**: Assists in querying MongoDB.

## 🏹 Validate information:

### Authentication

For authentication, I used JWT. Upon login, a user receives a token that verifies their identity and existence. This token allows the user to perform operations that they have access to. Without the token, the user cannot perform any operations. If an unauthenticated user tries to access an API, they will receive an error message in response.

### Authorization

For user and admin-specific roles, I used authorization via JWT tokens. Admins can perform high-security tasks, so to verify if a logged-in user is a regular user or an admin, I implemented authorization using JWT tokens. If a regular user attempts to access an admin API, they will receive an error message in response.

## 📢 Error messgae:

User will get an error message as a response for these types of errors:

- ZOD_ERROR
- NOT_FOUND_ERROR
- VALIDATION_ERROR
- AUTH_ERROR
- AUTHORIZATION_ERROR
- INTERNAL_SERVER_ERROR

<!-- credits -->

## 🙏 Credits

Made with ❤️ by [MD. Rafi Ferdos](github.com/rafiferdos)
