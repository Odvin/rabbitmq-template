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
    It is possible to run the producer several times to send the message again.
2. Work queue (Distributing tasks among workers):
    ```
                                 | -> Consumer01   
    Producer -> [m01][m02][m03] -| OR
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

3. Publish/Subscribe (Sending messages to many consumers at once):
    ```
                                             | -> Consumer01   
    Producer -> [m01][m02][m03] -> Exchange -| AND
                                             | -> Consumer02
    ```
    Used *fanout* type of the exchange.

    Start several consumers in different terminals.
    ```
    node publish-subscribe/consumer.js
    ```
    To send a message:
    ```
    node publish-subscribe/producer.js Some message
    ```

4. Routing (Receiving messages selectively):
    ```
                                                            | (Routing key filter) -> Consumer01   
    Producer -> [m01, key][m02, key][m03, key] -> Exchange -| AND
                                                            | (Routing key filter) -> Consumer02
    ```
    Used *direct* type of the exchange.

    Start several consumers in different terminals.
    ```
    node routing/consumer.js [error | info | warning]
    ```
    To send a message:
    ```
    node publish-subscribe/producer.js [error | info | warning] "Some message"
    ```