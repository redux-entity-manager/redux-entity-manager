const faker = require('faker');

module.exports = () => ({
    users: Array(20).fill(null).map((_, i) => ({
        id: i + 1,
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
    })),
    posts: Array(20).fill(null).map((_, i) => ({
        id: i + 1,
        title: faker.lorem.sentence(),
    })),
});
