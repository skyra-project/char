import { UnicodeCategory } from './UnicodeCategory';
/**
 * Returns the code point of a character.
 * @see fromCode
 * @since 1.0.0
 * @example
 * ```typescript
 * getCode('a'); // -> 97
 * fromCode(97); // -> 'a'
 * ```
 *
 * @example
 * ```typescript
 * getCode('💯'); // -> 128175
 * fromCode(128175); // -> '💯'
 * ```
 */
export declare function getCode(char: string): number;
/**
 * Returns the character from a code point.
 * @see getCode
 * @since 1.0.0
 * @example
 * ```typescript
 * fromCode(97); // -> 'a'
 * getCode('a'); // -> 97
 * ```
 *
 * @example
 * ```typescript
 * fromCode(128175); // -> '💯'
 * getCode('💯'); // -> 128175
 * ```
 */
export declare function fromCode(code: number): string;
/**
 * Return true for all characters below or equal U+00ff, which is ASCII + Latin-1 Supplement.
 * @param code The code point.
 * @since 1.0.0
 * @example
 * ```typescript
 * isLatin('a'); // true
 * isLatin('💯'); // false
 * ```
 */
export declare function isLatin1(code: number): boolean;
/**
 * Return true for all characters below or equal U+007f, which is ASCII.
 * @param code The code point.
 * @since 1.0.0
 */
export declare function isAscii(code: number): boolean;
/**
 * Determines whether a character is a digit.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isDigit(code: number): boolean;
/**
 * Determines whether a character is a letter.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isLetter(code: number): boolean;
/**
 * Determines whether a character is whitespace.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isWhiteSpace(code: number): boolean;
/**
 * Determines whether a character is upper-case.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isUpper(code: number): boolean;
/**
 * Determines whether a character is lower-case.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isLower(code: number): boolean;
/**
 * Determines whether a character is a number.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isNumber(code: number): boolean;
/**
 * Determines whether a character is a punctuation mark.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isPunctuation(code: number): boolean;
/**
 * Determines whether a character is a letter or a digit.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isLetterOrDigit(code: number): boolean;
/**
 * Determines whether a character is a control character.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isControl(code: number): boolean;
/**
 * Determines whether a character is a separator.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isSeparator(code: number): boolean;
/**
 * Determines whether a character is a surrogate.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isSurrogate(code: number): boolean;
/**
 * Determines whether a character is a symbol.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isSymbol(code: number): boolean;
/**
 * Get the category of a character.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function getUnicodeCategory(code: number): UnicodeCategory;
/**
 * Gets the numeric value of a character.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function getNumericValue(code: number): number;
/**
 * Determines whether a character is a high surrogate.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isHighSurrogate(code: number): boolean;
/**
 * Determines whether a character is a low surrogate.
 * @since 1.0.0
 * @param code The code point.
 */
export declare function isLowSurrogate(code: number): boolean;
/**
 * Determines whether two characters make a surrogate pair.
 * @since 1.0.0
 * @param highSurrogate The code point for the high surrogate character.
 * @param lowSurrogate The code point for the low surrogate character.
 */
export declare function isSurrogatePair(highSurrogate: number, lowSurrogate: number): boolean;
//# sourceMappingURL=Char.d.ts.map