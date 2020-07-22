import { fromCode, isWhiteSpace, UnicodeCategory } from '../src';
import { getTestChars, getTestCharsNotInCategory } from './lib/common';

describe('isWhiteSpace', () => {
	const categories = [UnicodeCategory.SpaceSeparator, UnicodeCategory.LineSeparator, UnicodeCategory.ParagraphSeparator];

	for (const code of getTestChars(...categories)) {
		test(`GIVEN "${fromCode(code)}" THEN shows true`, () => {
			expect(isWhiteSpace(code)).toBe(true);
		});
	}

	for (const code of getTestCharsNotInCategory(...categories)) {
		// Need to special case some control chars that are treated as whitespace
		if ((code >= 0x0009 && code <= 0x000d) || code === 0x0085) continue;

		test(`GIVEN "${fromCode(code)}" THEN shows false`, () => {
			expect(isWhiteSpace(code)).toBe(false);
		});
	}
});
