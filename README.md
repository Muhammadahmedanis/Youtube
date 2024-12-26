
# Youtube Clone

## Overview:
This project replicates key features of YouTube using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to explore and interact with video content, providing features like video uploading, viewing, commenting, liking/disliking, and user authentication

## Features:

### User Authentication:
Secure login and registration with JWT for session management.
### Video Management:
Upload videos with a title, description, and thumbnail.
### Interaction:
Comment on videos and interact with likes/dislikes.
Subscribe to other users for updates on new uploads.
### Search & Recommendations:
Search functionality for finding videos based on keywords.
Recommendation engine using video tags or user preferences.
### Responsive Design:
Adaptable UI for desktop, tablet, and mobile devices.

## Tools & Libraries

### Frontend:
React Router for navigation.
Axios for API requests.
Styled-components for styling.

### Backend:
bcrypt.js for password hashing.
jsonwebtoken for secure token-based authentication.
Firebase for handling file uploads (videos and thumbnails).

### Database:
MongoDB Atlas for a cloud-based database.
Mongoose for schema modeling and query building.



## Backend Documentation

[Server Configuration Guide](https://documenter.getpostman.com/view/40093365/2sAYJ4jMDH)


## Installation

1: Clone the repository
```bash
  git clone <repository-url> 
```
```bash
  cd Frontend
      &
  cd Backend
```
2: install dependencies
```bash
  npm install
```
3: Set up Environment Variables:
- Create a .env file based on .env.example and configure database connection details, JWT secret, etc.
4: Run the application:
```bash
  npm run dev
```
5:Access Platform:

- Open your browser and go to http://localhost:5173
    
## Technologies Used:

- #### Frontend: HTML, CSS, JavaScript
- #### Backend: Node.js, Express.js
- #### Database: MongoDB, Google Storage
- #### Authentication: JWT (JSON Web Tokens) for secure authentication    
