import { highSurrogates } from './lib/HighSurrogatesData';
import { lowSurrogates } from './lib/LowSurrogatesData';
import { nonSurrogates } from './lib/NonSurrogatesData';
import { fromCode, isLowSurrogate } from '../src';

describe('isLowSurrogate', () => {
	for (const code of lowSurrogates) {
		test(`GIVEN "${fromCode(code)}" THEN shows true`, () => {
			expect(isLowSurrogate(code)).toBe(true);
		});
	}

	for (const code of highSurrogates) {
		test(`GIVEN "${fromCode(code)}" THEN shows false`, () => {
			expect(isLowSurrogate(code)).toBe(false);
		});
	}

	for (const code of nonSurrogates) {
		test(`GIVEN "${fromCode(code)}" THEN shows false`, () => {
			expect(isLowSurrogate(code)).toBe(false);
		});
	}
});
