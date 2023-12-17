# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR .

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


# Install application dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Database migrations
RUN npm run setup-dev

# Expose the port that the application will run on
EXPOSE 5000

# Command to run your Node.js application
CMD ["npm", "start"]
