# The Good News Blog
A simple blog platform with an authentication system. The blog allows users to view, edit, and delete posts while ensuring security through API key-based authorization.

## Project Description
The Good News Blog is a full-stack web application where I focused on building and securing backend services that interact with my own internal API. The frontend template was provided by my instructor, allowing me to focus on developing the backend logic and security features. The application enables secure editing and deletion of blog posts through API key authentication, which ensures that only authorized users can perform these actions. By designing the backend from scratch and implementing robust security measures, I demonstrated my ability to create, manage, and secure APIs in a real-world context.

## Demo

## Features
- **Add New Post**: Create new posts via a simple form.
- **Edit Post**: Edit existing posts when the correct API key is provided.
- **Delete Post**: Delete posts securely using API key authentication.
- **API Key Authentication**: Only authorized users can edit or delete posts via secure API key-based validation.

## Technologies Used
- **Frontend**: EJS, HTML, CSS (for rendering and displaying the blog posts).
- **Backend**: Express.js for routing and API handling.
- **API Integration**: Axios to facilitate communication between the frontend and backend.
- **Authentication**:  API key-based authentication for managing post editing and deletion.
- **Environment Variables**: Using dotenv to store sensitive information like API keys.

## Getting Started
To get this project up and running on your local machine, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/a-m-smagare/the-good-news-blog.git
   cd good-news-blog
2. Install dependencies:
   npm install
3. Set up envorinmental variables:
   Create a .env file in the root directory and add your API key:
   API_KEY=your_api_key_here
5. Run the project:
   npm start
   The frontend will be served at http://localhost:3000, and the backend API runs at http://localhost:4000.

## API Routes
- **GET** /posts: Fetches all posts.
- **GET** /posts/:id: Fetches a specific post by ID.
- **POST** /posts: Create a new post.
- **PATCH** /posts/:id: Updates an existing post (API key required).
- **DELETE** /posts/:id: Deletes an existing post (API key required).

## Contributing
Feel free to fork this project and create pull requests for improvements, bug fixes, or new features!

## Sources
The provided Blog Posts are solely for presentation purposes. The written articles are therefore not mine. All credits go to the Authors of the Articles.
