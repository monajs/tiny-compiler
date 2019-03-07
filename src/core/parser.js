/**
 * 语法解析器
 * @param tokens
 * @returns {{}}
 */

const { Program, NumberLiteral, StringLiteral, CallExpression } = require('./constant')

function parser (tokens) {
	let current = 0

	function walk () {
		let token = tokens[current]

		if (token.type === 'number') {
			current++
			return {
				type: NumberLiteral,
				value: token.value
			}
		}

		if (token.type === 'string') {
			current++
			return {
				type: StringLiteral,
				value: token.value
			}
		}

		if (token.type === 'paren' && token.value === '(') {
			current++
			token = tokens[current]
			let node = {
				type: CallExpression,
				value: token.value,
				params: []
			}
			current++
			token = tokens[current]
			while (!(token.type === 'paren' && token.value === ')')) {
				node.params.push(walk())
				token = tokens[current]
			}

			current++
			return node
		}
	}

	let ast = {
		type: Program,
		body: []
	}

	while (current < tokens.length) {
		ast.body.push(walk())
	}
	return ast
}

module.exports = parser