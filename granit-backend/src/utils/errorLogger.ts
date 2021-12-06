const moment = require('moment');

function errorLog(functionName, errorMessage) {
  const now = moment().format('YY:DD:MM HH:mm:ss');
  const errorString = JSON.stringify(errorMessage);
  const log = `${now} ${functionName} error: ${errorString}`;
  console.error(log);
}

module.exports = {
  errorLog,
};
