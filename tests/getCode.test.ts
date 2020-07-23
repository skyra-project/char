import { getCode } from '../src';

describe('getCode', () => {
	test.each([
		['a', 97],
		['💯', 128175]
	])('GIVEN "%s" THEN shows "%i"', (given, expected) => {
		expect(getCode(given)).toBe(expected);
	});
});
