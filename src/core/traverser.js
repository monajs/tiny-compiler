/**
 * ast 遍历器
 * @param ast
 * @param visitor
 */

const { Program, NumberLiteral, StringLiteral, CallExpression } = require('./constant')

function traverser (ast, visitor) {

	function traverseArray (array, parent) {
		array.forEach(child => {
			traverseNode(child, parent)
		})
	}

	function traverseNode (node, parent) {
		const method = visitor[node.type]

		if (method && method.enter) {
			method.enter(node, parent)
		}

		switch (node.type) {
			case Program:
				traverseArray(node.body, node)
				break

			case CallExpression:
				traverseArray(node.params, node)
				break

			case StringLiteral:
			case NumberLiteral:
				break

			default:
				throw new TypeError(node.type)
		}

		if (method && method.exit) {
			method.exit(node, parent)
		}
	}

	traverseNode(ast, null)
}

module.exports = traverser