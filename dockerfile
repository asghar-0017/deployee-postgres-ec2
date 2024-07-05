# Use the official Node.js image as the base image
FROM node:18.16.1

# Install required packages
RUN apt-get update && apt-get install -y python3 build-essential curl

# Set the working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Download and set execute permissions for wait-for-it.sh
RUN curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x wait-for-it.sh

# Rebuild bcrypt with source
RUN npm rebuild bcrypt --build-from-source

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application with wait-for-it.sh
CMD ./wait-for-it.sh pgsql:5432 -- npm start
