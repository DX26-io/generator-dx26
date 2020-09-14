const JAVA = 'java';
const KOTLIN = 'kotlin';

const MAVEN = 'maven';
const GRADLE = 'gradle';

const Constants = {
    languagesSupported: [
        {
            value: KOTLIN,
            name: `${KOTLIN} (beta)`,
        },
        // {
        //     value: JAVA,
        //     name: `${JAVA} (inactive)`,
        // },
    ],
    buildToolsSupported: [
        {
            value: GRADLE,
            name: `${GRADLE} (beta)`,
        },
        // {
        //     value: MAVEN,
        //     name: `${MAVEN} (inactive)`,
        // },
    ],
    javaVersionsSupported: [
        {
            value: '11',
            name: '11',
        },
    ],
    kotlin: KOTLIN,
    java: JAVA,
    maven: MAVEN,
    gradle: GRADLE,
    template: 'TEMPLATE',
    move: 'MOVE',
    thankForAnalyticDataCollection: 'Thank you so much for helping us improve the product!',
    defaultHelloText: 'Welcome to DX26 Application Scaffolding!',
    commonProperties: {
        allowAnonymousDataCollection: 'allowAnonymousDataCollection',
        preferredLanguage: 'preferredLanguage',
        appName: 'appName',
        basePackageName: 'basePackageName',
        buildTool: 'buildTool',
        javaVersion: 'javaVersion',
        runBuild: 'runBuild',
    },
    propertyDefaults: {
        allowAnonymousDataCollection: false,
        preferredLanguage: KOTLIN,
        basePackageName: 'io.dx26.platform.data',
        buildTool: 'gradle',
        javaVersion: '11',
        runBuild: false,
    },
};

module.exports = Constants;
