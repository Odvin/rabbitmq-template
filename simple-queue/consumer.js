const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'simpleQueue';

  await channel.assertQueue(queue, { durable: false });
  
  console.log(
    `Waiting for messages from the Queue - ${queue}. To exit press CTRL+C`
  );

  channel.consume(
    queue,
    function(msg) {
      console.log(' [x] Received %s', msg.content.toString());
    },
    {
      noAck: true,
    }
  );
}

main();
