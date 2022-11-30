FROM node:lts-alpine

# set working directory
WORKDIR /app

# copy package.json & package-lock.json to ./ inside the Docker image
COPY package*.json ./
 
# install dependencies of the app
RUN npm install

# copy the source code to the Docker image
COPY . .

EXPOSE 20000

# start the Client
CMD ["npm", "start"]