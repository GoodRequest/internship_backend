require('dotenv').config();

module.exports = {
    require: ['./tests/global.ts'],
    parallel: true,
    timeout: 15000,
    spec: ['./tests/**/*.test.ts']
}