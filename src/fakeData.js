const {faker} = require('@faker-js/faker')
const dotenv = require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;


async function seedDB() {
    // Connection URL
    const uri = process.env.MONGO_URL;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        fakeTrainings(client);
        fakeOperations(client);
    } catch (err) {
        console.log(err.stack);
    }
}

const fakeTrainings = (client) => {
    const collection = client.db(process.env.MONGO_DB_NAME).collection("trainings");
    collection.drop();

    for (let i = 0; i < 20; i++) {
        const training = {
            title: faker.name.jobTitle(),
            description: faker.lorem.paragraph(),
            picture: faker.image.abstract(),
            trainers: ["216548342451273728"],
            isOpen: faker.datatype.boolean()
        };

        collection.insertOne(training, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`[SUCCESS] => Inserted training ${result.insertedId}.`);
                }
            }
        );
    }
}

const fakeOperations = (client) => {
    const collection = client.db(process.env.MONGO_DB_NAME).collection("operations");
    collection.drop();

    for (let i = 0; i < 6; i++) {
        const operation = {
            title: faker.name.jobTitle(),
            description: faker.lorem.paragraph(),
            picture: faker.image.abstract(),
            date: faker.date.soon(),
            duration: [
                new Date(new Date().setHours(21, 0, 0, 0)),
                new Date(new Date().setHours(23, 0, 0, 0))
            ],
            connectionStartTime: new Date(new Date().setHours(20, 0, 0, 0)),
            roles: [
                {
                    title: "Zeus",
                    group: [
                        {
                            "role": "Zeus",
                            "team": "Zeus",
                            "player": null,
                            "isEditing": false
                        },
                        {
                            "role": "Co-Zeus",
                            "team": "Zeus",
                            "player": null,
                            "isEditing": false
                        }
                    ],
                    teams: [
                        {
                            "name": "Zeus",
                            "isEditing": false
                        }
                    ]
                }
            ]
        };

        collection.insertOne(operation, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`[SUCCESS] => Inserted training ${result.insertedId}.`);
                }
            }
        );
    }
}

seedDB();