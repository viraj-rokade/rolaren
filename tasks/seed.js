const dbConnection = require('../db/connection');
const data = require('../data');
const codes = data.user_function;

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    await codes.addAccessCode("52bleAR");
    await codes.addAccessCode("cGjvfOT");
    await codes.addAccessCode("kgVW4oU");
    await codes.addAccessCode("5yizdQt");
    await codes.addAccessCode("DWoPk6f");
    await codes.addAccessCode("9MK3HjP");
    await codes.addAccessCode("qmkyG5h");
    await codes.addAccessCode("JMvMAL5");
    await codes.addAccessCode("DMalZaW");
    await codes.addAccessCode("5OIg0I9");
    await codes.addAccessCode("e0ODMt0");
    await codes.addAccessCode("xoawrWH");
    await codes.addAccessCode("K6GHwhy");
    await codes.addAccessCode("BR1njJc");
    await codes.addAccessCode("yqtrbrk");
    await codes.addAccessCode("BerFVxc");
    await codes.addAccessCode("QBHGs7S");
    await codes.addAccessCode("8uOVP5i");
    await codes.addAccessCode("Dfyzbb6");
    await codes.addAccessCode("J0nZZIr");
    await codes.addAccessCode("71O72ir");
    await codes.addAccessCode("oONW5SO");
    await codes.addAccessCode("6lNNroa");
    await codes.addAccessCode("Nsn5WKq");
    await codes.addAccessCode("OVfzUT7");

    console.log('Done seeding database');

    await db.serverConfig.close();
};

main().catch(console.log);