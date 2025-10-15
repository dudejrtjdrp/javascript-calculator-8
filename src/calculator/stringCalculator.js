import ValidateInput from "../util/validateInput.js";
import {
  CUSTOM_CHECKED_DELIMITER,
  EXCEPTION_NEWLINE,
} from "../util/constants.js";
import FindSecondLastIndex from "../util/findSecondLastIndex.js";
import FindLastNumberBeforeDelimiter from "../util/findLastNumberBeforeDelimiter.js";
import FindPattern from "../util/findPattern.js";

class StringCalculator {
  static customCalculate(input) {
    input = input.replace(/\\n/g, "\n").slice(2);
    let numbersArray = [];

    const match = input.match(CUSTOM_CHECKED_DELIMITER);
    const delimiter = match[1];
    const hasDelimiterNumber = /\d/.test(delimiter);
    const countNewline = input.split(EXCEPTION_NEWLINE).length - 1;
    if (hasDelimiterNumber && !countNewline) {
      console.log(delimiter);
      numbersArray = FindLastNumberBeforeDelimiter.find(
        numbersArray,
        numbers,
        delimiter
      );
      return numbersArray;
    }
    ValidateInput.custom(input);
    numbersArray = FindPattern.find(input);
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
      if (isNaN(n)) throw new Error("입력 형식이 올바르지 않습니다.");
      return acc + Number(n);
    }, 0);
    return sum; // 기본 구분자 사용
  }
}

export default StringCalculator;
