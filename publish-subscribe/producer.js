const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const massage = process.argv.slice(2).join(' ') || 'Hello Rabbit!';

  const EXCHANGE_NAME = 'logs';
  const EXCHANGE_TYPE = 'fanout';
  const EXCHANGE_OPTION = { durable: false };

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, EXCHANGE_OPTION);

  channel.publish(EXCHANGE_NAME, '', Buffer.from(massage));

  console.log(`Massage: ${massage} was sent to the Exchange - ${EXCHANGE_NAME}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 1000);
}

main();