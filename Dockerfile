# Use Node.js version 14 as the base image
FROM node:14
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Start the application
CMD ["node", "index.js"]