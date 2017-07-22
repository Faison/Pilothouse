const commands = require('../utils/commands'),
      config = require('../utils/config'),
      environment = require('../utils/environment');

const wpCommand = function(argv) {
    let phpContainer;

	if (argv.php) {
		phpContainer = 'php' + argv.php.toString().replace(/\./g, '');
	} else {
		phpContainer = config.default_php_container;
	}

	if (argv.xdebug) {
		phpContainer += '-xdebug';
	}

	commands.wpCommand(environment.subCommandArgs, phpContainer);
};

exports.command = 'wp [command]';
exports.builder = function(yargs) {
	return yargs
		.option('php <version>', {
			default: config.default_php_version,
			describe: 'The version of PHP which should be used to run the command.'
		})
		.option('xdebug', {
			default: false,
			describe: 'Whether to enable Xdebug for the command.'
		});
};
exports.desc    = 'Runs a WP-CLI command in the Docker container against the current site.';
exports.handler = wpCommand;