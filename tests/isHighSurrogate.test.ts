import { highSurrogates } from 'lib/HighSurrogatesData';
import { lowSurrogates } from 'lib/LowSurrogatesData';
import { nonSurrogates } from 'lib/NonSurrogatesData';
import { fromCode, isHighSurrogate } from '../src';

describe('isHighSurrogate', () => {
	for (const code of lowSurrogates) {
		test(`GIVEN "${fromCode(code)}" THEN shows false`, () => {
			expect(isHighSurrogate(code)).toBe(false);
		});
	}

	for (const code of highSurrogates) {
		test(`GIVEN "${fromCode(code)}" THEN shows true`, () => {
			expect(isHighSurrogate(code)).toBe(true);
		});
	}

	for (const code of nonSurrogates) {
		test(`GIVEN "${fromCode(code)}" THEN shows false`, () => {
			expect(isHighSurrogate(code)).toBe(false);
		});
	}
});
