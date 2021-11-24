const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('convertHandler should correctly read a whole number input', function () {
    assert.equal(convertHandler.getNum('5km'), 5);
    assert.equal(convertHandler.getNum('77gal'), 77);
    assert.equal(convertHandler.getNum('900mi'), 900);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('5.6L'), 5.6);
    assert.equal(convertHandler.getNum('90.600lbs'), 90.6);
  });

  test('convertHandler should correctly read a fractional input', function () {
    assert.equal(convertHandler.getNum('1/10km'), 0.1);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function () {
    assert.equal(convertHandler.getNum('1.1/11lbs'), 0.1);
    assert.equal(convertHandler.getNum('1/2.5L'), 0.4);
    assert.equal(convertHandler.getNum('1.25/2.5gal'), 0.5);
  });

  test('convertHandler should correctly return an error on a double-fraction', function () {
    assert.equal(convertHandler.getNum('1/2/3L'), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    assert.equal(convertHandler.getNum('kg'), 1);
    assert.equal(convertHandler.getNum('lbs'), 1);
    assert.equal(convertHandler.getNum('L'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function () {
    assert.equal(convertHandler.getUnit('1kg'), 'kg');
    assert.equal(convertHandler.getUnit('99lbs'), 'lbs');
    assert.equal(convertHandler.getUnit('5.99L'), 'L');
    assert.equal(convertHandler.getUnit('99.5gal'), 'gal');
    assert.equal(convertHandler.getUnit('5/7km'), 'km');
    assert.equal(convertHandler.getUnit('5.5/9mi'), 'mi');
  });

  test('convertHandler should correctly return an error for an invalid input unit', function () {
    assert.equal(convertHandler.getUnit('1'), 'invalid unit');
    assert.equal(convertHandler.getUnit('99.9XX'), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function () {
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('L'), 'litres');
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
  });

  test('convertHandler should correctly convert gal to L', function() {
    assert.deepEqual(convertHandler.convert(10, 'gal'), {
      initNum: 10,
      initUnit: 'gal',
      returnNum: 37.8541,
      returnUnit: 'L',
      string: '10 gallons converts to 37.8541 litres',
    });
  });
  test('convertHandler should correctly convert L to gal', function() {
    assert.deepEqual(convertHandler.convert(2.5,'L'), {
      initNum: 2.5,
      initUnit: 'L',
      returnNum: 0.66043,
      returnUnit: 'gal',
      string: '2.5 litres converts to 0.66043 gallons',
    });
  });
  test('convertHandler should correctly convert mi to km', function() {
    assert.deepEqual(convertHandler.convert(100, 'mi'), {
      initNum: 100,
      initUnit: 'mi',
      returnNum: 160.934,
      returnUnit: 'km',
      string: '100 miles converts to 160.934 kilometers',
    });
  });
  test('convertHandler should correctly convert km to mi', function() {
    assert.deepEqual(convertHandler.convert(0.5, 'km'), {
      initNum: 0.5,
      initUnit: 'km',
      returnNum: 0.31069,
      returnUnit: 'mi',
      string: '0.5 kilometers converts to 0.31069 miles',
    });
  });
  test('convertHandler should correctly convert lbs to kg', function() {
    assert.deepEqual(convertHandler.convert(9.27, 'lbs'), {
      initNum: 9.27,
      initUnit: 'lbs',
      returnNum: 4.2048,
      returnUnit: 'kg',
      string: '9.27 pounds converts to 4.2048 kilograms',
    });
  });
  test('convertHandler should correctly convert kg to lbs', function() {
    assert.deepEqual(convertHandler.convert(200, 'kg'), {
      initNum: 200,
      initUnit: 'kg',
      returnNum: 440.92488,
      returnUnit: 'lbs',
      string: '200 kilograms converts to 440.92488 pounds',
    });
  });
});