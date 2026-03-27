# Social Media Platform - Backend

This is the backend of a **Social Media Platform** built using the MERN stack. The backend provides RESTful APIs for user authentication, profile management, post creation, likes, comments, and other core functionalities.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT-based authentication.
- **User Profiles**: Fetch and update user profile information.
- **Posts**: Create posts, view posts, and manage user-generated content.
- **Likes & Comments**: Add likes and comments to posts.
- **Scalable Architecture**: Designed to handle multiple users efficiently.
- **Database**: MongoDB for storing users, posts, likes, and comments.

## 📂 Folder Structure

```plaintext
/social-media-backend
  ├── /config
  │     └── db.js               # MongoDB configuration
  ├── /models
  │     ├── User.js             # User schema
  │     ├── Post.js             # Post schema
  │     ├── Comment.js          # Comment schema
  │     └── Like.js             # Like schema
  ├── /controllers
  │     ├── authController.js   # Authentication logic
  │     ├── postController.js   # Post, like, and comment logic
  │     └── userController.js   # User profile management
  ├── /routes
  │     ├── authRoutes.js       # Routes for signup and login
  │     ├── postRoutes.js       # Routes for posts, likes, and comments
  │     └── userRoutes.js       # Routes for user profiles
  ├── /middleware
  │     └── authMiddleware.js   # JWT authentication middleware
  └── server.js                 # Entry point to the backend

```
## 🛠️ Installation and Setup

Follow these steps to set up the backend:

### Prerequisites

- **Node.js** (v16 or later)
- **MongoDB** (local or cloud instance)

### Steps

1.  git clone cd social-media-backend
2.  npm install
3.  Create a .env file in the root of the project and add the following variables:PORT=8000MONGO_URI=mongodb+srv://JWT_SECRET=
4.  npm startThe server will start at [http://localhost:8000](http://localhost:8000/).

## 🛡️ API Endpoints

### Authentication (/auth)

- **POST /auth/signup**: Register a new user.
- **POST /auth/login**: Log in and receive a JWT token.

### Posts (/posts)

- **POST /posts**: Create a new post (requires authentication).
- **POST /posts/:id/like**: Like a specific post.
- **POST /posts/:id/comment**: Comment on a specific post.
- **GET /posts**: Get all posts.

### Users (/user)

- **GET /user/profile**: Fetch the logged-in user's profile (requires authentication).
- **PUT /user/profile**: Update the logged-in user's profile.

## 🌐 Live API Demo

- **Base URL**: [http://localhost:8000](http://localhost:8000/) (Replace with the deployed URL)

## 🧪 Testing with Postman

1.  **Import the Postman Collection**Use the provided Postman collection file to test all API routes.
2.  **Run the Endpoints**

    - Use the /auth/signup endpoint to register.
    - Log in using /auth/login to get a JWT token.
    - Pass the token in the Authorization header (Bearer ) to test other endpoints.

## 🧑‍💻 Contributing

Contributions are welcome! To contribute:

1.  Fork the repository.
2.  Create a new branch (git checkout -b feature-name).
3.  Commit changes (git commit -m 'Add feature').
4.  Push to the branch (git push origin feature-name).
5.  Open a pull request.
```
