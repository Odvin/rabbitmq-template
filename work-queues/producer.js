const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'workQueue';
  const massage = process.argv.slice(2).join(' ') || 'Hello Rabbit!';

  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(massage), { persistent: true });

  console.log(`Massage: ${massage} was sent to the Queue - ${queue}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
}

main();