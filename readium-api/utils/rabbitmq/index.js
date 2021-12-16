const amqp = require("amqplib");
const QUEUE = "ai_task_queue";
let openChannel = null;

async function init() {
  try {
    const connection = await amqp.connect("amqp://readium-rabbit:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange("tasks", "fanout", { durable: true });
    await channel.assertQueue(QUEUE, { durable: true });
    openChannel = channel;
    // console.log("RABBITMQ CONNECTED");
    pushTask(1);
  } catch (e) {
    // console.error("FAILED TO CONNECT RABBITMQ");
    return setTimeout(init, 1000);
  }
}

init();

function pushTask(postId) {
  openChannel.sendToQueue(QUEUE, Buffer.from(JSON.stringify({ id: postId })));
}

module.exports = { pushTask };
