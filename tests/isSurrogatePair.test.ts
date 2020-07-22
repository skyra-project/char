import { highSurrogates } from './lib/HighSurrogatesData';
import { lowSurrogates } from './lib/LowSurrogatesData';
import { nonSurrogates } from './lib/NonSurrogatesData';
import { fromCode, isSurrogatePair } from '../src';

describe('isSurrogatePair', () => {
	for (const highSurrogateCode of highSurrogates) {
		for (const lowSurrogateCode of lowSurrogates) {
			test(`GIVEN "${fromCode(highSurrogateCode)}" and ${fromCode(lowSurrogateCode)} THEN shows true`, () => {
				expect(isSurrogatePair(highSurrogateCode, lowSurrogateCode)).toBe(true);
			});
		}
	}

	for (const nonSurrogateCode of nonSurrogates) {
		for (const lowSurrogateCode of lowSurrogates) {
			test(`GIVEN "${fromCode(nonSurrogateCode)}" and ${fromCode(lowSurrogateCode)} THEN shows false`, () => {
				expect(isSurrogatePair(nonSurrogateCode, lowSurrogateCode)).toBe(false);
			});
		}
	}

	for (const highSurrogateCode of highSurrogates) {
		for (const nonSurrogateCode of nonSurrogates) {
			test(`GIVEN "${fromCode(highSurrogateCode)}" and ${fromCode(nonSurrogateCode)} THEN shows false`, () => {
				expect(isSurrogatePair(highSurrogateCode, nonSurrogateCode)).toBe(false);
			});
		}
	}
});
