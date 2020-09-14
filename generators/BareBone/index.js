const GeneratorPrompting = require('./prompts');
const BaseGenerator = require('../base-generator');
const Files = require('./files');

class BareBone extends BaseGenerator {
    constructor(args, opts) {
        super(args, opts);
        this._baseConfigSetup('BareBone');
        this._javaAppConfigSetup();
        // console.log(this.options, this.config.getAll());
        this.fileMapper = Files.FileMapper;
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
        };
    }

    get end() {
        return this._end();
    }
}

module.exports = BareBone;
