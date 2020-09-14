const capitalize = text => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

const javaPackageNameValidation = packageName => {
    return /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/.test(packageName);
};

const titleCase = str => {
    const splitStr = str.toLowerCase().split(' ');
    return splitStr.map(word => capitalize(word)).join(' ');
};

const formatAppName = appName => {
    return appName.trim().split(' ').join('').toLowerCase();
};

const getBasePackagePath = packageName => {
    return packageName.trim().split('.').join('/');
};

const processorNameValidation = processorName => {
    return /[a-zA-Z]+/.test(processorName);
};

const removeSpacesAndConvertToLowercase = text => {
    return text.replace(' ', '').toLowerCase();
};

const hasSpaceValidation = text => {
    return /\s/.test(text);
};

const dockerPrefixValidation = text => {
    return /^\w+$/.test(text);
};

const Helpers = {
    capitalize,
    javaPackageNameValidation,
    formatAppName,
    titleCase,
    getBasePackagePath,
    processorNameValidation,
    removeSpacesAndConvertToLowercase,
    hasSpaceValidation,
    dockerPrefixValidation,
};

module.exports = Helpers;
