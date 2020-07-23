// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Runtime/tests/System/CharTests.cs

import { isLowSurrogate } from '../src';
import { display } from './lib/common';
import { highSurrogates } from './lib/HighSurrogatesData';
import { lowSurrogates } from './lib/LowSurrogatesData';
import { nonSurrogates } from './lib/NonSurrogatesData';

describe('isLowSurrogate', () => {
	for (const code of lowSurrogates) {
		test(`GIVEN ${display(code)} THEN shows true`, () => {
			expect(isLowSurrogate(code)).toBe(true);
		});
	}

	for (const code of highSurrogates) {
		test(`GIVEN ${display(code)} THEN shows false`, () => {
			expect(isLowSurrogate(code)).toBe(false);
		});
	}

	for (const code of nonSurrogates) {
		test(`GIVEN ${display(code)} THEN shows false`, () => {
			expect(isLowSurrogate(code)).toBe(false);
		});
	}
});
