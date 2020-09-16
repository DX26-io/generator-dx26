const Constants = require('../utils/constants');
const Helpers = require('../utils/helpers');

// Source Paths
const KAML = 'kotlin/application/src/main/kotlin';
const KATL = 'kotlin/application/src/test/kotlin';
const KAMRL = 'kotlin/application/src/main/resources';
const KAMDL = 'kotlin/application/src/main/docker';
const KSML = 'kotlin/service/src/main/kotlin';
const KSTL = 'kotlin/service/src/test/kotlin';
const KDMDL = 'kotlin/deployment/src/main/docker';
const KDMHL = 'kotlin/deployment/src/main/helm';
// Destination Paths
const DKAML = 'application/src/main/kotlin';
const DKATL = 'application/src/test/kotlin';
const DKAMRL = 'application/src/main/resources';
const DKAMDL = 'application/src/main/docker';
const DKSML = 'service/src/main/kotlin';
const DKSTL = 'service/src/test/kotlin';
const DKDMDL = 'deployment/src/main/docker';
const DKDMHL = 'deployment/src/main/helm';

// Commons
const GW = 'gradle/wrapper';

const FileMapper = (source, destination, appBaseImportPath, preferredLanguage) => {
    const localAppBaseImportPath = Helpers.getBasePackagePath(appBaseImportPath);
    const appName = appBaseImportPath.split('.').pop();
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
                    source: `${source}/kotlin/gitignore`,
                    destination: `${destination}/.gitignore`,
                    operation: Constants.move,
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
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/gradlew.bat`,
                        destination: `${destination}/gradlew.bat`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/${GW}/gradle-wrapper.jar`,
                        destination: `${destination}/${GW}/gradle-wrapper.jar`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/${GW}/gradle-wrapper.properties`,
                        destination: `${destination}/${GW}/gradle-wrapper.properties`,
                        operation: Constants.move,
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
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/application/gradlew.bat`,
                        destination: `${destination}/application/gradlew.bat`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/application/${GW}/gradle-wrapper.jar`,
                        destination: `${destination}/application/${GW}/gradle-wrapper.jar`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/application/${GW}/gradle-wrapper.properties`,
                        destination: `${destination}/application/${GW}/gradle-wrapper.properties`,
                        operation: Constants.move,
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
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/service/gradlew.bat`,
                        destination: `${destination}/service/gradlew.bat`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/service/${GW}/gradle-wrapper.jar`,
                        destination: `${destination}/service/${GW}/gradle-wrapper.jar`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/service/${GW}/gradle-wrapper.properties`,
                        destination: `${destination}/service/${GW}/gradle-wrapper.properties`,
                        operation: Constants.move,
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
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/deployment/gradlew.bat`,
                        destination: `${destination}/deployment/gradlew.bat`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/deployment/${GW}/gradle-wrapper.jar`,
                        destination: `${destination}/deployment/${GW}/gradle-wrapper.jar`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/kotlin/deployment/${GW}/gradle-wrapper.properties`,
                        destination: `${destination}/deployment/${GW}/gradle-wrapper.properties`,
                        operation: Constants.move,
                    },
                ],
            },
            docs: [
                {
                    source: `${source}/kotlin/README.md.ejs`,
                    destination: `${destination}/README.md`,
                    operation: Constants.template,
                },
            ],
            code: {
                main: [
                    // Application
                    {
                        source: `${source}/${KAML}/package/Application.kt.ejs`,
                        destination: `${destination}/${DKAML}/${localAppBaseImportPath}/application/Application.kt`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KAML}/package/metrics/ApplicationMetrics.kt.ejs`,
                        destination: `${destination}/${DKAML}/${localAppBaseImportPath}/application/metrics/ApplicationMetrics.kt`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KAMDL}/compose/dc-template.yaml.ejs`,
                        destination: `${destination}/${DKAMDL}/compose/dc-template.yaml`,
                        operation: Constants.template,
                    },
                    // Service
                    {
                        source: `${source}/${KSML}/package/Service.kt.ejs`,
                        destination: `${destination}/${DKSML}/${localAppBaseImportPath}/service/Service.kt`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KSML}/package/metrics/ChannelMetrics.kt.ejs`,
                        destination: `${destination}/${DKSML}/${localAppBaseImportPath}/service/metrics/ChannelMetrics.kt`,
                        operation: Constants.template,
                    },
                    // Deployment
                    // Docker
                    {
                        source: `${source}/${KDMDL}/Dockerfile`,
                        destination: `${destination}/${DKDMDL}/Dockerfile`,
                        operation: Constants.move,
                    },
                    // Helm
                    {
                        source: `${source}/${KDMHL}/chart/values.yaml.ejs`,
                        destination: `${destination}/${DKDMHL}/${appName}/values.yaml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KDMHL}/chart/Chart.yaml.ejs`,
                        destination: `${destination}/${DKDMHL}/${appName}/Chart.yaml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KDMHL}/chart/.helmignore`,
                        destination: `${destination}/${DKDMHL}/${appName}/.helmignore`,
                        operation: Constants.move,
                    },
                    {
                        source: `${source}/${KDMHL}/chart/templates/_helpers.tpl.ejs`,
                        destination: `${destination}/${DKDMHL}/${appName}/templates/_helpers.tpl`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KDMHL}/chart/templates/configmap.yaml.ejs`,
                        destination: `${destination}/${DKDMHL}/${appName}/templates/configmap.yaml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KDMHL}/chart/templates/deployment.yaml.ejs`,
                        destination: `${destination}/${DKDMHL}/${appName}/templates/deployment.yaml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KDMHL}/chart/templates/hpa.yaml.ejs`,
                        destination: `${destination}/${DKDMHL}/${appName}/templates/hpa.yaml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KDMHL}/chart/templates/ingress.yaml.ejs`,
                        destination: `${destination}/${DKDMHL}/${appName}/templates/ingress.yaml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KDMHL}/chart/templates/NOTES.txt.ejs`,
                        destination: `${destination}/${DKDMHL}/${appName}/templates/NOTES.txt`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KDMHL}/chart/templates/service.yaml.ejs`,
                        destination: `${destination}/${DKDMHL}/${appName}/templates/service.yaml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KDMHL}/chart/templates/serviceaccount.yaml.ejs`,
                        destination: `${destination}/${DKDMHL}/${appName}/templates/serviceaccount.yaml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KDMHL}/chart/templates/tests/test-connection.yaml.ejs`,
                        destination: `${destination}/${DKDMHL}/${appName}/templates/tests/test-connection.yaml`,
                        operation: Constants.template,
                    },
                ],
                test: [
                    {
                        source: `${source}/${KATL}/package/ApplicationTests.kt.ejs`,
                        destination: `${destination}/${DKATL}/${localAppBaseImportPath}/application/ApplicationTests.kt`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KSTL}/package/ServiceTests.kt.ejs`,
                        destination: `${destination}/${DKSTL}/${localAppBaseImportPath}/service/ServiceTests.kt`,
                        operation: Constants.template,
                    },
                ],
            },
            resources: {
                main: [
                    {
                        source: `${source}/${KAMRL}/application.yml.ejs`,
                        destination: `${destination}/${DKAMRL}/application.yml`,
                        operation: Constants.template,
                    },
                    {
                        source: `${source}/${KAMRL}/application.yml.ejs`,
                        destination: `${destination}/${DKAMRL}/profiles/application-test.yml`,
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
                    {
                        source: `${source}/${KAMRL}/creds/README.md`,
                        destination: `${destination}/${DKAMRL}/creds/README.md`,
                        operation: Constants.move,
                    },
                ],
                test: [],
            },
        },
    };

    return fileMap[preferredLanguage];
};

const getDataGeneratorConfigFiles = config => {
    const configFiles = [];
    const sourceLocation = config.preferredLanguage === Constants.kotlin ? KAMDL : 'TODO';
    const destinationLocation = config.preferredLanguage === Constants.kotlin ? DKAMDL : 'TODO';
    if (config.needsKafkaAvroDataGeneration) {
        configFiles.push({
            source: `${config.templateLocation}/${sourceLocation}/compose/kafka-avro-config.yaml`,
            destination: `${config.cwd}/${destinationLocation}/compose/kafka-avro-config.yaml`,
            operation: Constants.move,
        });
    }
    if (config.needsKafkaJsonDataGeneration) {
        configFiles.push({
            source: `${config.templateLocation}/${sourceLocation}/compose/kafka-json-config.yaml`,
            destination: `${config.cwd}/${destinationLocation}/compose/kafka-json-config.yaml`,
            operation: Constants.move,
        });
    }
    if (config.needsKinesisJsonDataGeneration) {
        configFiles.push({
            source: `${config.templateLocation}/${sourceLocation}/compose/kinesis-json-config.yaml`,
            destination: `${config.cwd}/${destinationLocation}/compose/kinesis-json-config.yaml`,
            operation: Constants.move,
        });
    }
    if (config.needsPubSubJsonDataGeneration) {
        configFiles.push({
            source: `${config.templateLocation}/${sourceLocation}/compose/pubsub-json-config.yaml`,
            destination: `${config.cwd}/${destinationLocation}/compose/pubsub-json-config.yaml`,
            operation: Constants.move,
        });
    }
    return configFiles;
};

const getCredentialSampleFiles = config => {
    const configFiles = [];
    const sourceLocation = config.preferredLanguage === Constants.kotlin ? KAMRL : 'TODO';
    const destinationLocation = config.preferredLanguage === Constants.kotlin ? DKAMRL : 'TODO';
    if (config.needsPubSubSupport) {
        configFiles.push({
            source: `${config.templateLocation}/${sourceLocation}/creds/gcp-cred-dx26-application.json`,
            destination: `${config.cwd}/${destinationLocation}/creds/gcp-cred-dx26-application.json`,
            operation: Constants.move,
        });
    }
    return configFiles;
};

const getAvroSampleFiles = config => {
    const configFiles = [];
    const sourceLocation = config.preferredLanguage === Constants.kotlin ? KAMRL : 'TODO';
    const destinationLocation = config.preferredLanguage === Constants.kotlin ? DKAMRL : 'TODO';
    if (config.needsVanillaKafkaSupport && config.needsAvroSupport) {
        configFiles.push({
            source: `${config.templateLocation}/${sourceLocation}/avro/README.md`,
            destination: `${config.cwd}/${destinationLocation}/avro/README.md`,
            operation: Constants.move,
        });
        configFiles.push({
            source: `${config.templateLocation}/${sourceLocation}/avro/shipment-anomoly-sample.md`,
            destination: `${config.cwd}/${destinationLocation}/avro/shipment-anomoly-sample.md`,
            operation: Constants.move,
        });
    }
    return configFiles;
};

const getProcessorCodeFiles = config => {
    const configFiles = [];
    const sourceLocation = config.preferredLanguage === Constants.kotlin ? KSML : 'TODO';
    const destinationLocation = config.preferredLanguage === Constants.kotlin ? DKSML : 'TODO';
    const localAppBaseImportPath = Helpers.getBasePackagePath(config.appBaseImportPath);
    config.processorList.forEach(processor => {
        configFiles.push({
            source: `${config.templateLocation}/${sourceLocation}/package/processor/IOInterface.kt.ejs`,
            destination: `${config.cwd}/${destinationLocation}/${localAppBaseImportPath}/service/${processor}/${config.processors[processor].className}IOInterface.kt`,
            operation: Constants.template,
            context: { processor: config.processors[processor] },
        });
        configFiles.push({
            source: `${config.templateLocation}/${sourceLocation}/package/processor/Impl.kt.ejs`,
            destination: `${config.cwd}/${destinationLocation}/${localAppBaseImportPath}/service/${processor}/${config.processors[processor].className}Impl.kt`,
            operation: Constants.template,
            context: { processor: config.processors[processor] },
        });
    });
    return configFiles;
};

module.exports = {
    FileMapper,
    getDataGeneratorConfigFiles,
    getCredentialSampleFiles,
    getAvroSampleFiles,
    getProcessorCodeFiles,
};
