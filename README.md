# MERN Stack Image Carousel

Welcome to the MERN Stack Image Carousel! This project is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) designed to provide an interactive image carousel with various functionalities to enhance user experience.

## Features
- **Image Carousel**: Display images fetched from a Node.js backend.
- **Image Management**: Add, reorder, and delete images.
- **Navigation**: Next and previous buttons for manual navigation.
- **Automatic Rotation**: Images rotate automatically with a customizable interval.
- **User Control**: Users can adjust the interval for automatic image rotation.

## Requirements
1. MongoDB for storing image data.
2. Node.js backend to handle CRUD operations for images.
3. React.js frontend for the carousel and user interactions.

## Setup Instructions
   1. **Clone the Repository**:
      ```bash
      git clone https://github.com/tarundeep2610/Image-Carousel
      cd "Image Carousel"
      ```
   
   2. **Install Dependencies**:
      
      - Backend
         ```bash
         cd backend
         npm install
         ```
         
      - Frontend
         ```bash
         cd frontend
         npm install
         ```
         
   3. **Start the Application**
   
      - Backend
         ```bash
         cd backend
         node server.js
         ```
         
      - Frontend
         ```bash
         cd frontend
         npm run dev
         ```

   4. **Access the Application**
   
      Open your browser and navigate to http://localhost:5173.

## Usage

- Add New Image: Use the upload form to add new images with metadata.
- Reorder Images: Drag and drop to change the sequence.
- Manual Navigation: Use the next and previous buttons.
- Adjust Rotation Interval: Modify the automatic rotation interval through slider.

## Technologies Used

- Frontend: ReactJs.
- Backend: Node.js, Express.js
- Database: MongoDB
