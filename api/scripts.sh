# Running 500 connections in 5 seconds
autocannon -c 500 -d 5 http://localhost:8080/counter
autocannon -m PUT -c 500 -d 5 http://localhost:8080/counter 

# Comands for up in docker with nginx
sudo docker build -t counter-app-2 -f Dockerfile .
sudo docker network create my_network
sudo docker run -d --name counter-app-2 --network my_network counter-app-2
sudo docker run --name nginx-load-balancer --network my_network -p 8080:80 -v /home/gustavo/Documentos/PROJETOS/distributed-counter/api/nginx.conf:/etc/nginx/nginx.conf nginx

# http://192.168.100.5:3333/  # notebook
# http://192.168.100.63:3333/  # PCZao


## Testes com Apache Bench
 ab -m PUT -n 1000 -c 5 http://192.168.100.5:3333/counter