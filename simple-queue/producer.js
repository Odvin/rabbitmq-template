const amqp = require('amqplib');

async function main() {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();

  const queue = 'simpleQueue';
  const massage = 'Hello Rabbit!';

  await channel.assertQueue(queue, { durable: false });

  channel.sendToQueue(queue, Buffer.from(massage));

  console.log(`Massage: ${massage} was sent to the Queue - ${queue}`);

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 1000);
}

main();