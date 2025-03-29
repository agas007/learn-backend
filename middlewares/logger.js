const moment = require('moment-timezone');

const logger = (req, res, next) => {
    const waktuWIB = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss Z');
    console.log(`[${waktuWIB}] ${req.method} ${req.url}`);
    next();
  };
  
  module.exports = logger;
  