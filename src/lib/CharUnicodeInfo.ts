// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Private.CoreLib/src/System/Globalization/CharUnicodeInfo.cs

import { categoriesValues } from './CharUnicodeInfo/CategoriesValues';
import { categoryCasingLevel1Index } from './CharUnicodeInfo/CategoryCasingDataLevel1';
import { categoryCasingLevel2Index } from './CharUnicodeInfo/CategoryCasingDataLevel2';
import { categoryCasingLevel3Index } from './CharUnicodeInfo/CategoryCasingDataLevel3';
import { numericGraphemeLevel1Index } from './CharUnicodeInfo/NumericGrapheneDataLevel1';
import { numericGraphemeLevel2Index } from './CharUnicodeInfo/NumericGrapheneDataLevel2';
import { numericGraphemeLevel3Index } from './CharUnicodeInfo/NumericGrapheneDataLevel3';
import { numericValues } from './CharUnicodeInfo/NumericValues';
import type { UnicodeCategory } from './UnicodeCategory';

export const kHighSurrogateStart = 0xd800;
export const kHighSurrogateEnd = 0xdbff;
export const kLowSurrogateStart = 0xdc00;
export const kLowSurrogateEnd = 0xdfff;
export const kHighSurrogateRange = 0x03ff;

export function getUnicodeCategory(code: number): UnicodeCategory {
	return getUnicodeCategoryNoBoundsChecks(code);
}

function getUnicodeCategoryNoBoundsChecks(code: number): UnicodeCategory {
	const offset = getCategoryCasingTableOffsetNoBoundsChecks(code);

	// Each entry of the 'CategoriesValues' table uses the low 5 bits to store the UnicodeCategory information.
	return categoriesValues[offset] & 0x1f;
}

/**
 * Retrieves the offset into the "CategoryCasing" arrays where this code point's
 * information is stored. Used for getting the Unicode category, bidi information,
 * and whitespace information.
 */
function getCategoryCasingTableOffsetNoBoundsChecks(code: number): number {
	// Get the level index item from the high 11 bits of the code point.
	let index = categoryCasingLevel1Index[code >> 9] as number;

	// Get the level 2 WORD offset from the next 5 bits of the code point.
	// This provides the base offset of the level 3 table.
	// Note that & has lower precedence than +, so remember the parens.
	index = categoryCasingLevel2Index[(index << 6) + ((code >> 3) & 0b0011_1110)];

	// Get the result from the low 4 bits of the code point.
	// This is the offset into the values table where the data is stored.
	return categoryCasingLevel3Index[(index << 4) + (code & 0x0f)];
}

/**
 * Data derived from https://unicode.org/reports/tr44/#White_Space. Represents whether a code point
 * is listed as White_Space per PropList.txt.
 */
export function getIsWhiteSpace(code: number): boolean {
	const offset = getCategoryCasingTableOffsetNoBoundsChecks(code);

	// High bit of each value in the 'CategoriesValues' array denotes whether this code point is white space.
	return categoriesValues[offset] < 0;
}

/**
 * Data derived from https://www.unicode.org/reports/tr44/#UnicodeData.txt. If Numeric_Type=Decimal
 * or Numeric_Type=Digit or Numeric_Type=Numeric, then retrieves the Numeric_Value for this code point.
 * Otherwise returns -1. This data is encoded in field 8 of UnicodeData.txt.
 */
export function getNumericValue(code: number): number {
	return getNumericValueNoBoundsCheck(code);
}

function getNumericValueNoBoundsCheck(code: number): number {
	const offset = getNumericGraphemeTableOffsetNoBoundsChecks(code);
	return numericValues[offset * 8];
}

function getNumericGraphemeTableOffsetNoBoundsChecks(code: number): number {
	// Get the level index item from the high 11 bits of the code point.
	let index = numericGraphemeLevel1Index[code >> 9] as number;

	// Get the level 2 WORD offset from the next 5 bits of the code point.
	// This provides the base offset of the level 3 table.
	// Note that & has lower precedence than +, so remember the parens.
	index = numericGraphemeLevel2Index[(index << 6) + ((code >> 3) & 0b0011_1110)];

	// Get the result from the low 4 bits of the code point.
	// This is the offset into the values table where the data is stored.
	return numericGraphemeLevel3Index[(index << 4) + (code & 0x0f)];
}
