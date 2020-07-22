import { fromCode, isLetter, UnicodeCategory } from '../src';
import { getTestChars, getTestCharsNotInCategory } from './lib/common';

describe('isLetter', () => {
	const categories = [
		UnicodeCategory.UppercaseLetter,
		UnicodeCategory.LowercaseLetter,
		UnicodeCategory.TitlecaseLetter,
		UnicodeCategory.ModifierLetter,
		UnicodeCategory.OtherLetter
	];

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
