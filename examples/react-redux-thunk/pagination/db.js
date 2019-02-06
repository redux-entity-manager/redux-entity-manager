const faker = require('faker');

module.exports = () => ({
    users: Array(100).fill(null).map((_, i) => ({
        id: i + 1,
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
    })),
});
