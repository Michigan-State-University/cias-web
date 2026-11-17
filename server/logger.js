/* eslint-disable no-console */

const os = require('os');
const chalk = require('chalk');

const divider = chalk.gray('\n-----------------------------------');

// First external IPv4 address. Node < 18.4 reported `family` as the number 4.
const lanAddress = () =>
  Object.values(os.networkInterfaces())
    .flat()
    .find(
      (iface) =>
        iface &&
        !iface.internal &&
        (iface.family === 'IPv4' || iface.family === 4),
    )?.address || '127.0.0.1';

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host, tunnelStarted) => {
    console.log(`Server started ! ${chalk.green('✓')}`);

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${
        chalk.magenta(`http://${lanAddress()}:${port}`) +
        (tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')
      }${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};

module.exports = logger;
