const kafka = require('./client');

async function main() {
    // 1. take groupId from command line → node consumer.js group-1
    const groupId = process.argv[2] || 'group-1';

    // 2. create consumer instance with groupId
    //    same groupId = same group = partitions split among them (work-queue)
    //    different groupId = different group = each gets all messages (pub-sub)
    const consumer = kafka.consumer({ groupId });

    // 3. connect to kafka broker
    await consumer.connect();
    console.log(`Consumer connected | group: ${groupId}`);

    // 4. subscribe to topic
    //    fromBeginning: true → read from offset 0, not just new messages
    await consumer.subscribe({
        topic: 'rider-updates',
        fromBeginning: true
    });

    // 5. start listening loop — runs forever
    //    eachMessage fires for every message received
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // 6. message.value is Buffer → .toString() converts to readable string
            console.log(`[${groupId}] partition: ${partition} | ${message.value.toString()}`);
        }
    });
}

main();