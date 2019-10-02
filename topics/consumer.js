const amqp = require('amqplib');

function messageHandler(message) {
  message.content && console.log(`[x] Received message: ${message.content.toString()} with routing key ${message.fields.routingKey}`);
}

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const EXCHANGE_NAME = 'topic_logs';
  const EXCHANGE_TYPE = 'topic';
  const EXCHANGE_OPTION = { durable: false };

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, EXCHANGE_OPTION);

  const queueInstance = await channel.assertQueue('', { exclusive: true });

  console.log(
    `[*] Waiting for messages in queue ${queueInstance.queue}. To exit press CTRL+C`
  );

  args.map(routingKey => channel.bindQueue(queueInstance.queue, EXCHANGE_NAME, routingKey));

  channel.consume(queueInstance.queue, messageHandler, { noAck: true });
}

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Consumer.js receives messages with routing key: <facility>.<severity>");
  process.exit(1);
}

main();