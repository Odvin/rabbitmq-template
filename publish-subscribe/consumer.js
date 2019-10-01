const amqp = require('amqplib');

function messageHandler(message) {
  message.content && console.log(`[x] Received ${message.content.toString()}`);
}

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const EXCHANGE_NAME = 'logs';
  const EXCHANGE_TYPE = 'fanout';
  const EXCHANGE_OPTION = { durable: false };

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, EXCHANGE_OPTION);

  const queueInstance = await channel.assertQueue('', { exclusive: true });

  console.log(
    `[*] Waiting for messages in queue ${queueInstance.queue}. To exit press CTRL+C`
  );

  channel.bindQueue(queueInstance.queue, EXCHANGE_NAME, '');

  channel.consume(queueInstance.queue, messageHandler, { noAck: true });
}

main();
