const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const yosay = require('yosay');
const Constants = require('./utils/constants');
const Templating = require('./utils/templating');
const Helpers = require('./utils/helpers');
const ShellOps = require('./utils/shell-ops');
const prompts = require('./commons/prompts');

class BaseGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.helloText = 'Welcome to DX26.io!\nLets start scaffolding your application!';
        this.isNewProject = true;
    }

    _baseConfigSetup(scaffolderName) {
        // display text
        this.log(chalk.blue(`Running DX26:${scaffolderName} Scaffolding`));
        this.desc(`DX26 ${scaffolderName} Application Scaffolder`);
        this.helloText = `Welcome to ${chalk.magentaBright('DX26.io')}!\nLets start scaffolding your ${chalk.cyan(
            scaffolderName
        )} application!`;
        // initializing base params
        // check if its a new project
        this.isNewProject = _.isNil(this.config.get(Constants.commonProperties.preferredLanguage));
        // check if we are ok to collect stats anonymously
        this.allowAnonymousDataCollection = _.isNil(this.config.get(Constants.commonProperties.allowAnonymousDataCollection))
            ? Constants.propertyDefaults.allowAnonymousDataCollection
            : this.config.get(Constants.commonProperties.allowAnonymousDataCollection);
        // read app name
        this.appName = _.isNil(this.config.get('appName')) ? this.appname.trim().replace(' ', '') : this.config.get('appName');
        // should we skip build?
        this.runBuild = _.isNil(this.config.get(Constants.commonProperties.runBuild))
            ? Constants.propertyDefaults.runBuild
            : this.config.get(Constants.commonProperties.runBuild);
        this.config.set(Constants.commonProperties.runBuild, this.runBuild);
        // directory config
        this.cwd = this.destinationRoot();
        this.templateLocation = this.sourceRoot();
    }

    _javaAppConfigSetup() {
        // read basePackageName
        this.basePackageName = _.isNil(this.config.get('basePackageName'))
            ? Constants.propertyDefaults.basePackageName
            : this.config.get('basePackageName');
        // read application language preference
        this.preferredLanguage = _.isNil(this.config.get(Constants.commonProperties.preferredLanguage))
            ? this.options['preferred-language']
            : this.config.get(Constants.commonProperties.preferredLanguage);
        // read which build tool to use
        this.buildTool = _.isNil(this.config.get('buildTool')) ? Constants.propertyDefaults.buildTool : this.config.get('buildTool');
        // read java version
        this.javaVersion = _.isNil(this.config.get('javaVersion'))
            ? Constants.propertyDefaults.javaVersion
            : this.config.get('javaVersion');
    }

    _initializing() {
        return {
            hello() {
                console.log(yosay(this.helloText));
            },
            validate() {
                this.log(
                    `Deprecated: DX26 seems to be invoked using Yeoman command. Please use the DX26 CLI. Run ${chalk.green(
                        'dx26 <command>'
                    )} instead of ${chalk.red('yo dx26:<command>')}`
                );
            },
        };
    }

    _basePrompting() {
        return {
            askForAppName: prompts.AskForAppName,
        };
    }

    _javaAppDefaultPrompting() {
        return {
            askForBasePackageName: prompts.AskForBasePackageName,
            askForLanguagePreference: prompts.AskForLanguagePreference,
            askForJavaVersion: prompts.AskForJavaVersion,
            askForBuildTool: prompts.AskForBuildTool,
        };
    }

    _endPrompting() {
        return {
            askForInsightOptIn: prompts.AskForInsightOptIn,
        };
    }

    _configuring() {
        return {
            implicitProperties() {
                this.codeAppName = Helpers.formatAppName(this.appName);
                this.basePackagePath = Helpers.getBasePackagePath(this.basePackageName);
                this.appBaseImportPath = [this.basePackageName, this.codeAppName].join('.');
            },
            getFileMap() {
                this.fileMap = this.fileMapper(this.templateLocation, this.cwd, this.appBaseImportPath, this.preferredLanguage);
            },
        };
    }

    _default() {
        return {};
    }

    _writing() {
        return {
            copyBuildSettings() {
                this.performTemplating(this.fileMap.build[this.buildTool]);
            },
            copyCode() {
                this.performTemplating(this.fileMap.code.main);
                this.performTemplating(this.fileMap.code.test);
            },
            copyResources() {
                this.performTemplating(this.fileMap.resources.main);
                this.performTemplating(this.fileMap.resources.test);
            },
            copyGitConfig() {
                this.performTemplating(this.fileMap.git);
            },
            copyDocs() {
                this.performTemplating(this.fileMap.docs);
            },
        };
    }

    _install() {
        return {
            initializeGit() {
                if (this.isNewProject) {
                    ShellOps.initializeGit(this);
                }
            },
            changePermisions() {
                if (this.runBuild) {
                    this.log(`runBuild : ${this.runBuild}`);
                    if (this.buildTool === Constants.gradle) {
                        ShellOps.changeGradleBuildFilePermissions(this);
                    }
                }
            },
            runBuild() {
                if (this.runBuild) {
                    if (this.buildTool === Constants.gradle) {
                        ShellOps.runGradleBuild(this);
                    }
                }
            },
        };
    }

    _end() {
        return {
            showSummay() {
                this.log(chalk.bold(`\n${this.appName} config:\n`));
                this.log(JSON.stringify(this.config.getAll(), null, 2));
                this.buildTool === Constants.gradle
                    ? this.log(chalk.bold(`\nRun ${this.appName} locally: ${chalk.cyan('./gradlew :application:bootRun')}`))
                    : this.log(chalk.bold(`\nRun ${this.appName} locally: ${chalk.cyan('./mvnw')}`));
            },
        };
    }

    template(source, destination, context, options = {}, generator ) {
        const _this = generator || this;
        const _context = context || _this;
        const customDestination = _this.destinationPath(destination);
        if (!customDestination) {
            this.debug(`File ${destination} ignored`);
            return;
        }
        Templating.renderContent(source, _this, _context, options, res => {
            _this.fs.write(customDestination, res);
        });
    }

    fileMapper(source, destination, appBaseImportPath, preferredLanguage) {
        return {
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
        };
    }

    performTemplating(files) {
        const _this = this;
        files.forEach(file => {
            if (file.operation === Constants.template) {
                if (file.context) {
                    _this.template(file.source, file.destination, file.context);
                } else {
                    _this.template(file.source, file.destination);
                }
            } else {
                _this.fs.copy(file.source, file.destination);
            }
        });
    }
}

module.exports = BaseGenerator;
