FROM node:24.13.0

# Set the working directory
WORKDIR /term-project-group-5/backend

COPY package.json ./

# install the dependencies defined in package.json
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem
COPY . .

# inform Docker that the container is listening on port 5050 at runtime
EXPOSE 5001

CMD ["npm", "start"]
