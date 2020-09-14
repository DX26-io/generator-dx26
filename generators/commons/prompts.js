const chalk = require('chalk');
const Constants = require('../utils/constants');
const Helpers = require('../utils/helpers');

module.exports = {
    AskForInsightOptIn: askForInsightOptIn,
    AskForLanguagePreference: askForLanguagePreference,
    AskForAppName: askForAppName,
    AskForBasePackageName: askForBasePackageName,
    AskForJavaVersion: askForJavaVersion,
    AskForBuildTool: askForBuildTool,
    AskForRunBuild: askForRunBuild,
};

function askForInsightOptIn() {
    if (this.allowAnonymousDataCollection) return;
    this.allowAnonymousDataCollection = true;

    const done = this.async();

    this.prompt({
        type: 'confirm',
        name: Constants.commonProperties.allowAnonymousDataCollection,
        message: `Allow ${chalk.magenta('DX26.io')} to anonymously report usage statistics to improve the tool over time?`,
        default: this.allowAnonymousDataCollection,
    }).then(prompt => {
        this.allowAnonymousDataCollection = prompt.allowAnonymousDataCollection;
        this.config.set(Constants.commonProperties.allowAnonymousDataCollection, prompt.allowAnonymousDataCollection);
        done();
    });
}

function askForRunBuild() {
    const done = this.async();

    this.prompt({
        type: 'confirm',
        name: Constants.commonProperties.runBuild,
        message: `Would like to ${chalk.yellow('run the build')} after code is generated?`,
        default: this.runBuild,
    }).then(prompt => {
        this.runBuild = prompt.runBuild;
        this.config.set(Constants.commonProperties.runBuild, prompt.runBuild);
        done();
    });
}

function askForLanguagePreference() {
    if (!this.isNewProject) return;

    const languageTypeChoices = Constants.languagesSupported;

    const PROMPT = {
        type: 'list',
        name: Constants.commonProperties.preferredLanguage,
        message: `Which ${chalk.yellow('language')} would you prefer?`,
        choices: languageTypeChoices,
        default: this.preferredLanguage,
    };

    const done = this.async();

    const promise = this.prompt(PROMPT);
    promise.then(prompt => {
        this.preferredLanguage = prompt.preferredLanguage;
        this.config.set(Constants.commonProperties.preferredLanguage, prompt.preferredLanguage);
        done();
    });
}

function askForAppName() {
    if (!this.isNewProject) return;

    const PROMPT = {
        type: 'input',
        name: Constants.commonProperties.appName,
        message: `What would you like to ${chalk.yellow('name')} your app?`,
        default: this.appName,
    };

    const done = this.async();

    const promise = this.prompt(PROMPT);
    promise.then(prompt => {
        this.appName = prompt.appName;
        this.config.set(Constants.commonProperties.appName, prompt.appName);
        done();
    });
}

function askForBasePackageName() {
    if (!this.isNewProject) return;

    const PROMPT = {
        type: 'input',
        name: Constants.commonProperties.basePackageName,
        message: `What would you like your ${chalk.yellow('base package')} structure to look like?`,
        default: this.basePackageName,
        validate: text => {
            if (Helpers.javaPackageNameValidation(text)) return true;
            // eslint-disable-next-line consistent-return
            return `${chalk.red(text)} is not a valid package name`;
        },
    };

    const done = this.async();

    const promise = this.prompt(PROMPT);
    promise.then(prompt => {
        this.basePackageName = prompt.basePackageName;
        this.config.set(Constants.commonProperties.basePackageName, prompt.basePackageName);
        done();
    });
}

function askForJavaVersion() {
    if (!this.isNewProject) return;

    const javaVersionChoices = Constants.javaVersionsSupported;

    const PROMPT = {
        type: 'list',
        name: Constants.commonProperties.javaVersion,
        message: `Which ${chalk.yellow('java version')} would you like to use?`,
        choices: javaVersionChoices,
        default: this.javaVersion,
    };

    const done = this.async();

    const promise = this.prompt(PROMPT);
    promise.then(prompt => {
        this.javaVersion = prompt.javaVersion;
        this.config.set(Constants.commonProperties.javaVersion, prompt.javaVersion);
        done();
    });
}

function askForBuildTool() {
    if (!this.isNewProject) return;

    const buildToolChoices = Constants.buildToolsSupported;

    const PROMPT = {
        type: 'list',
        name: Constants.commonProperties.buildTool,
        message: `Which ${chalk.yellow('build tool')} would you like to use?`,
        choices: buildToolChoices,
        default: this.buildTool,
    };

    const done = this.async();

    const promise = this.prompt(PROMPT);
    promise.then(prompt => {
        this.buildTool = prompt.buildTool;
        this.config.set(Constants.commonProperties.buildTool, prompt.buildTool);
        done();
    });
}
