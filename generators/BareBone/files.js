const Constants = require('../utils/constants');
const Helpers = require('../utils/helpers');

// Source Paths
const KAML = 'kotlin/application/src/main/kotlin';
const KATL = 'kotlin/application/src/test/kotlin';
const KAMRL = 'kotlin/application/src/main/resources';
const KSML = 'kotlin/service/src/main/kotlin';
const KSTL = 'kotlin/service/src/test/kotlin';
const KSMRL = 'kotlin/service/src/main/resources';
const KDMRL = 'kotlin/deployment/src/main/resources';

// Destination Paths
const DKAML = 'application/src/main/kotlin';
const DKATL = 'application/src/test/kotlin';
const DKAMRL = 'application/src/main/resources';
const DKSML = 'service/src/main/kotlin';
const DKSTL = 'service/src/test/kotlin';
const DKSMRL = 'service/src/main/resources';
const DKDMRL = 'deployment/src/main/resources';

// Commons
const GW = 'gradle/wrapper';

const FileMapper = (source, destination, appBaseImportPath, preferredLanguage) => {
    const localAppBaseImportPath = Helpers.getBasePackagePath(appBaseImportPath);

    const fileMap = {
        java: {
            git: [],
            build: {
                maven: [],
                gradle: [],
            },
            docs: [],
            code: {
                main: [],
                test: [],
            },
            resources: {
                main: [],
                test: [],
            },
        },
        kotlin: {
            git: [
                {
                    source: `${source}/kotlin/.gitignore`,
                    destination: `${destination}/.gitignore`,
                    operation: Constants.template,
                },
                {
                    source: `${source}/kotlin/application/.gitignore`,
                    destination: `${destination}/application/.gitignore`,
                    operation: Constants.template,
                },
                {
                    source: `${source}/kotlin/deployment/.gitignore`,
                    destination: `${destination}/deployment/.gitignore`,
                    operation: Constants.template,
                },
                {
                    source: `${source}/kotlin/service/.gitignore`,
                    destination: `${destination}/service/.gitignore`,
                    operation: Constants.template,
                },
            ],
            build: {
                maven: [],
                gradle: [
                    // base gradle files
                    {
                        source: `${source}/kotlin/settings.gradle.kts.ejs`,
                        destination: `${destination}/settings.gradle.kts`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/build.gradle.kts.ejs`,
                        destination: `${destination}/build.gradle.kts`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/gradlew`,
                        destination: `${destination}/gradlew`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/gradlew.bat`,
                        destination: `${destination}/gradlew.bat`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/${GW}/gradle-wrapper.jar`,
                        destination: `${destination}/${GW}/gradle-wrapper.jar`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/${GW}/gradle-wrapper.properties`,
                        destination: `${destination}/${GW}/gradle-wrapper.properties`,
                        operation: Constants.template,
                    },
                    // Application gradle files
                    {
                        source: `${source}/kotlin/application/settings.gradle.kts.ejs`,
                        destination: `${destination}/application/settings.gradle.kts`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/application/build.gradle.kts.ejs`,
                        destination: `${destination}/application/build.gradle.kts`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/application/gradlew`,
                        destination: `${destination}/application/gradlew`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/application/gradlew.bat`,
                        destination: `${destination}/application/gradlew.bat`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/application/${GW}/gradle-wrapper.jar`,
                        destination: `${destination}/application/${GW}/gradle-wrapper.jar`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/application/${GW}/gradle-wrapper.properties`,
                        destination: `${destination}/application/${GW}/gradle-wrapper.properties`,
                        operation: Constants.template,
                    },
                    // Service gradle files
                    {
                        source: `${source}/kotlin/service/settings.gradle.kts.ejs`,
                        destination: `${destination}/service/settings.gradle.kts`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/service/build.gradle.kts.ejs`,
                        destination: `${destination}/service/build.gradle.kts`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/service/gradlew`,
                        destination: `${destination}/service/gradlew`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/service/gradlew.bat`,
                        destination: `${destination}/service/gradlew.bat`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/service/${GW}/gradle-wrapper.jar`,
                        destination: `${destination}/service/${GW}/gradle-wrapper.jar`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/service/${GW}/gradle-wrapper.properties`,
                        destination: `${destination}/service/${GW}/gradle-wrapper.properties`,
                        operation: Constants.template,
                    },
                    // Deployment gradle files
                    {
                        source: `${source}/kotlin/deployment/settings.gradle.kts.ejs`,
                        destination: `${destination}/deployment/settings.gradle.kts`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/deployment/build.gradle.kts.ejs`,
                        destination: `${destination}/deployment/build.gradle.kts`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/deployment/gradlew`,
                        destination: `${destination}/deployment/gradlew`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/deployment/gradlew.bat`,
                        destination: `${destination}/deployment/gradlew.bat`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/kotlin/deployment/${GW}/gradle-wrapper.jar`,
                        destination: `${destination}/deployment/${GW}/gradle-wrapper.jar`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/deployment/${GW}/gradle-wrapper.properties`,
                        destination: `${destination}/deployment/${GW}/gradle-wrapper.properties`,
                        operation: Constants.template,
                    },
                ],
            },
            docs: [
                {
                    source: `${source}/kotlin/HELP.md.ejs`,
                    destination: `${destination}/HELP.md`,
                    operation: Constants.template,
                },
                {
                    source: `${source}/kotlin/application/HELP.md.ejs`,
                    destination: `${destination}/application/HELP.md`,
                    operation: Constants.template,
                },
                {
                    source: `${source}/kotlin/deployment/HELP.md.ejs`,
                    destination: `${destination}/deployment/HELP.md`,
                    operation: Constants.template,
                },
                {
                    source: `${source}/kotlin/service/HELP.md.ejs`,
                    destination: `${destination}/service/HELP.md`,
                    operation: Constants.template,
                },
            ],
            code: {
                main: [
                    {
                        source: `${source}/${KSML}/package/Service.kt.ejs`,
                        destination: `${destination}/${DKSML}/${localAppBaseImportPath}/service/Service.kt`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KAML}/package/Application.kt.ejs`,
                        destination: `${destination}/${DKAML}/${localAppBaseImportPath}/application/Application.kt`,
                        operation: Constants.template,
                    },
                ],
                test: [
                    {
                        source: `${source}/${KSTL}/package/ServiceTests.kt.ejs`,
                        destination: `${destination}/${DKSTL}/${localAppBaseImportPath}/service/ServiceTests.kt`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KATL}/package/ApplicationTests.kt.ejs`,
                        destination: `${destination}/${DKATL}/${localAppBaseImportPath}/application/ApplicationTests.kt`,
                        operation: Constants.template,
                    },
                ],
            },
            resources: {
                main: [
                    {
                        source: `${source}/${KSMRL}/application.yml.ejs`,
                        destination: `${destination}/${DKSMRL}/application.yml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KDMRL}/application.yml.ejs`,
                        destination: `${destination}/${DKDMRL}/application.yml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KAMRL}/application.yml.ejs`,
                        destination: `${destination}/${DKAMRL}/application.yml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KAMRL}/certs/generate.sh.ejs`,
                        destination: `${destination}/${DKAMRL}/certs/generate.sh`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KAMRL}/certs/localhost.crt`,
                        destination: `${destination}/${DKAMRL}/certs/localhost.crt`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/${KAMRL}/certs/localhost.key`,
                        destination: `${destination}/${DKAMRL}/certs/localhost.key`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/${KAMRL}/certs/localhost.p12`,
                        destination: `${destination}/${DKAMRL}/certs/localhost.p12`,
                        operation: Constants.move,
                    },
                ],
                test: [],
            },
        },
    };
    return fileMap[preferredLanguage];
};

module.exports = {
    FileMapper,
};
