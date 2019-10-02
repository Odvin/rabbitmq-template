# rabbitmq-template
Using RabbitMQ with a NodeJS

The examples illustrate official RabbitMQ tutorials using modern JavaScript syntax.

## Prerequisites
Docker, Docker-Compose and Node are required.


## Usage
Run RabbitMQ as local server.
```
cd rabbitmq-template/
npm i
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
    node routing/consumer.js error
    node routing/consumer.js info
    node routing/consumer.js warning
    ```
    To send a message:
    ```
    node publish-subscribe/producer.js error "Some error message"
    node publish-subscribe/producer.js info "Some info message"
    node publish-subscribe/producer.js warning "Some warning message"
    ```

5. Topics (Receiving messages based on a pattern):
    ```
                                                            | (Routing pattern) -> Consumer01   
    Producer -> [m01, key][m02, key][m03, key] -> Exchange -| AND
                                                            | (Routing pattern) -> Consumer02
    ```
    Used *topic* type of the exchange.

    Start several consumers in different terminals.
    ```
    node topics/consumer.js "#"
    node topics/consumer.js "kern.*"
    node topics/consumer.js "*.critical"
    node topics/consumer.js "kern.*" "*.critical"
    ```
    To send a message:
    ```
    node topics/producer.js "kern.critical" "A critical kernel error"
    node topics/producer.js "kern.info" "A critical kernel info"
    ```

6. RPC (Request/reply pattern):
    ```
            | -> [req01][req02][req03] -> |   
    Client -|                             | Server (req) => res
            | <- [res01][res02][key03] <- |
    ```
    Used *RPC* type of the exchange.

    Start server (it is possible to start several servers in the different terminals).
    ```
    node rpc/server.js
    node rpc/server.js
    ```
    Start client.
    ```
    node rpc/client.js 30
    ```