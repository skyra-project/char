import { fromCode, getCode, isAscii } from '../src';

describe('getCode', () => {
	test('GIVEN "a" THEN shows 97', () => {
		expect(getCode('a')).toBe(97);
	});

	test('GIVEN "💯" THEN shows 128175', () => {
		expect(getCode('💯')).toBe(128175);
	});
});

describe('fromCodeCode', () => {
	test('GIVEN 97 THEN shows "a"', () => {
		expect(fromCode(97)).toBe('a');
	});

	test('GIVEN 128175 THEN shows "💯"', () => {
		expect(fromCode(128175)).toBe('💯');
	});
});

describe('isAscii', () => {
	test('GIVEN "a" THEN shows true', () => {
		expect(isAscii(getCode('a'))).toBe(true);
	});

	test('GIVEN "💯" THEN shows false', () => {
		expect(isAscii(getCode('💯'))).toBe(false);
	});
});
