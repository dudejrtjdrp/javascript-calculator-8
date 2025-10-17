import ValidateInput from '../util/validateInput.js';
import {
  CUSTOM_CHECKED_DELIMITER,
  EXCEPTION_NEWLINE,
  INVALID_FORMAT_ERROR,
} from '../util/constants.js';
import FindPattern from '../util/findPattern.js';

class StringCalculator {
  static customCalculate(input) {
    const slicedInput = input.replace(/\\n/g, '\n').slice(2);

    ValidateInput.custom(slicedInput);

    const match = slicedInput.match(CUSTOM_CHECKED_DELIMITER);
    const delimiter = match[1];
    const numbers = match[2];
    const countNewline = slicedInput.split(EXCEPTION_NEWLINE).length - 1;
    let numbersArray = [];

    // 구분자에 개행문자가 들어갈 경우
    if (countNewline > 1) {
      numbersArray = FindPattern.find(slicedInput);
      return numbersArray;
    }
    numbersArray = numbers.split(delimiter);

    // 개행문자가 반복되어 split시 배열에 빈칸이 생긴 경우
    if (numbersArray.includes('')) {
      throw new Error(INVALID_FORMAT_ERROR);
    }
    return numbersArray;
  }

  static defaultCalculate(input) {
    ValidateInput.default(input);
    const numbersArray = input.split(/,|:/);
    return numbersArray;
  }

  static calculate(input) {
    if (!input) return 0;
    ValidateInput.common(input);

    let numbersArray = [];
    if (input.startsWith('//')) {
      numbersArray = this.customCalculate(input);
    } else {
      numbersArray = this.defaultCalculate(input);
    }

    const sum = numbersArray.reduce((acc, n) => {
      if (Number.isNaN(Number(n))) {
        throw new Error(INVALID_FORMAT_ERROR);
      }
      return acc + Number(n);
    }, 0);
    return sum; // 기본 구분자 사용
  }
}

export default StringCalculator;
