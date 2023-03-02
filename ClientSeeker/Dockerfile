FROM node

# set working directory
WORKDIR /app

# copy package.json & package-lock.json to ./ inside the Docker image
COPY package.json .
 
# install dependencies of the app
RUN npm install && npm install -g expo-cli

# copy the source code to the Docker image
COPY . .

EXPOSE 19000

# start the Client
CMD ["npm", "start"]