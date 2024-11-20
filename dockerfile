# FROM node:18

# WORKDIR /src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN mkdir -p /src/app/uploads

# RUN chmod +x wait-for-it.sh

# EXPOSE 4000

# CMD ["sh", "-c", "./wait-for-it.sh pgsql:5433 -- ./wait-for-it.sh redis:6379 -- npm start"]


FROM node:18

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p /src/app/uploads

EXPOSE 4000

CMD ["npm", "start"]
