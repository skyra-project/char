import { fromCode, isPunctuation, UnicodeCategory } from '../src';
import { getTestChars, getTestCharsNotInCategory } from './lib/common';

describe('isPunctuation', () => {
	const categories = [
		UnicodeCategory.ConnectorPunctuation,
		UnicodeCategory.DashPunctuation,
		UnicodeCategory.OpenPunctuation,
		UnicodeCategory.ClosePunctuation,
		UnicodeCategory.InitialQuotePunctuation,
		UnicodeCategory.FinalQuotePunctuation,
		UnicodeCategory.OtherPunctuation
	];

	for (const code of getTestChars(...categories)) {
		test(`GIVEN "${fromCode(code)}" THEN shows true`, () => {
			expect(isPunctuation(code)).toBe(true);
		});
	}

	for (const code of getTestCharsNotInCategory(...categories)) {
		test(`GIVEN "${fromCode(code)}" THEN shows false`, () => {
			expect(isPunctuation(code)).toBe(false);
		});
	}
});
