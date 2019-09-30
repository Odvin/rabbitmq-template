# rabbitmq-template
Using RabbitMQ with a NodeJS

## Prerequisites
----
Docker and Node are required.


## Usage
-----

Run RabbitMQ as local server.
```
docker run -d --hostname rabbit --name rabbit -p 8080:15672 -p 5672:5672 rabbitmq:3-management
```

It is possible to use management plugin go to `http://localhost:8080` or `http://host-ip:8080` in a browser with the default username and password of *guest / guest*.

## Examples
---
1. Simple queue:
    ```
    Producer -> [m01][m02][m03] -> Consumer
    ```
    To start producer run
    ```
    node ./simple-queue/producer.js
    ```
    To start consumer run
    ```
    node ./simple-queue/consumer.js
    ```
    It is possible to run the producer several times to send the massage again.
