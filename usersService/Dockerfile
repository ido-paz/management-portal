# Use the official .NET runtime image for minimal size
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS runtime
WORKDIR /app

# Copy build output
COPY bin/Debug/net9.0/ ./
COPY users.json ./

# get the port from the environment variable or default to 3000
ARG PORT=3000
# Set the environment variable for the application
ENV PORT=${PORT}
# Expose port (default 3000, can be overridden by PORT env)
EXPOSE 3000

# Set environment (optional, for production)
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT:-3000}

ENTRYPOINT ["dotnet", "UsersService.dll"]
