import ValidateInput from "../util/validateInput.js";
import {
  CUSTOM_CHECKED_DELIMITER,
  EXCEPTION_NEWLINE,
  INVALID_FORMAT_ERROR,
} from "../util/constants.js";
import FindLastNumberBeforeDelimiter from "../util/findLastNumberBeforeDelimiter.js";
import FindPattern from "../util/findPattern.js";

class StringCalculator {
  static customCalculate(input) {
    input = input.replace(/\\n/g, "\n").slice(2);
    ValidateInput.custom(input);
    let numbersArray = [];

    const match = input.match(CUSTOM_CHECKED_DELIMITER);
    const delimiter = match[1];
    const numbers = match[2];
    console.log(match)
    const hasDelimiterNumber = /\d/.test(delimiter);
    const countNewline = input.split(EXCEPTION_NEWLINE).length - 1;
    console.log(hasDelimiterNumber && countNewline === 1)
    if (hasDelimiterNumber && countNewline === 1) {
      numbersArray = FindLastNumberBeforeDelimiter.find(
        numbersArray,
        numbers,
        delimiter
      );
      console.log(numbersArray)
      return numbersArray;
    }
    if (countNewline > 1) {
      numbersArray = FindPattern.find(input);
      return numbersArray;
    }
    numbersArray = numbers.split(delimiter);
    if (numbersArray.includes("")) {
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

    let numbersArray = [];
    if (input.startsWith("//")) {
      numbersArray = this.customCalculate(input);
    } else {
      numbersArray = this.defaultCalculate(input);
    }

    const sum = numbersArray.reduce((acc, n) => {
      if (isNaN(n)) throw new Error(INVALID_FORMAT_ERROR);
      return acc + Number(n);
    }, 0);
    return sum; // 기본 구분자 사용
  }
}

export default StringCalculator;
