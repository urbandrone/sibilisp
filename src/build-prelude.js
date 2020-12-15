const { compl } = require('./utils/lambda');
const Async = require('./utils/async');
const transpile = require('./transpiler');
const util = require('./helpers');



/* ====== PROG DEFINITIONS ====== */


const PRELUDE_IN = util.pnormal(util.pjoin(__dirname, '..', 'prelude'));
const PRELUDE_OUT = util.pnormal(util.pjoin(__dirname, '..'));

const findPreludeFile = fpath => {
  return compl(
    Async.of,
    Async.chain(util.readFile),
    Async.map(data => ({ path: data.file, code: data.code }))
  )(util.pjoin(fpath, 'prelude.slisp'));
};



const alterPathAndType = to => from => compl(
  util.replace('.sibilant')('.js'),
  util.replace('.slisp')('.js'),
  util.replace(from)(to)
);

const run = (srcPath, outPath) => file => {
  return compl(
    Async.of,
    Async.map(util.over('code')(transpile)),
    Async.map(util.over('path')(alterPathAndType(outPath)(srcPath))),
    Async.chain(util.writeFile),
    Async.map(() => 'Created Prelude')
  )(file);
};



const buildPrelude = () => {
  return findPreludeFile(PRELUDE_IN).
    then(run(PRELUDE_IN, PRELUDE_OUT)).
    then(msg => {
      console.log(msg);
      process.exitCode = 0;
    }).
    catch(err => {
      console.error(err.message);
      process.exitCode = 1;
    });
};



buildPrelude();