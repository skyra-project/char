// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Private.CoreLib/src/System/Char.cs

import * as CharUnicodeInfo from './CharUnicodeInfo';
import { UnicodeCategory } from './UnicodeCategory';

// The maximum character value.
export const kMaxValue = 0xffff;
// The minimum character value.
export const kMinValue = 0x00;

const kIsWhiteSpaceFlag = 0x80;
const kIsUpperCaseLetterFlag = 0x40;
const kIsLowerCaseLetterFlag = 0x20;
const kUnicodeCategoryMask = 0x1f;

// Contains information about the C0, Basic Latin, C1, and Latin-1 Supplement ranges [ U+0000..U+00FF ], with:
// - 0x80 bit if set means 'is whitespace'
// - 0x40 bit if set means 'is uppercase letter'
// - 0x20 bit if set means 'is lowercase letter'
// - bottom 5 bits are the UnicodeCategory of the character
//
// n.b. This data is locked to an earlier version of the Unicode standard (2.0, perhaps?), so
// the UnicodeCategory data contained here doesn't necessarily reflect the UnicodeCategory data
// contained within the CharUnicodeInfo or Rune types, which generally follow the latest Unicode
// standard.
// prettier-ignore
const kLatin1CharInfo = [
	0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x8e, 0x8e, 0x8e, 0x8e, 0x8e, 0x0e, 0x0e, // U+0000..U+000F
	0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, // U+0010..U+001F
	0x8b, 0x18, 0x18, 0x18, 0x1a, 0x18, 0x18, 0x18, 0x14, 0x15, 0x18, 0x19, 0x18, 0x13, 0x18, 0x18, // U+0020..U+002F
	0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x18, 0x18, 0x19, 0x19, 0x19, 0x18, // U+0030..U+003F
	0x18, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, // U+0040..U+004F
	0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x14, 0x18, 0x15, 0x1b, 0x12, // U+0050..U+005F
	0x1b, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, // U+0060..U+006F
	0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x14, 0x19, 0x15, 0x19, 0x0e, // U+0070..U+007F
	0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x8e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, // U+0080..U+008F
	0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, 0x0e, // U+0090..U+009F
	0x8b, 0x18, 0x1a, 0x1a, 0x1a, 0x1a, 0x1c, 0x1c, 0x1b, 0x1c, 0x21, 0x16, 0x19, 0x13, 0x1c, 0x1b, // U+00A0..U+00AF
	0x1c, 0x19, 0x0a, 0x0a, 0x1b, 0x21, 0x1c, 0x18, 0x1b, 0x0a, 0x21, 0x17, 0x0a, 0x0a, 0x0a, 0x18, // U+00B0..U+00BF
	0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, // U+00C0..U+00CF
	0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x19, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x21, // U+00D0..U+00DF
	0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, // U+00E0..U+00EF
	0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x19, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21, 0x21 // U+00F0..U+00FF
] as const;

// Return true for all characters below or equal U+00ff, which is ASCII + Latin-1 Supplement.
export function isLatin1(code: number) {
	return code < kLatin1CharInfo.length;
}

// Return true for all characters below or equal U+007f, which is ASCII.
export function isAscii(code: number) {
	return code <= 0x007f;
}

// Return the Unicode category for Unicode character <= 0x00ff.
export function getLatin1UnicodeCategory(code: number): UnicodeCategory {
	return kLatin1CharInfo[code] & kUnicodeCategoryMask;
}

/** Returns a boolean indicating whether character c is considered to be a digit. */
const asciiZeroCode = '0'.charCodeAt(0);
const asciiNineCode = '9'.charCodeAt(0);
export function isDigit(code: number) {
	if (isLatin1(code)) {
		return isInRange(code, asciiZeroCode, asciiNineCode);
	}
}

export function isInRange(code: number, minimum: number, maximum: number) {
	return code - minimum <= maximum - minimum;
}

function checkLetter(category: UnicodeCategory) {
	return isInRange(category, UnicodeCategory.UppercaseLetter, UnicodeCategory.OtherLetter);
}

/** Determines whether a character is a letter. */
export function isLetter(code: number) {
	if (isLatin1(code)) {
		// For the version of the Unicode standard the Char type is locked to, the
		// Latin-1 range doesn't include letters in categories other than "upper" and "lower".
		return (kLatin1CharInfo[code] & (kIsUpperCaseLetterFlag | kIsLowerCaseLetterFlag)) !== 0;
	}

	return checkLetter(CharUnicodeInfo.getUnicodeCategory(code));
}

function isWhiteSpaceLatin1(code: number) {
	return (kLatin1CharInfo[code] & kIsWhiteSpaceFlag) !== 0;
}

/** Determines whether a character is whitespace. */
export function isWhiteSpace(code: number) {
	if (isLatin1(code)) {
		return isWhiteSpaceLatin1(code);
	}

	return CharUnicodeInfo.getIsWhiteSpace(code);
}

/** Determines whether a character is upper-case. */
export function isUpper(code: number) {
	if (isLatin1(code)) {
		return (kLatin1CharInfo[code] & kIsUpperCaseLetterFlag) !== 0;
	}

	return CharUnicodeInfo.getUnicodeCategory(code) === UnicodeCategory.UppercaseLetter;
}

/** Determines whether a character is lower-case. */
export function isLower(code: number) {
	if (isLatin1(code)) {
		return (kLatin1CharInfo[code] & kIsLowerCaseLetterFlag) !== 0;
	}
	return CharUnicodeInfo.getUnicodeCategory(code) === UnicodeCategory.LowercaseLetter;
}

function checkPunctuation(category: UnicodeCategory) {
	return isInRange(category, UnicodeCategory.ConnectorPunctuation, UnicodeCategory.OtherPunctuation);
}

/** Determines whether a character is a punctuation mark.  */
export function isPunctuation(code: number) {
	if (isLatin1(code)) {
		return checkPunctuation(getLatin1UnicodeCategory(code));
	}

	return checkPunctuation(CharUnicodeInfo.getUnicodeCategory(code));
}

function checkLetterOrDigit(category: UnicodeCategory) {
	return checkLetter(category) || category === UnicodeCategory.DecimalDigitNumber;
}

/** Determines whether a character is a letter or a digit. */
export function isLetterOrDigit(code: number) {
	if (isLatin1(code)) {
		return checkLetterOrDigit(getLatin1UnicodeCategory(code));
	}

	return checkLetterOrDigit(CharUnicodeInfo.getUnicodeCategory(code));
}

export function isControl(code: number) {
	// This works because 'code' can never be -1.
	return ((code + 1) & ~0x0080) <= 0x0020;
}

function checkSeparator(category: UnicodeCategory) {
	return isInRange(category, UnicodeCategory.SpaceSeparator, UnicodeCategory.ParagraphSeparator);
}

function isSeparatorLatin1(code: number) {
	// U+00a0 = NO-BREAK SPACE
	// There is no LineSeparator or ParagraphSeparator in Latin 1 range.
	return code === 0x0020 || code === 0x00a0;
}

export function isSeparator(code: number) {
	if (isLatin1(code)) {
		return isSeparatorLatin1(code);
	}

	return checkSeparator(CharUnicodeInfo.getUnicodeCategory(code));
}

export function isSurrogate(code: number) {
	return isInRange(code, CharUnicodeInfo.kHighSurrogateStart, CharUnicodeInfo.kLowSurrogateEnd);
}

function checkSymbol(category: UnicodeCategory) {
	return isInRange(category, UnicodeCategory.MathSymbol, UnicodeCategory.OtherSymbol);
}

export function isSymbol(code: number) {
	if (isLatin1(code)) {
		return checkSymbol(getLatin1UnicodeCategory(code));
	}

	return checkSymbol(CharUnicodeInfo.getUnicodeCategory(code));
}

export function getUnicodeCategory(code: number) {
	if (isLatin1(code)) {
		return getLatin1UnicodeCategory(code);
	}

	return CharUnicodeInfo.getUnicodeCategory(code);
}

export function getNumericValue(code: number) {
	return CharUnicodeInfo.getNumericValue(code);
}

/** Check if a char is a high surrogate. */
export function isHighSurrogate(code: number) {
	return isInRange(code, CharUnicodeInfo.kHighSurrogateStart, CharUnicodeInfo.kHighSurrogateEnd);
}

/** Check if a char is a low surrogate. */
export function isLowSurrogate(code: number) {
	return isInRange(code, CharUnicodeInfo.kLowSurrogateStart, CharUnicodeInfo.kLowSurrogateEnd);
}

export function isSurrogatePair(highSurrogate: number, lowSurrogate: number) {
	// Since both the high and low surrogate ranges are exactly 0x400 elements
	// wide, and since this is a power of two, we can perform a single comparison
	// by baselining each value to the start of its respective range and taking
	// the logical OR of them.

	const highSurrogateOffset = highSurrogate - CharUnicodeInfo.kHighSurrogateStart;
	const lowSurrogateOffset = lowSurrogate - CharUnicodeInfo.kLowSurrogateStart;
	return (highSurrogateOffset | lowSurrogateOffset) <= CharUnicodeInfo.kHighSurrogateRange;
}
