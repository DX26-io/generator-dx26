const shelljs = require('shelljs');
const chalk = require('chalk');

const changeGradleBuildFilePermissions = _this => {
    const done = _this.async();
    shelljs.exec(`chmod +x ${_this.cwd}/gradlew ${_this.cwd}/**/gradlew`, code => {
        if (code !== 0) {
            _this.log(chalk.red('Error occured while changing build file permissions!'));
        } else {
            _this.log(chalk.bold('File permissions sucessfully changed'));
        }
        done();
    });
};

const runGradleBuild = _this => {
    const done = _this.async();
    _this.log(chalk.bold('Building your application'));
    shelljs.exec('./gradlew clean build', code => {
        if (code !== 0) {
            _this.log(chalk.red('Build Failed!'));
        }
        done();
    });
};

const initializeGit = _this => {
    const done = _this.async();
    _this.log(chalk.bold('Initializing Git'));
    shelljs.exec('git --version', yesCode => {
        if (yesCode === 0) {
            shelljs.exec('git init', code => {
                if (code !== 0) {
                    _this.log(chalk.red('Git Initialization Failed!'));
                }
                done();
            });
        } else {
            _this.red(chalk.bold('Git is not installed! Hence skipping git init.'));
            done();
        }
    });
};

const ShellOps = {
    changeGradleBuildFilePermissions,
    runGradleBuild,
    initializeGit,
};

module.exports = ShellOps;
