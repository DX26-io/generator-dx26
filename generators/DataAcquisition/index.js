const chalk = require('chalk');
const _ = require('lodash');
const GeneratorPrompting = require('./prompts');
const BaseGenerator = require('../base-generator');
const Constants = require('./constants');
const GlobalConstants = require('../utils/constants');
const Files = require('./files');
const Helpers = require ('../utils/helpers');

class DataAcquisition extends BaseGenerator {
    constructor(args, opts) {
        super(args, opts);
        this._baseConfigSetup('DataAcquisition');
        this._javaAppConfigSetup();
        this._binderAndProcessorSetup();
        this.fileMapper = Files.FileMapper;
    }

    _binderAndProcessorSetup() {
        // first binder
        this.firstBinder = _.isNil(this.config.get(Constants.baseConfig.firstBinder))
            ? Constants.baseConfig.firstBinder
            : this.config.get(Constants.baseConfig.firstBinder);
        // second binder
        this.secondBinder = _.isNil(this.config.get(Constants.baseConfig.secondBinder))
            ? Constants.baseConfigDefaults.secondBinder
            : this.config.get(Constants.baseConfig.secondBinder);
        // combinationCode
        this.combinationCode = _.isNil(this.config.get(Constants.baseConfig.combinationCode))
            ? Constants.baseConfigDefaults.combinationCode
            : this.config.get(Constants.baseConfig.combinationCode);
        // processors
        this.binderConfig = _.isNil(this.config.get(Constants.baseConfig.binderConfig))
            ? Constants.baseConfigDefaults.binderConfig
            : this.config.get(Constants.baseConfig.binderConfig);
        // processors
        this.processors = _.isNil(this.config.get(Constants.baseConfig.processors))
            ? Constants.baseConfigDefaults.processors
            : this.config.get(Constants.baseConfig.processors);
        // dockerPrefix
        this.dockerPrefix = _.isNil(this.config.get(Constants.baseConfig.dockerPrefix))
            ? Constants.baseConfigDefaults.dockerPrefix
            : this.config.get(Constants.baseConfig.dockerPrefix);
        // maintainer
        this.maintainer = _.isNil(this.config.get(Constants.baseConfig.maintainer))
            ? Constants.baseConfigDefaults.maintainer
            : this.config.get(Constants.baseConfig.maintainer);
    }

    _initializing() {
        return {
            ...super._initializing(),
        };
    }

    get initializing() {
        return this._initializing();
    }

    _prompting() {
        return {
            ...super._basePrompting(),
            ...super._javaAppDefaultPrompting(),
            ...GeneratorPrompting,
            ...super._endPrompting(),
        };
    }

    get prompting() {
        return this._prompting();
    }

    _configuring() {
        return {
            ...super._configuring(),
            processingParams() {
                this.needsConfluentPlatformSupport = [this.firstBinder, this.secondBinder].includes(Constants.confluentKafka);
                this.needsVanillaKafkaSupport = [this.firstBinder, this.secondBinder].includes(Constants.vanillaKafka);
                this.needsKinesisSupport = [this.firstBinder, this.secondBinder].includes(Constants.kinesis);
                this.needsPubSubSupport = [this.firstBinder, this.secondBinder].includes(Constants.pubsub);
                this.processorList = Object.keys(this.processors);
                this.binders = {
                    firstBinder: this.firstBinder,
                    secondBinder: this.secondBinder,
                };
                const dataFormats = new Set();
                this.needsKafkaAvroDataGeneration = false;
                this.needsKafkaJsonDataGeneration = false;
                this.needsKinesisJsonDataGeneration = false;
                this.needsPubSubJsonDataGeneration = false;
                this.processorList.forEach(processor => {
                    dataFormats.add(this.processors[processor].input.contentType);
                    dataFormats.add(this.processors[processor].output.contentType);
                    this.processors[processor].appBaseImportPath = this.appBaseImportPath;
                    this.processors[processor].className = Helpers.capitalize(this.processors[processor].processorName);
                    this.processors[processor].input.contentTypeClass =
                        this.processors[processor].input.contentType === Constants.avroContentType
                            ? Constants.avroContentTypeClass
                            : Constants.jsonContentTypeClass;
                    this.processors[processor].output.contentTypeClass =
                        this.processors[processor].output.contentType === Constants.avroContentType
                            ? Constants.avroContentTypeClass
                            : Constants.jsonContentTypeClass;
                    this.processors[processor].needsGenericRecord =
                        this.processors[processor].input.contentType === Constants.avroContentType ||
                        this.processors[processor].output.contentType === Constants.avroContentType;
                    if (!this.needsKafkaAvroDataGeneration) {
                        this.needsKafkaAvroDataGeneration =
                            this.processors[processor].input.contentType === Constants.avroContentType &&
                            [Constants.confluentKafka, Constants.vanillaKafka].includes(this[this.processors[processor].input.binder]);
                    }
                    if (!this.needsKafkaJsonDataGeneration) {
                        this.needsKafkaJsonDataGeneration =
                            this.processors[processor].input.contentType === Constants.jsonContentType &&
                            [Constants.confluentKafka, Constants.vanillaKafka].includes(this[this.processors[processor].input.binder]);
                    }
                    if (!this.needsKinesisJsonDataGeneration) {
                        this.needsKinesisJsonDataGeneration =
                            this.processors[processor].input.contentType === Constants.jsonContentType &&
                            this[this.processors[processor].input.binder] === Constants.kinesis;
                    }
                    if (!this.needsPubSubJsonDataGeneration) {
                        this.needsPubSubJsonDataGeneration =
                            this.processors[processor].input.contentType === Constants.jsonContentType &&
                            this[this.processors[processor].input.binder] === Constants.pubsub;
                    }
                });
                this.needsAvroSupport = dataFormats.has(Constants.avroContentType);
                // adding code generation files
                this.fileMap.code.main = this.fileMap.code.main.concat(Files.getDataGeneratorConfigFiles(this));
                // adding service processor files
                this.fileMap.code.main = this.fileMap.code.main.concat(Files.getProcessorCodeFiles(this));
                // adding credential files
                this.fileMap.resources.main = this.fileMap.resources.main.concat(Files.getCredentialSampleFiles(this));
                // adding avro registration files in case of vanilla kafka
                this.fileMap.resources.main = this.fileMap.resources.main.concat(Files.getAvroSampleFiles(this));
            },
        };
    }

    get configuring() {
        return this._configuring();
    }

    _defaut() {
        return {
            ...super._default(),
        };
    }

    get default() {
        return this._defaut();
    }

    _writing() {
        return {
            ...super._writing(),
        };
    }

    get writing() {
        return this._writing();
    }

    _install() {
        return {
            ...super._install(),
        };
    }

    get install() {
        return this._install();
    }

    _end() {
        return {
            ...super._end(),
            displayDataAcquisitionSummary() {
                if (this.buildTool === GlobalConstants.gradle) {
                    this.log(chalk.bold('Important Commands:'));
                    this.log(chalk.bold(`\tbuild: ${chalk.cyan('./gradlew clean build')}`));
                    this.log(chalk.bold(`\trunning dependencies: ${chalk.cyan('./gradlew :application:dockerComposeUp')}`));
                    this.log(chalk.bold(`\tstoping dependencies: ${chalk.cyan('./gradlew :application:dockerComposeDown')}`));
                    this.log(chalk.bold(`\tdocker build & tagging: ${chalk.cyan('./gradlew :deployment:dockerTag')}`));
                    this.log(chalk.bold(`\tpushing images: ${chalk.cyan('./gradlew :deployment:dockerPushTags')}`));
                    this.log(chalk.bold(`\tpackage helm chart: ${chalk.cyan('./gradlew :deployment:helmPackage')}`));
                    this.log(chalk.bold(`\tpublish helm chart: ${chalk.cyan('./gradlew :deployment:helmPublish # (Optional)')}`));
                }
                this.log(chalk.bold('Documentation:'));
                this.log(chalk.bold(`\t- ${chalk.cyan('https://generator-dx26.github.com/docs/README.md')}`));
                this.log(chalk.bold('Summary Notes:'));
                this.log(chalk.bold('\t- Modify the default credentials to run your application. File Locations:'));
                this.log(chalk.bold(`\t\t* ${chalk.cyan('./application/src/main/resources/application.yaml')}`));
                this.log(chalk.bold(`\t\t* ${chalk.cyan('./application/src/main/resources/profiles/application-test.yaml')}`));
                this.log(chalk.bold(`\t\t* ${chalk.cyan('./deployment/src/main/helm/templates/configmap.yaml')}`));
                this.log(chalk.bold('\t- Add your event processing logic to the generated processor implementations'));
            },
        };
    }

    get end() {
        return this._end();
    }
}

module.exports = DataAcquisition;
