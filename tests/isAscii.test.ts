import { getCode, isAscii } from '../src';

describe('isAscii', () => {
	test('GIVEN "a" THEN shows true', () => {
		expect(isAscii(getCode('a'))).toBe(true);
	});

	test('GIVEN "💯" THEN shows false', () => {
		expect(isAscii(getCode('💯'))).toBe(false);
	});
});
