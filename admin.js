const kafka = require('./client');

async function main() {
    const admin = kafka.admin();

    await admin.connect();
    console.log('Admin connected');

    await admin.createTopics({
        topics: [
            {
                topic: 'rider-updates',
                numPartitions: 2,   // partition 0 = north, partition 1 = south
            }
        ]
    });
    console.log('Topic created: rider-updates');

    await admin.disconnect();
    console.log('Admin disconnected');
}

main();