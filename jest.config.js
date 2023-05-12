module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
}
