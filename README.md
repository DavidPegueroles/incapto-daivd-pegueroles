# Robot API

This project hosts a TypeScript-based API for a simulated robot that navigates a 10x10 grid. The API interprets movement commands to rotate and move the robot across the grid. The final position and direction are returned after command execution

## Description

This repository contains the code for a technical test project aimed at developing a functional API to control a robot capable of terrain analysis. The API, hosted on GitHub, allows the robot to navigate a 10x10 grid and provide real-time feedback on its position and orientation. The robot can analyze terrain and generate a 3D view from the photos it captures.

The API is designed with TypeScript and evaluates the robot's movements based on a set of commands ('L' for left, 'R' for right, and 'M' for moving forward). The robot's initial position is always at coordinates 0,0 facing North (the bottom-left corner of the grid). As the robot moves across the grid, it wraps around to the opposite side if it reaches the grid's edge.

For example, sending the string 'MRMMLMML' to the robot's endpoint will rotate its direction, move it across the grid, and result in the robot's new position and direction being returned by the API. If the robot ends up at column 2, row 3, facing West, the API will return '2:3:W' as the output.

## Getting Started

### Dependencies

This project requires Node.js (v16 or above recommended) and npm (usually comes with Node.js). TypeScript is the main programming language used. Ensure you have a modern web browser to view the Swagger UI documentation. The API is built with Express.js, tests are run using Jest, and nodemon is utilized for live reloading during development.

### Installing

1. Clone the repository:

   `git clone https://github.com/DavidPegueroles/incapto-daivd-pegueroles`

2. Navigate to the project directory and install the project dependencies using:

   `npm install`

3. Build the TypeScript files with:

   `npm run build`

### Executing Program

To run the program in production, follow these steps:

1. Build the project if you haven't already:

   `npm run build`

2. Start the server:

   `npm start`

   To run the program in development mode with hot reload:

   `npm run start:dev`

### Testing

To run the test suite:

`npm test`

To continuously watch and run tests during development:

`npm run test:watch`

To generate and view test coverage reports:

`npm run test:coverage`

## API Documentation

Once the server is running, you can access the Swagger UI documentation at `http://localhost:3000/api-docs` to interact with the API.

## Future Enhancements

### Adding New Endpoints

When expanding the API with new endpoints, follow the established patterns in the existing routes. Ensure that each new controller has corresponding Swagger documentation comments to maintain up-to-date API documentation.

### Error Handling

As the API grows, it's important to implement robust error handling:

- **Not Found Handler**: Create a middleware that catches any unhandled routes and responds with a 404 Not Found status. This will manage requests to endpoints that don't exist.

- **General Error Handler**: Set up a global error handling middleware at the end of the middleware stack. This will capture and handle any errors thrown during the request-response cycle, ensuring a consistent error response structure.

These practices will contribute to a maintainable and scalable codebase as the API evolves.
