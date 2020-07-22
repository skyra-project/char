import { highSurrogates } from 'lib/HighSurrogatesData';
import { lowSurrogates } from 'lib/LowSurrogatesData';
import { nonSurrogates } from 'lib/NonSurrogatesData';
import { fromCode, isSurrogate } from '../src';

describe('isSurrogate', () => {
	for (const code of lowSurrogates) {
		test(`GIVEN "${fromCode(code)}" THEN shows true`, () => {
			expect(isSurrogate(code)).toBe(true);
		});
	}

	for (const code of highSurrogates) {
		test(`GIVEN "${fromCode(code)}" THEN shows true`, () => {
			expect(isSurrogate(code)).toBe(true);
		});
	}

	for (const code of nonSurrogates) {
		test(`GIVEN "${fromCode(code)}" THEN shows false`, () => {
			expect(isSurrogate(code)).toBe(false);
		});
	}
});
