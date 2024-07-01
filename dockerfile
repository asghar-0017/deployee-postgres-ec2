FROM node:18.16.1

# Install build dependencies
RUN apt-get update && apt-get install -y python3 build-essential

# Create app directory
WORKDIR /src/app

# Copy package files
COPY package*.json ./

# Remove node_modules if exists and install dependencies
RUN rm -rf node_modules
RUN npm install
RUN npm audit fix

# Rebuild bcrypt for the correct environment
RUN npm rebuild bcrypt --build-from-source

# Bundle app source
COPY . .

EXPOSE 4000
CMD ["node", "server.js"]