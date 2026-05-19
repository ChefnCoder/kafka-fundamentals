const kafka = require('./client');
const readline = require('readline');

async function main() {
    // 1. create producer instance
    const producer = kafka.producer();

    // 2. connect to kafka broker
    await producer.connect();
    console.log('Producer connected');

    // 3. setup terminal input interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // 4. show prompt and wait for input
    rl.setPrompt('Enter message (format: <riderName> <north|south>)\n> ');
    rl.prompt();

    // 5. fires every time user presses enter
    rl.on('line', async (line) => {

        // 6. parse input → "RiderA north" → riderName=RiderA, region=north
        const [riderName, region] = line.trim().split(' ');

        // 7. decide partition manually → north=0, south=1
        const partition = region === 'north' ? 0 : 1;

        // 8. send message to kafka topic
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    key: riderName,                               // groups same rider's msgs in same partition
                    value: JSON.stringify({ riderName, region }), // payload must be string
                    partition                                      // manually set partition
                }
            ]
        });

        console.log(`Sent → rider: ${riderName}, region: ${region}, partition: ${partition}`);

        // 9. show prompt again for next input
        rl.prompt();
    });
}

main();