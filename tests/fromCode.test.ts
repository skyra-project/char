import { fromCode } from '../src';

describe('fromCode', () => {
	test.each([
		[97, 'a'],
		[128175, '💯']
	])('GIVEN "%i" THEN shows "%s"', (given, expected) => {
		expect(fromCode(given)).toBe(expected);
	});
});
