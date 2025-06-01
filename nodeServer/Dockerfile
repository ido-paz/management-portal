FROM node:20-alpine3.19

# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install --production
# Copy the rest of the application code
COPY . .
# get the port from the environment variable or default to 3000
ARG PORT=3000
# Set the environment variable for the application
ENV PORT=${PORT}
ENV NODE_ENV=production
# Expose the port the app runs on
EXPOSE ${PORT}
#create user with no root privileges
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# Change ownership of the app directory to the new user
RUN chown -R appuser:appgroup /app
# Switch to the new user
USER appuser
# Set the command to run the application
# Use the app.js file as the entry point, pass the port as an argument
CMD ["node", "src/app.js"]


