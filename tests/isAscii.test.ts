// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Runtime/tests/System/CharTests.cs

import { getCode, isAscii } from '../src';

describe('isAscii', () => {
	test.each([
		['a', true],
		['💯', false]
	])('GIVEN "%s" THEN shows "%p"', (given, expected) => {
		expect(isAscii(getCode(given))).toBe(expected);
	});
});
