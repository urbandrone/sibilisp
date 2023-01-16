const cli = require('./src/cli');

// cli().then(msg => {
//   console.log(msg);
//   process.exitCode = 0;
// }).catch(err => {
//   console.error(err.message);
//   process.exitCode = 1;
// });

const result = cli();
result.cmd().then(msg => {
  console.log(msg);
  if (result.type !== 'repl') {
    process.exitCode = 0;
  }
}).catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});
