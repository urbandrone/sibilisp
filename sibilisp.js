const cli = require('./src/cli');

cli().then(msg => {
  console.log(msg);
  process.exitCode = 0;
}).catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});
