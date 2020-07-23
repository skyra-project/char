// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Runtime/tests/System/CharTests.cs

import { isUpper, UnicodeCategory } from '../src';
import { display, getTestChars, getTestCharsNotInCategory } from './lib/common';

describe('isUpper', () => {
	const categories = [UnicodeCategory.UppercaseLetter];

	for (const code of getTestChars(...categories)) {
		test(`GIVEN ${display(code)} THEN shows true`, () => {
			expect(isUpper(code)).toBe(true);
		});
	}

	for (const code of getTestCharsNotInCategory(...categories)) {
		test(`GIVEN ${display(code)} THEN shows false`, () => {
			expect(isUpper(code)).toBe(false);
		});
	}
});
