# Use the official Node.js image
FROM node:20.14-alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8080

# Define the command to run the app
CMD ["npm", "start"]
