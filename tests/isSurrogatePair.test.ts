// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Runtime/tests/System/CharTests.cs

import { isSurrogatePair } from '../src';
import { display } from './lib/common';
import { highSurrogates } from './lib/HighSurrogatesData';
import { lowSurrogates } from './lib/LowSurrogatesData';
import { nonSurrogates } from './lib/NonSurrogatesData';

describe('isSurrogatePair', () => {
	for (const hs of highSurrogates) {
		for (const ls of lowSurrogates) {
			test(`GIVEN ${display(hs)} and ${display(ls)} THEN shows true`, () => {
				expect(isSurrogatePair(hs, ls)).toBe(true);
			});
		}
	}

	for (const hs of nonSurrogates) {
		for (const ls of lowSurrogates) {
			test(`GIVEN ${display(hs)} and ${display(ls)} THEN shows false`, () => {
				expect(isSurrogatePair(hs, ls)).toBe(false);
			});
		}
	}

	for (const hs of highSurrogates) {
		for (const ls of nonSurrogates) {
			test(`GIVEN ${display(hs)} and ${display(ls)} THEN shows false`, () => {
				expect(isSurrogatePair(hs, ls)).toBe(false);
			});
		}
	}
});
