const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'workQueue';

  await channel.assertQueue(queue, { durable: true });

  console.log(
    `Waiting for messages from the Queue - ${queue}. To exit press CTRL+C`
  );

  channel.consume(
    queue,
    msg => {
      const secs = msg.content.toString().split('.').length - 1;

      console.log(`[x] Received ${msg.content.toString()}`);

      setTimeout(() => {
        console.log('[x] Done');
        channel.ack(msg);
      }, secs * 1000);
    },
    { noAck: false }
  );
}

main();
