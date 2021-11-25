'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const { input } = req.query;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') return res.json('invalid number and unit')
    else if (initNum === 'invalid number') return res.json('invalid number');
    else if (initUnit === 'invalid unit') return res.json('invalid unit');

    const { returnNum, returnUnit, string } = convertHandler.convert(initNum, initUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });

};
