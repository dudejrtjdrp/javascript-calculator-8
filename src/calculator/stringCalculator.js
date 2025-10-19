import Validate from '../util/validate.js';
import { CUSTOM_CHECKED_DELIMITER } from '../util/constants.js';
import SplitByDelimiters from '../util/splitByDelimiters.js';

class StringCalculator {
  static customCalculate(input) {
    const slicedInput = input.replace(/\\n/g, '\n').slice(2);
    Validate.custom(slicedInput);
    const match = slicedInput.match(CUSTOM_CHECKED_DELIMITER);
    const customDelimiter = match[1];
    const stringNumbers = match[2];

    const numbersArray = SplitByDelimiters.split(customDelimiter, stringNumbers);

    return numbersArray;
  }

  static defaultCalculate(input) {
    Validate.default(input);
    const numbersArray = input.split(/,|:/);
    return numbersArray;
  }

  static calculate(input) {
    if (!input) return 0;

    let numbersArray = [];
    if (input.startsWith('//')) {
      numbersArray = this.customCalculate(input);
    } else {
      numbersArray = this.defaultCalculate(input);
    }

    const sum = numbersArray.reduce((total, number) => {
      Validate.validIsPoitiveNumber(number);
      return total + Number(number);
    }, 0);
    return sum;
  }
}

export default StringCalculator;
