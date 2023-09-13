const express = require("express");
const amqp = require("amqplib");
const client = require("prom-client");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

// Create a new counter metric
const messagesReceived = new client.Counter({
  name: "messages_received_total",
  help: "Total number of messages received from the queue",
});

const httpcount = new client.Counter({
  name: "total_http_requests",
  help: "Total number of http requests",
});

async function consumeMessages() {
  try {
    const connection = await amqp.connect(process.env.RABBIT_URL);
    const channel = await connection.createChannel();

    const queue = "hello";
    await channel.assertQueue(queue, { durable: false });

    channel.consume(
      queue,
      (message) => {
        console.log(`Received message: ${message.content.toString()}`);
        messagesReceived.inc();
      },
      { noAck: true }
    );
  } catch (error) {
    console.error(error);
  }
}
consumeMessages();

app.get("/", (req, res) => {
  httpcount.inc();
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static(__dirname));

// Add the /metrics endpoint
app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
