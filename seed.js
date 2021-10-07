const Data = require('./models/dat');

const items = [
    {
        name: 'Rahul',
        email: "rahul@email.com",
        phone: 9898989898,
        status: true,
        entryTime: "16-20-17",
        exitTime: "-"
    },
    {
        name: 'Raj',
        email: "raj@email.com",
        phone: 9898989898,
        status: true,
        entryTime: "16-20-17",
        exitTime: "-"
    },
];

const seedDB = async () => {

    await Data.deleteMany({});
    await Data.insertMany(items);
    console.log('DB Seeded');
}

module.exports = seedDB;
