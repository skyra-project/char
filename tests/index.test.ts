import { isAscii } from '../src';

describe('Tests', () => {
	test('should pass', () => {
		expect(isAscii('a'.charCodeAt(0))).toBe(true);
	});
});
