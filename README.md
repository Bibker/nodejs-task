## Note: Admin Credential

```bash
   admin@gmail.com,   pw:admin@2177
```

# Getting Started with Setting Up the Project

Welcome to Post Content CRUD API! This guide will walk you through the process of setting up a Node.js project, installing packages, running a server, handling environment variables, and using MongoDB.

## Prerequisites

Before getting started, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (which includes npm, the Node.js package manager)
- [MongoDB](https://www.mongodb.com/)

## Cloning the Project

First, clone the project repository to your local machine using Git:

```bash
git clone https://github.com/Bibker/nodejs-task
cd nodejs-task
```

## Installing Packages

To install the necessary packages for the project, follow these steps:

1. **Install Packages:** Run the following command to install the required npm packages listed in the `package.json` file:

   ```bash
   npm install
   ```

   This command will automatically fetch and install all the dependencies specified in the `dependencies` and `devDependencies` sections of the `package.json` file.

## Environment Variables

Setup .env file to store environmental variables

1. **Create a `.env` File:** In the root directory, create a file named `.env`.

2. **Define Environment Variables:** Inside the `.env` file, define environment variables in the format given in `.env.example`.

## Running the Server

To run Node.js server, follow these steps:

1. **Start the Development Server:**

   ```bash
    npm run dev
   ```

2. **Now Server is up and running in the given PORT**
   ```bash
   localhost:5000
   ```

## Check API Documentation (swagger)

1. **To access the documentation, visit:**

```bash
   localhost:5000/api-docs
```
