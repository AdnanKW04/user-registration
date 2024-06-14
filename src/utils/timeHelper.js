const moment = require("moment");

const generateTimestamp = () => moment().format("DDMMYYYYHHmmss");

module.exports = { generateTimestamp };
