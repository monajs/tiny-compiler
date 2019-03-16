const { tokenizer, parser, traverser, transformer, compiler } = require('../src/index')

const code =
	`"fds " (aa (bb "name" 1)  2 "age" 3) 123`

// const tokens = tokenizer(code)
//
// const ast = parser(tokens)

// traverser(ast, {
// 	CallExpression: {
// 		enter (node, parent) {
// 			console.log(node)
// 			console.log(parent)
// 		},
// 		exit (node, parent) {
// 			// ...
// 		}
// 	}
// })

// const newAst = transformer(ast)
// console.log(newAst)

const output = compiler(code)
console.log(output)