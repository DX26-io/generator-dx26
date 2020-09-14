const chalk = require('chalk');
const Helpers = require('../utils/helpers');
const Constants = require('./constants');

function askForFirstBinder() {
    if (!this.isNewProject) return;

    const firstBinderTypeChoices = Constants.messagingSystemsSupported;

    const PROMPT = {
        type: 'list',
        name: Constants.baseConfig.firstBinder,
        message: `What is the ${chalk.yellow('first binder')}?`,
        choices: firstBinderTypeChoices,
        default: this.firstBinder,
    };

    const done = this.async();

    const promise = this.prompt(PROMPT);
    promise.then(prompt => {
        this.firstBinder = prompt.firstBinder;
        this.config.set(Constants.baseConfig.firstBinder, prompt.firstBinder);
        done();
    });
}

function askForSecondBinder() {
    if (!this.isNewProject) return;

    const secondBinderTypeChoices = Constants.messagingSystemsSupported;

    const PROMPT = {
        type: 'list',
        name: Constants.baseConfig.secondBinder,
        message: `What is the ${chalk.yellow('second binder')}?`,
        choices: secondBinderTypeChoices,
        default: this.secondBinder,
    };

    const done = this.async();

    const promise = this.prompt(PROMPT);
    promise.then(prompt => {
        this.secondBinder = prompt.secondBinder;
        this.config.set(Constants.baseConfig.secondBinder, prompt.secondBinder);
        this.config.set(Constants.baseConfig.combinationCode, this.firstBinder + this.secondBinder);
        this.config.set(Constants.baseConfig.binderConfig, this.binderConfig);
        this.config.set(Constants.baseConfig.processors, this.processors);
        done();
    });
}

function askToAddNewProcessor() {
    const done = this.async();

    this.prompt({
        type: 'confirm',
        name: 'addNewProcessor',
        message: `Would you like to ${chalk.yellow('add new')} processor?`,
        default: true,
    }).then(prompt => {
        if (prompt.addNewProcessor) {
            askForProcessorName(done, this);
        } else {
            done();
        }
    });
}

function askToEditExistingProcessors() {
    if (Object.keys(this.processors).length < 1) return;

    const done = this.async();

    this.prompt({
        type: 'confirm',
        name: 'editExistingProcessors',
        message: `Would you like to ${chalk.yellow('edit existing')} processors?`,
        default: false,
    }).then(prompt => {
        if (prompt.editExistingProcessors) {
            askWhichProcessorToEdit(done, this);
        } else {
            done();
        }
    });
}

function askWhichProcessorToEdit(done, _this) {
    const existingProcessors = Object.keys(_this.processors);

    const PROMPT = {
        type: 'list',
        name: Constants.processorConfig.processorName,
        message: `Select the ${chalk.yellow('processor')} you would like to ${chalk.yellow('edit')}`,
        choices: existingProcessors,
        default: existingProcessors[0],
    };

    const promise = _this.prompt(PROMPT);
    promise.then(prompt => {
        askForProcessorDestination(done, _this, prompt.processorName, Constants.processorConfig.input, Constants.edit);
    });
}

function askForProcessorName(done, _this) {
    const defaultValue = 'SimpleProcessor';

    const existingProcessors = Object.keys(_this.processors);

    const PROMPT = {
        type: 'input',
        name: Constants.processorConfig.processorName,
        message: `What is the name of this ${chalk.yellow('processor')}?`,
        default: defaultValue,
        validate: text => {
            if (Helpers.processorNameValidation(text)) {
                if (existingProcessors.includes(Helpers.removeSpacesAndConvertToLowercase(text))) {
                    return `A processor with the name ${chalk.red(
                        text
                    )} already exists. Please try again by naming your processor differently!`;
                }
                return true;
            }
            return `${chalk.red(text)} is not a valid processor name. Use only alphabets [a-zA-Z]`;
        },
    };

    const promise = _this.prompt(PROMPT);
    promise.then(prompt => {
        const processorName = Helpers.removeSpacesAndConvertToLowercase(prompt.processorName);
        if (!_this.processors[processorName]) {
            _this.processors[processorName] = new Constants.ProcessorConfigDefaults();
        }
        _this.processors[processorName].processorName = processorName;
        _this.config.set(Constants.baseConfig.processors, _this.processors);
        askForProcessorDestination(done, _this, processorName, Constants.processorConfig.input, Constants.add);
    });
}

function askForProcessorDestination(done, _this, processorName, direction, flow) {
    if (!processorName || !direction) return;

    const streamingDescription = direction === Constants.processorConfig.input ? Constants.consume : Constants.produce;

    const PROMPT = {
        type: 'input',
        name: Constants.processorInputOutputStruct.destination,
        message: `Which topic/channel would like to ${chalk.yellow(streamingDescription)} the data?`,
        default: _this.processors[processorName][direction].destination,
        validate: text => {
            if (Helpers.hasSpaceValidation(text)) {
                return 'Spaces are not allowed in the topic/channel name. Please use something with out a space!';
            }
            return true;
        },
    };

    const promise = _this.prompt(PROMPT);
    promise.then(prompt => {
        _this.processors[processorName][direction].destination = prompt.destination;
        _this.config.set(Constants.baseConfig.processors, _this.processors);
        askForProcessorBinder(done, _this, processorName, direction, flow);
    });
}

function askForProcessorBinder(done, _this, processorName, direction, flow) {
    if (!processorName || !direction) return;

    let streamingDescription = direction === Constants.processorConfig.input ? Constants.consume : Constants.produce;
    streamingDescription += 'r binder';

    const firstBinder = Constants.messagingSystemsSupported.find(system => system.value === _this.firstBinder);
    const secondBinder = Constants.messagingSystemsSupported.find(system => system.value === _this.secondBinder);

    const processorBinderChoices = [
        {
            value: Constants.baseConfig.firstBinder,
            name: `${firstBinder.name} (first binder)`,
        },
        {
            value: Constants.baseConfig.secondBinder,
            name: `${secondBinder.name} (second binder)`,
        },
    ];

    const PROMPT = {
        type: 'list',
        name: Constants.processorInputOutputStruct.binder,
        message: `Select ${chalk.yellow(streamingDescription)}`,
        choices: processorBinderChoices,
        default: _this.processors[processorName][direction].binder,
    };

    const promise = _this.prompt(PROMPT);
    promise.then(prompt => {
        _this.processors[processorName][direction].binder = prompt.binder;
        _this.config.set(Constants.baseConfig.processors, _this.processors);
        askForProcessorContentType(done, _this, processorName, direction, flow);
    });
}

function askForProcessorContentType(done, _this, processorName, direction, flow) {
    if (!processorName || !direction) return;

    let streamingDescription = direction === Constants.processorConfig.input ? Constants.consume : Constants.produce;
    streamingDescription += 'r content-type';

    let messageTypeChoices = Constants.messageTypesSupported;
    if (![Constants.confluentKafka, Constants.vanillaKafka].includes(_this[_this.processors[processorName][direction].binder])) {
        messageTypeChoices = messageTypeChoices.filter(messageType => messageType.name !== Constants.avro);
    }

    const PROMPT = {
        type: 'list',
        name: Constants.processorInputOutputStruct.contentType,
        message: `Select ${chalk.yellow(streamingDescription)}`,
        choices: messageTypeChoices,
        default: _this.processors[processorName][direction].contentType,
    };

    const promise = _this.prompt(PROMPT);
    promise.then(prompt => {
        _this.processors[processorName][direction].contentType = prompt.contentType;
        _this.config.set(Constants.baseConfig.processors, _this.processors);
        if (direction === Constants.processorConfig.input) {
            askForProcessorDestination(done, _this, processorName, Constants.processorConfig.output, flow);
        } else if (flow === Constants.add) {
            askToAddAnotherNewProcessor(done, _this);
        } else if (flow === Constants.edit) {
            askToEditAnotherProcessor(done, _this);
        }
    });
}

function askToAddAnotherNewProcessor(done, _this) {
    if (!done || !_this) return;

    _this
        .prompt({
            type: 'confirm',
            name: 'addNewProcessor',
            message: `Would you like to ${chalk.yellow('add new')} processor?`,
            default: true,
        })
        .then(prompt => {
            if (prompt.addNewProcessor) {
                askForProcessorName(done, _this);
            } else {
                done();
            }
        });
}

function askToEditAnotherProcessor(done, _this) {
    if (!done || !_this) return;

    _this
        .prompt({
            type: 'confirm',
            name: 'editAnotherProcessor',
            message: `Would you like to ${chalk.yellow('edit another')} processor?`,
            default: false,
        })
        .then(prompt => {
            if (prompt.editAnotherProcessor) {
                askWhichProcessorToEdit(done, _this);
            } else {
                done();
            }
        });
}

function askForDockerPrefix() {
    if (!this.isNewProject) return;

    const PROMPT = {
        type: 'input',
        name: Constants.baseConfig.dockerPrefix,
        message: `Provide a prefix for the docker image. It can be your ${chalk.yellow('docker organisation')}, ${chalk.yellow(
            'internal department'
        )} or a ${chalk.yellow('docker username')}?`,
        default: Constants.baseConfigDefaults.dockerPrefix,
        validate: text => {
            if (text.length === 0) return "Docker image's prefix cannot be empty";
            if (Helpers.dockerPrefixValidation(text)) {
                return true;
            }
            return `${chalk.red(text)} is not a valid organisation name. Check out docker image naming standards for more details`;
        },
    };

    const done = this.async();

    const promise = this.prompt(PROMPT);
    promise.then(prompt => {
        this.dockerPrefix = prompt.dockerPrefix;
        this.config.set(Constants.baseConfig.dockerPrefix, this.dockerPrefix);
        done();
    });
}

function askForMaintainer() {
    if (!this.isNewProject) return;

    const PROMPT = {
        type: 'input',
        name: Constants.baseConfig.maintainer,
        message: `Who is going to ${chalk.yellow('maintain')} this artifact? It can be an email address or department name or person`,
        default: Constants.baseConfigDefaults.maintainer,
        validate: text => {
            if (text.length === 0) return 'Its recommended to provider who will maintain this artifact';
            return true;
        },
    };

    const done = this.async();

    const promise = this.prompt(PROMPT);
    promise.then(prompt => {
        this.maintainer = prompt.maintainer;
        this.config.set(Constants.baseConfig.maintainer, this.maintainer);
        done();
    });
}

module.exports = {
    askForFirstBinder,
    askForSecondBinder,
    askToAddNewProcessor,
    askToEditExistingProcessors,
    askForDockerPrefix,
    askForMaintainer,
};
