const amqp = require('amqplib');

function fibonacci(n) {
  if (n == 0 || n == 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'rpc_queue';

  await channel.assertQueue(queue, { durable: false });

  console.log(`Waiting for RPC requests. To exit press CTRL+C`);

  channel.prefetch(1);

  channel.consume(queue, msg => {
    const n = parseInt(msg.content.toString());
    console.log(`[x] Fibonacci(${n})`);
    const r = fibonacci(n);

    channel.sendToQueue(msg.properties.replyTo, Buffer.from(r.toString()), {
      correlationId: msg.properties.correlationId,
    });

    channel.ack(msg);
  });
}

main();
