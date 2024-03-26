# ToDo List Backend

This project is a backend service for managing tasks built using Nest.js with TypeScript. It utilizes Firebase for authentication and Realtime Database for storing task information.

## Project Overview

The main goal of this project is to provide a backend service that allows users to manage their tasks. Users can perform operations such as creating, reading, updating, and deleting tasks. Authentication is handled by Firebase, and task information is stored in Realtime Database.

## Folder Structure

The project is organized into several folders:

- **auth**: Contains the service and controller for user authentication. It also includes middleware to check user tokens.
- **tasks**: Houses the service and controller for managing tasks. It provides endpoints for creating, reading, updating, and deleting tasks.
- **common**: Contains files related to settings and constants used across the project, including Firebase configuration.

## Technologies Used

- **Nest.js**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: A superset of JavaScript that adds static typing to the language.
- **Firebase**: A platform provided by Google for building web and mobile applications, including authentication and Realtime Database.
  
## Database Structure

The tasks database is implemented with the following fields:

- **id**: Unique identifier for each task.
- **title**: Title of the task.
- **description**: Description of the task.
- **status**: Current status of the task (e.g., "pending" or "completed").
- **updatedAt**: Timestamp indicating when the task was last updated.
- **createdAt**: Timestamp indicating when the task was created.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/your-repository.git`
2. Install dependencies: `npm install` or `yarn install`
3. Configure Firebase: Set up a Firebase project and configure the necessary credentials.
4. Start the development server: `npm run start:dev` or `yarn start:dev`
5. The server will start running at the specified port (e.g., `http://localhost:3000`).

