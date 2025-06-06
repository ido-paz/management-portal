# Management Portal

This project is a demonstration of a full stack application for managing users and locations. It is created mainly using Vibe Coding principles and technologies.

## Features

- User management (create, update, delete, list)
- Location management (create, update, delete, list)
- Modern full stack architecture

## Technologies Used

- Vibe Coding stack (Node.js, .NET, Vanilla JS, Docker)
- Node.js for the locations service
- .NET for the users service
- Vanilla JavaScript for the client UI
- Docker for containerization and orchestration

## Project Structure

- `/usersService` - Backend service for user management (C#/.NET)
- `/locationsService` - Backend service for location management (Node.js/Express)
- `/vanilaClient` - Frontend UI (Vanilla JavaScript, HTML, CSS) to interact with both services
- `/servicesTester` - Scripts for testing the APIs

## How It Works

- The `usersService` provides RESTful APIs to manage users.
- The `locationsService` provides RESTful APIs to manage locations.
- The `vanilaClient` is a simple web UI that allows you to interact with both services from your browser.
- All services can be run individually or together using Docker Compose.

## Getting Started

### Prerequisites

- Node.js (version 18.x or higher)
- .NET 9.0 SDK
- npm or yarn
- Docker (optional, for containerized setup)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/management-portal.git
   cd management-portal
   ```

2. Install dependencies for the location service and testers:
   ```sh
   cd locationsService
   npm install
   cd ../servicesTester
   npm install
   cd ..
   ```

### Running the Application

#### Using Docker Compose (Recommended)

To start all services and the client UI:

```sh
# From the project root
docker-compose up --build
```

- The users service will be available at `http://localhost:5000` (default)
- The locations service will be available at `http://localhost:3001` (default)
- The client UI will be available at `http://localhost:8080`

#### Running Manually

1. Start the users service:
   ```sh
   cd usersService
   dotnet run
   ```
2. Start the locations service:
   ```sh
   cd locationsService
   npm start
   ```
3. Serve the client UI (e.g., using a simple HTTP server):
   ```sh
   cd vanilaClient
   # For Python 3.x
   python -m http.server 8080
   # Or use any static server
   ```

Then open `http://localhost:8080` in your browser to use the UI.

## License

This project is for demonstration purposes.