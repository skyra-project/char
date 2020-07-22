import { fromCode } from '../src';

describe('fromCode', () => {
	test('GIVEN 97 THEN shows "a"', () => {
		expect(fromCode(97)).toBe('a');
	});

	test('GIVEN 128175 THEN shows "💯"', () => {
		expect(fromCode(128175)).toBe('💯');
	});
});
