# Dockerized Real-Time Chat Application

This Dockerized Real-Time Chat Application is built with Node.js, Express.js, MongoDB, Redis, RabbitMQ, and Socket.io. It leverages containerization to provide an easily deployable and scalable solution for real-time communication between users. The application is divided into several components, each serving a specific purpose, all encapsulated within Docker containers:

## Features

- **Real-Time Chat**: Users can join chat rooms and exchange messages in real-time.
- **User Authentication**: Users can sign in with their username and password for personalized chat experiences.
- **Redis Caching**: Redis is used to cache user authentication data, reducing database queries and improving performance.
- **MongoDB Database**: MongoDB is used to store user data and chat messages.
- **RabbitMQ Messaging**: RabbitMQ is used for message queuing, ensuring efficient message delivery.
- **Metrics Monitoring**: Prometheus is integrated to monitor various application metrics.
- **Dockerized**: The application is containerized using Docker, making it easy to deploy and manage.

## Prerequisites

Before running the application, ensure you have the following prerequisites installed:

- Docker and Docker Compose

## Getting Started

1. Clone the repository to your local machine.

2. Build Docker containers using Docker Compose
   ```shell
   docker-compose build --no-cache
    ```
3. Run all the containers 
    ```shell
   docker compose up -d 
    ```
4. Access the application at http://localhost:8082 and start chatting in real-time!

## Usage

- Sign in with your username and password to join chat rooms.
  
![App Screenshot](screenshots/Screenshot%20(613).png)
- Send messages in real-time.

![App Screenshot](screenshots/Screenshot%20(618).png)
  
- Note: You can create username and password by following below steps

## Creating User Credentials for MongoDB

In this Dockerized Real-Time Chat Application, user credentials for MongoDB need to be created inside the MongoDB container. Follow these steps to create a username and password:

1. Access the MongoDB container:
   
   ```shell
   docker exec -it <container_name> mongosh

2. Create a user with a username and password. Replace <username> and <password> with your desired values:
   ```shell
    db.users.insert({ username: "<username>", password: "<password>" })

3. Exit the MongoDB shell by typing exit.
   
## Monitoring Metrics

- To access application metrics, visit http://localhost:9090 for Prometheus metrics.
- Metric Query: `http_requests_total`
  
![App Screenshot](screenshots/Screenshot%20(614).png)