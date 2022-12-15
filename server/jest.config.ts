import path from 'path';
const rootDirector = path.resolve(__dirname);

export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageThreshold: {
        global: {
            branches: 70,
            function: 80,
            lines: 80,
            statements: 80,
        },
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            { tsconfig: path.resolve(__dirname, 'tsconfig.json') },
        ],
        '^.+\\.ts?$': [
            'ts-jest',
            { tsconfig: path.resolve(__dirname, 'tsconfig.json') },
        ],
    },
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^@/(.*)$': `${rootDirector}/src/$1`,
        '@server(.*)$': `${rootDirector}/src$1`,
        '@/api(.*)$': `${rootDirector}/src/api$1`,
        '@/utils(.*)$': `${rootDirector}/src/utils$1`,
        '@/data(.*)$': `${rootDirector}/src/data$1`,
        '@/middleware(.*)$': `${rootDirector}/src/middleware$1`,
        '@utils(.*)$': `${rootDirector}/src/utils$1`,
        '@services(.*)$': `${rootDirector}/src/services$1`,
        '@config(.*)$': `${rootDirector}/src/config$1`,
        '@tests(.*)$': `${rootDirector}/__tests__$1`,
        '@api(.*)$': `${rootDirector}/src/api$1`,
        '@middleware(.*)$': `${rootDirector}/src/middleware$1`,
    },
    reporters: [
        'default',
        [
            path.resolve(__dirname, 'node_modules', 'jest-html-reporter'),
            {
                pageTitle: 'Demo test Report',
                outputPath: 'test-report.html',
            },
        ],
    ],
    rootDir: rootDirector,
    roots: [rootDirector],
    setupFilesAfterEnv: [`${rootDirector}/__tests__/setup.ts`],
    testPathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/build',
        `${rootDirector}/__tests__/fixtures`,
        `${rootDirector}/__tests__/setup.ts`,
    ],
    testRegex: ['((/__tests__/.*)|(\\.|/)(test|spec))\\.tsx?$'],
};
