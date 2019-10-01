const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'simpleQueue';
  const massage = 'Hello Rabbit!';

  await channel.assertQueue(queue, { durable: false });

  channel.sendToQueue(queue, Buffer.from(massage));

  console.log(`Massage: ${massage} was sent to the Queue - ${queue}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
}

main();