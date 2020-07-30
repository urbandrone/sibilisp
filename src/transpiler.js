const sibilant = require('sibilant');
const { compl } = require('./utils/lambda');
const { COMMENT_REGEX, replace, getMacroPath } = require('./helpers');




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
