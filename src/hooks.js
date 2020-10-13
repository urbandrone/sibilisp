const { compl } = require('./utils/lambda');
const Async = require('./utils/async');
const transpile = require('./transpiler');
const util = require('./helpers');



/* ====== PROG DEFINITIONS ====== */


const PREPUBLISH_IN = util.pnormal(util.pjoin(__dirname, '..', 'prelude'));
const PREPUBLISH_OUT = util.pnormal(util.pjoin(__dirname, '..'));

const prePublish_findPreludeFile = fpath => {
  return compl(
    Async.of,
    Async.chain(util.readFile),
    Async.map(data => ({ path: data.file, code: data.code }))
  )(util.pjoin(fpath, 'prelude.slisp'));
};



const prePublish_alterPathAndType = to => from => compl(
  util.replace('.sibilant')('.js'),
  util.replace('.slisp')('.js'),
  util.replace(from)(to)
);

const prePublish_run = (srcPath, outPath) => file => {
  return compl(
    Async.of,
    Async.map(util.over('code')(transpile)),
    Async.map(util.over('path')(prePublish_alterPathAndType(outPath)(srcPath))),
    Async.chain(util.writeFile),
    Async.map(() => 'Installed Prelude')
  )(file);
};



const prePublish = () => {
  return prePublish_findPreludeFile(PREPUBLISH_IN).
    then(prePublish_run(PREPUBLISH_IN, PREPUBLISH_OUT));
};



module.exports = {
  prePublish: prePublish
};