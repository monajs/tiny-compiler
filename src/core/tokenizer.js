/**
 * 分词器
 * @param code
 * @returns {Array}
 */

function tokenizer (code) {
	let current = 0
	let tokens = []

	while (current < code.length) {
		let char = code[current]

		// 识别'('
		if (char === '(') {
			tokens.push({
				type: 'paren',
				value: '('
			})
			current++
			continue
		}

		// 识别')'
		if (char === ')') {
			tokens.push({
				type: 'paren',
				value: ')'
			})
			current++
			continue
		}

		// 识别数字
		let numberReg = /[0-9]/
		if (numberReg.test(char)) {
			let value = ''
			while (numberReg.test(char)) {
				value += char
				current++
				char = code[current]
			}
			tokens.push({
				type: 'number',
				value
			})
			continue
		}

		// 识别变量
		let nameReg = /[a-z]/i
		if (nameReg.test(char)) {
			let value = ''
			while (nameReg.test(char)) {
				value += char
				current++
				char = code[current]
			}
			tokens.push({
				type: 'name',
				value
			})
			continue
		}

		// 识别字符串
		if (char === '"') {
			let value = ''
			current++
			char = code[current]
			while (char !== '"') {
				value += char
				current++
				char = code[current]
			}
			tokens.push({
				type: 'string',
				value
			})
			current++
			continue
		}

		// 过滤空格
		if (/\s/.test(char)) {
			current++
			continue
		}

		throw new TypeError(`未识别的标识符：${char}`)
	}
	return tokens
}

module.exports = tokenizer