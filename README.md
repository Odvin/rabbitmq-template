# rabbitmq-template
Using RabbitMQ with a NodeJS

## Prerequisites
Docker, Docker-Compose and Node are required.


## Usage
Run RabbitMQ as local server.
```
docker-compose up
```

To use management plugin go to `http://localhost:8080` or `http://host-ip:8080` in a browser with the default username and password of *guest / guest*.

## Examples
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
2. Work queue:
    ```
                                 | -> Consumer01   
    Producer -> [m01][m02][m03] -|
                                 | -> Consumer02
    ```
    Messages are balanced, acknowledgments required.

    Start several consumers in different terminals.
    ```
    node ./work-queues/consumer.js
    ```
    To send a message:
    ```
    node ./work-queues/producer.js Some message....
    ```
    The dots set the time for the consumer to finish the task.