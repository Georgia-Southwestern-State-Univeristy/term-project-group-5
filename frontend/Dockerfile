# Description: Dockerfile for the client side of the MERN stack application
FROM node:24.13.0

# Set the working directory
WORKDIR /term-project-group-5

COPY package.json ./

# install the dependencies defined in package.json
RUN npm install

# inform Docker that the container is listening on port 5050 at runtime
EXPOSE 5173

# Copy the rest of your app's source code from your host to your image filesystem
COPY . .

CMD ["npm", "run", "dev"]
