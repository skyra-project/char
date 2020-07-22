import { fromCode, isLetterOrDigit, UnicodeCategory } from '../src';
import { getTestChars, getTestCharsNotInCategory } from './lib/common';

describe('isLetterOrDigit', () => {
	const categories = [
		UnicodeCategory.UppercaseLetter,
		UnicodeCategory.LowercaseLetter,
		UnicodeCategory.TitlecaseLetter,
		UnicodeCategory.ModifierLetter,
		UnicodeCategory.OtherLetter,
		UnicodeCategory.DecimalDigitNumber
	];

	for (const code of getTestChars(...categories)) {
		test(`GIVEN "${fromCode(code)}" THEN shows true`, () => {
			expect(isLetterOrDigit(code)).toBe(true);
		});
	}

	for (const code of getTestCharsNotInCategory(...categories)) {
		test(`GIVEN "${fromCode(code)}" THEN shows false`, () => {
			expect(isLetterOrDigit(code)).toBe(false);
		});
	}
});
