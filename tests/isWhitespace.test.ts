// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Runtime/tests/System/CharTests.cs

import { isWhiteSpace, UnicodeCategory } from '../src';
import { display, getTestChars, getTestCharsNotInCategory } from './lib/common';

describe('isWhiteSpace', () => {
	const categories = [UnicodeCategory.SpaceSeparator, UnicodeCategory.LineSeparator, UnicodeCategory.ParagraphSeparator];

	for (const code of getTestChars(...categories)) {
		test(`GIVEN ${display(code)} THEN shows true`, () => {
			expect(isWhiteSpace(code)).toBe(true);
		});
	}

	for (const code of getTestCharsNotInCategory(...categories)) {
		// Need to special case some control chars that are treated as whitespace
		if ((code >= 0x0009 && code <= 0x000d) || code === 0x0085) continue;

		test(`GIVEN ${display(code)} THEN shows false`, () => {
			expect(isWhiteSpace(code)).toBe(false);
		});
	}
});
