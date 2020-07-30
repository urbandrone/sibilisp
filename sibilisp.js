const cli = require('./src/cli');

const log = console.log.bind(console);
const err = console.error.bind(console);

cli().then(log).catch(err);
