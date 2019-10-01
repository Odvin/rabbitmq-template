const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const args = process.argv.slice(2);
  const message = args.slice(1).join(' ') || 'Hello Rabbit!';
  const routingKey = (args.length > 0) ? args[0] : 'info';

  const EXCHANGE_NAME = 'direct_logs';
  const EXCHANGE_TYPE = 'direct';
  const EXCHANGE_OPTION = { durable: false };

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, EXCHANGE_OPTION);

  channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(message));

  console.log(`Message: ${message} was sent to the Exchange - ${EXCHANGE_NAME}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
}

main();