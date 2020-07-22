import { getCode } from '../src';

describe('getCode', () => {
	test('GIVEN "a" THEN shows 97', () => {
		expect(getCode('a')).toBe(97);
	});

	test('GIVEN "💯" THEN shows 128175', () => {
		expect(getCode('💯')).toBe(128175);
	});
});
