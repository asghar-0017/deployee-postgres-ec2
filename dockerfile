# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Create the uploads directory
RUN mkdir -p /src/app/uploads

# Make wait-for-it.sh executable
RUN chmod +x wait-for-it.sh

# Expose the port the app runs on
EXPOSE 4000

# Run the web service on container startup.
CMD ["sh", "-c", "./wait-for-it.sh pgsql:5432 -- ./wait-for-it.sh redis:6379 -- npm start"]
