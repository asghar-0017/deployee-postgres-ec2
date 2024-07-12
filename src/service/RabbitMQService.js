const amqp = require('amqplib');

const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || 5672;
let channel = null;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(`amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
    process.exit(1);
  }
};

const getChannel = () => channel;

const publishToQueue = async (queueName, data) => {
  if (!channel) {
    console.error('Channel not initialized');
    return;
  }
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
};

const consumeQueue = async (queueName, callback) => {
  if (!channel) {
    console.error('Channel not initialized');
    return;
  }
  await channel.assertQueue(queueName, { durable: true });
  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      await callback(JSON.parse(msg.content.toString()));
      channel.ack(msg);
    }
  });
};

module.exports = {
  connectRabbitMQ,
  getChannel,
  publishToQueue,
  consumeQueue,
};
