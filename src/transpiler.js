const sibilant = require('sibilant');
const { compl } = require('./utils/lambda');
const { COMMENT_REGEX, replace, getMacroPath, presolve, getCwd, pjoin } = require('./helpers');



// ------ SIBILANT FIXUPS ------
const CACHE_INCLUDES = {};
sibilant.include = (file) => {
  // This fixes sibilant's inability to include macro files that are part of an
  // NPM package from someone else. Basically, the "else" branch in the
  // second if-else is what's missing in sibilant, so sibilant only includes local
  // macro files. 
  let [rfile, ftype] = file.split('.');
  if (!ftype) {
    file = file + '.sibilant';
  }
  if (/^\.{1,2}/g.test(file)) {
    file = presolve(getCwd(), file);
  } else {
    file = presolve(pjoin(getCwd(), 'node_modules'), file)
  }
  if (CACHE_INCLUDES.hasOwnProperty(file)) {
    // we speed up compilation time by memoizing previously included file contents
    // so the compiler doesn't have to "re-include" for every use of "(include)"
    return CACHE_INCLUDES[file].c;
  }

  const c = (CACHE_INCLUDES[file] = { c: '' });
  try {
    rfile = require.resolve(file);
  } catch (error) {
    throw new Error('sibilant.include: Failed to resolve file for inclusion: ' + file);
  }
  sibilant.recordDependency(sibilant.file, file);
  return c.c = sibilant({ file: rfile }).output;
};


// ------ SOURCE MANIPULATION ------
const injectMacros = fdata => {
	return `(import-namespace sibilisp)\n(include "${getMacroPath()}")\n\n` + fdata;
};

const removeComments = replace(COMMENT_REGEX)('');



const transpile = compl(
	injectMacros,
	sibilant,
	x => x.js,
	removeComments
);




module.exports = transpile;
