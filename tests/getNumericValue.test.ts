// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Runtime/tests/System/CharTests.cs

import { getCode } from '../src';
import { getNumericValue } from '../src/lib/CharUnicodeInfo';
import { display } from './lib/common';

describe('getNumericValue', () => {
	const characters = [
		{ input: getCode('0'), expected: 0 },
		{ input: getCode('9'), expected: 9 },
		{ input: getCode('T'), expected: -1 }
	];

	for (const { input, expected } of characters) {
		test(`GIVEN ${display(input)} THEN shows '${expected}'`, () => {
			expect(getNumericValue(input)).toBe(expected);
		});
	}
});
