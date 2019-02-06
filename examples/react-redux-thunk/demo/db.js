const faker = require('faker');

const random = (min, max) => min + Math.floor((max - min + 1) * Math.random());

const nUsers = 5;

module.exports = () => ({
    users: Array(nUsers).fill(null).map((_, i) => ({
        id: i + 1,
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
    })),
    posts: Array(100).fill(null).map((_, i) => ({
        id: i + 1,
        title: faker.lorem.sentence(),
        userId: random(1, nUsers),
    })),
});
