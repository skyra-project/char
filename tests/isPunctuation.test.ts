// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Runtime/tests/System/CharTests.cs

import { isPunctuation, UnicodeCategory } from '../src';
import { display, getTestChars, getTestCharsNotInCategory } from './lib/common';

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
		test(`GIVEN ${display(code)} THEN shows true`, () => {
			expect(isPunctuation(code)).toBe(true);
		});
	}

	for (const code of getTestCharsNotInCategory(...categories)) {
		test(`GIVEN ${display(code)} THEN shows false`, () => {
			expect(isPunctuation(code)).toBe(false);
		});
	}
});
