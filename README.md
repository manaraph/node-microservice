# node-microservice
A Node microservice implementation with typescript, swagger and docker

## Getting Started
### Pre-reqs
- [Docker](https://docs.docker.com/engine/installation/)
- [Docker Compose](https://docs.docker.com/compose/)

### Creating a new microservice
cd to root folder
Install typeorm as a global dependency if you haven't then run `typeorm init --name user-microservice --database mysql --express`. Note `user-microservice` is the name of the microservice.
Add the docker configuration for the new microservice.

### Running
#### Running all individual services
cd folder-name 
Start Development server `npm run dev`
Check for lint errors `npm run tslint`

#### Running all services
Install and start docker by `docker-compose up`.

## TODO
- Setup Swagger.
- Setup Unit testing.
- Setup Nginx server on docker.
- Finish up Docker configuration.