docker-compose up
docker-compose up --build

# Build images

docker build --tag nextjs-image .
docker build --tag nginx-image ./nginx

# Create shared network

docker network create my-network

# Run containers

docker run --network my-network --name nextjs-container nextjs-image
docker run --network my-network --link nextjs-container:nextjs --publish 80:80 nginx-image
