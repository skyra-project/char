// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Runtime/tests/System/CharTests.cs

import { getCode, isAscii } from '../src';

describe('isAscii', () => {
	test('GIVEN "a" THEN shows true', () => {
		expect(isAscii(getCode('a'))).toBe(true);
	});

	test('GIVEN "💯" THEN shows false', () => {
		expect(isAscii(getCode('💯'))).toBe(false);
	});
});
