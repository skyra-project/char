import { fromCode, isLetter, UnicodeCategory } from '../src';
import { getTestChars, getTestCharsNotInCategory } from './lib/common';

describe('isLower', () => {
	const categories = [UnicodeCategory.LowercaseLetter];

	for (const code of getTestChars(...categories)) {
		test(`GIVEN "${fromCode(code)}" THEN shows true`, () => {
			expect(isLetter(code)).toBe(true);
		});
	}

	for (const code of getTestCharsNotInCategory(...categories)) {
		test(`GIVEN "${fromCode(code)}" THEN shows false`, () => {
			expect(isLetter(code)).toBe(false);
		});
	}
});
