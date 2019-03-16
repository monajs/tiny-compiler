/**
 * 编译器
 * @returns {*}
 */

const tokenizer = require('./tokenizer')
const parser = require('./parser')
const transformer = require('./transformer')
const codeGenerator = require('./codeGenerator')

function compiler (input) {
	let tokens = tokenizer(input)
	let ast = parser(tokens)
	let newAst = transformer(ast)

	return codeGenerator(newAst)
}

module.exports = compiler