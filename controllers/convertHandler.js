const allowedUnits = [
  'kg', 'lbs', 'L', 'gal', 'km', 'mi',
];
const spelledUnits = [
  'kilograms', 'pounds', 'litres', 'gallons', 'kilometers', 'miles',
];

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const constants = [
  1 / lbsToKg,
  lbsToKg,
  1 / galToL,
  galToL,
  1 / miToKm,
  miToKm,
]

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    result = input.match(/^[0-9.\/]*/)[0];
    if (result.replace(/\//, '').indexOf('/') > -1) return 'invalid number';
    if (result === '') return 1;
    if (result.indexOf('/') > -1) {
      const [ num, denum ] = result.split('/');
      result = num / denum;
    } else result = +result;
    return (result);
  };
  
  this.getUnit = function(input) {
    let result;
    result = input.match(/[a-zA-Z]*$/);
    if (result && result.length) result = result[0];
    if (!result || allowedUnits.indexOf(result) === -1) return 'invalid unit';
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const index = allowedUnits.indexOf(initUnit);
    if (index === -1) return 'invalid unit';
    if (index % 2) result = allowedUnits[index - 1];
    else result = allowedUnits[index + 1];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const index = allowedUnits.indexOf(unit);
    if (index === -1) return 'invalid unit';
    result = spelledUnits[index];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    let result;
    const index = allowedUnits.indexOf(initUnit);
    const factor = constants[index]
    const returnNum = Math.round(100000 * factor * initNum) / 100000;
    const returnUnit = this.getReturnUnit(initUnit);
    const string = this.getString(initNum, initUnit, returnNum, returnUnit);
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    };
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
