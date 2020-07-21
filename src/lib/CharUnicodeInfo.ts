// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Private.CoreLib/src/System/Globalization/CharUnicodeInfo.cs

import {
	categoriesValues,
	categoryCasingLevel2Index,
	numericGraphemeLevel1Index,
	numericGraphemeLevel2Index,
	numericGraphemeLevel3Index,
	numericValues
} from './CharUnicodeInfoData';
import type { UnicodeCategory } from './UnicodeCategory';

export const HIGH_SURROGATE_START = 0xD800;
export const HIGH_SURROGATE_END = 0xDBFF;
export const LOW_SURROGATE_START = 0xDC00;
export const LOW_SURROGATE_END = 0xDFFF;
export const HIGH_SURROGATE_RANGE = 0x03FF;

export const UNICODE_CATEGORY_OFFSET = 0;
export const BIDI_CATEGORY_OFFSET = 1;

// The starting codepoint for Unicode plane 1.  Plane 1 contains 0x010000 ~ 0x01ffff.
export const UNICODE_PLANE01_START = 0x10000;

export function getUnicodeCategory(code: number): UnicodeCategory {
	return getUnicodeCategoryNoBoundsChecks(code);
}

function getUnicodeCategoryNoBoundsChecks(code: number): UnicodeCategory {
	const offset = getCategoryCasingTableOffsetNoBoundsChecks(code);

	// Each entry of the 'CategoriesValues' table uses the low 5 bits to store the UnicodeCategory information.
	return categoriesValues[offset] & 0x1F;
}

/**
 * Retrieves the offset into the "CategoryCasing" arrays where this code point's
 * information is stored. Used for getting the Unicode category, bidi information,
 * and whitespace information.
 */
function getCategoryCasingTableOffsetNoBoundsChecks(code: number): number {
	// Get the level index item from the high 11 bits of the code point.
	let index = categoryCasingLevel2Index[code >> 9] as number;

	// Get the level 2 WORD offset from the next 5 bits of the code point.
	// This provides the base offset of the level 3 table.
	// Note that & has lower precedence than +, so remember the parens.
	index = categoryCasingLevel2Index[(index << 6) + ((code >> 3) & 0b0011_1110)];

	// Get the result from the low 4 bits of the code point.
	// This is the offset into the values table where the data is stored.
	return categoryCasingLevel2Index[(index << 4) + (code & 0x0F)];
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
	return numericGraphemeLevel3Index[(index << 4) + (code & 0x0F)];
}
