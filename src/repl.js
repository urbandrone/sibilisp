const repl = require('repl');
const vm = require('vm');
const transpile = require('./transpiler');



const MSG_PROMPT = 'sibilisp> ';
const MSG_GOODBYE = 'Bye!';



const isBalanced = cmd => {
  const s = { open: 0, index: 0 };
  while (s.index < cmd.length) {
    let c = cmd[s.index];
    if (c === '(') {
      s.open += 1;
    }
    if (c === ')') {
      s.open -= 1;
    }
    s.index += 1;
  }
  return s.open === 0;
}

const evalSibilisp = ctx => {
  vm.createContext(ctx);
  return (cmd, _, filename, callback) => {
    const js = transpile(cmd);
    const script = new vm.Script(js);
    const result = script.runInContext(ctx);
    callback(null, result);
  };
}



const main = () => {
  const r = repl.start({
    prompt: MSG_PROMPT,
    ignoreUndefined: true,
    eval: evalSibilisp({})
  });

  r.on('exit', () => {
    console.log(`\n${MSG_GOODBYE}\n`);
    process.exitCode = 0;
  });
}

module.exports = main;