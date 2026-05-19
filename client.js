const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'kafka-demo',     // identifies your app in kafka logs
    brokers: ['localhost:9092'] // where your kafka broker is running
});

module.exports = kafka;