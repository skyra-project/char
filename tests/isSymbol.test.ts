import { fromCode, isSymbol, UnicodeCategory } from '../src';
import { getTestChars, getTestCharsNotInCategory } from './lib/common';

describe('isSymbol', () => {
	const categories = [UnicodeCategory.MathSymbol, UnicodeCategory.ModifierSymbol, UnicodeCategory.CurrencySymbol, UnicodeCategory.OtherSymbol];

	for (const code of getTestChars(...categories)) {
		test(`GIVEN "${fromCode(code)}" THEN shows true`, () => {
			expect(isSymbol(code)).toBe(true);
		});
	}

	for (const code of getTestCharsNotInCategory(...categories)) {
		test(`GIVEN "${fromCode(code)}" THEN shows false`, () => {
			expect(isSymbol(code)).toBe(false);
		});
	}
});
