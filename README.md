# React Native To-Do App

A To-Do application developed using React Native and TypeScript with a Node.js backend.

## Features

- User Login
- User Registration
- Create tasks
- Task title and description
- Date and time
- Task deadline
- Priority selection (Low, Medium, High)
- View task list
- Mark tasks as completed
- Delete tasks
- Task status tracking
- REST API integration
- Clean and responsive UI

## Technologies Used

### Frontend
- React Native
- TypeScript
- Expo
- React Navigation
- Axios

### Backend
- Node.js
- Express.js
- REST API

### Database Structure
- MongoDB / Mongoose models included for User and Task data

## Project Structure

- `src/screens` - Application screens
- `src/navigation` - Navigation configuration
- `src/services` - API integration
- `models` - Backend data models
- `routes` - Backend API routes
- `middleware` - Authentication middleware
- `server.js` - Node.js backend server

## Task Management

Users can create tasks with:
- Title
- Description
- Date and time
- Deadline
- Priority

Tasks can also be marked as completed or deleted.

## Run Frontend

Install dependencies:

npm install

Start the application:

npx expo start --web

## Run Backend

Start the Node.js server:

node server.js

Backend runs on:

http://localhost:5000

## Author

Raksha S
