const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'simpleQueue';
  const message = 'Hello Rabbit!';

  await channel.assertQueue(queue, { durable: false });

  channel.sendToQueue(queue, Buffer.from(message));

  console.log(`Message: ${message} was sent to the Queue - ${queue}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
}

main();