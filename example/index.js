const { tokenizer, parser } = require('../src/index')

const code =
	`"fds " (aa (bb "name" 1)  2 "age" 3) 123`

const tokens = tokenizer(code)

const ast = parser(tokens)

console.log(ast)