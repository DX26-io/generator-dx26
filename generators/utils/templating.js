const ejs = require('ejs');

const renderContent = (source, generator, context, options, cb) => {
    ejs.renderFile(generator.templatePath(source), context, options, (err, res) => {
        if (!err) {
            cb(res);
        } else {
            generator.log(`Copying template ${source} failed. [${err}]`);
        }
    });
};

const Templating = {
    renderContent,
};

module.exports = Templating;
