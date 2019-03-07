'use strict';

/**
 * 分词器
 * @param code
 * @returns {Array}
 */

function tokenizer(code) {
	var current = 0;
	var tokens = [];

	while (current < code.length) {
		var char = code[current];

		// 识别'('
		if (char === '(') {
			tokens.push({
				type: 'paren',
				value: '('
			});
			current++;
			continue;
		}

		// 识别')'
		if (char === ')') {
			tokens.push({
				type: 'paren',
				value: ')'
			});
			current++;
			continue;
		}

		// 识别数字
		var numberReg = /[0-9]/;
		if (numberReg.test(char)) {
			var value = '';
			while (numberReg.test(char)) {
				value += char;
				current++;
				char = code[current];
			}
			tokens.push({
				type: 'number',
				value: value
			});
			continue;
		}

		// 识别变量
		var nameReg = /[a-z]/i;
		if (nameReg.test(char)) {
			var _value = '';
			while (nameReg.test(char)) {
				_value += char;
				current++;
				char = code[current];
			}
			tokens.push({
				type: 'name',
				value: _value
			});
			continue;
		}

		// 识别字符串
		if (char === '"') {
			var _value2 = '';
			current++;
			char = code[current];
			while (char !== '"') {
				_value2 += char;
				current++;
				char = code[current];
			}
			tokens.push({
				type: 'string',
				value: _value2
			});
			current++;
			continue;
		}

		// 过滤空格
		if (/\s/.test(char)) {
			current++;
			continue;
		}

		throw new TypeError('\u672A\u8BC6\u522B\u7684\u6807\u8BC6\u7B26\uFF1A' + char);
	}
	return tokens;
}

module.exports = tokenizer;