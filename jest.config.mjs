/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	coverageProvider: 'v8',
	displayName: 'unit test',
	preset: 'ts-jest',
	testMatch: ['<rootDir>/tests/**/*.test.ts'],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tests/tsconfig.json'
		}
	},
	reporters: ['default', 'github-actions']
};

export default config;
