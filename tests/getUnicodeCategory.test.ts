// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Runtime/tests/System/CharTests.cs

import { getUnicodeCategory, UnicodeCategory } from '../src';
import { display, getTestChars } from './lib/common';

describe('getUnicodeCategory', () => {
	// Iterate over all categories:
	for (let i = UnicodeCategory.UppercaseLetter; i <= UnicodeCategory.OtherNotAssigned; ++i) {
		// Iterate over all characters from the category:
		for (const code of getTestChars(i)) {
			// 0x17b4 (UnicodeCategory.Format) is read as UnicodeCategory.NonSpacingMark
			if (code === 0x17b4) continue;

			// Test if the character belongs to the category:
			test(`GIVEN ${display(code)} THEN shows '${i}'`, () => {
				expect(getUnicodeCategory(code)).toBe(i);
			});
		}
	}
});
