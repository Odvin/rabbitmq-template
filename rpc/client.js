const amqp = require('amqplib');

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log('Usage: RPC client.js num');
  process.exit(1);
}

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queueInstance = await channel.assertQueue('', { exclusive: true });

  const queue = 'rpc_queue';
  const correlationId = Math.random().toString();
  const num = parseInt(args[0]);

  console.log(`[x] Requesting Fibonacci(${num})`);

  channel.consume(
    queueInstance.queue,
    msg => {
      if (msg.properties.correlationId == correlationId) {
        console.log(`[.] Got ${msg.content.toString()}`);

        setTimeout(() => {
          connection.close();
          process.exit(0);
        }, 500);
      }
    },
    { noAck: true }
  );

  channel.sendToQueue(queue, Buffer.from(num.toString()), {
    correlationId: correlationId,
    replyTo: queueInstance.queue,
  });
}

main();
