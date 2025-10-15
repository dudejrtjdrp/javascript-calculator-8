import ValidateInput from "../util/validateInput.js";
import {
  CUSTOM_CHECKED_DELIMITER,
  EXCEPTION_NEWLINE,
} from "../util/constants.js";
import FindSecondLastIndex from "../util/findSecondLastIndex.js";
import FindLastNumberBeforeDelimiter from "../util/findLastNumberBeforeDelimiter.js";

class StringCalculator {
  static customCalculate(input) {
    input = input.replace(/\\n/g, "\n").slice(2);

    ValidateInput.custom(input);
    let delimiter = "";
    let numbersArray = [];

    // 만약 개행문자가 커스텀 구분자로 들어올 경우 뒤의 숫자로 구분자 역추적
    const countNewline = input.split(EXCEPTION_NEWLINE).length - 1;
    if (countNewline > 1) {
      input = JSON.stringify(input).replaceAll('"', "");
      const secondLastNumberIndex = FindSecondLastIndex.find(input);
      delimiter = input.slice(secondLastNumberIndex + 1, -1);
      input = input.replace(delimiter, "").slice(2);
      numbersArray = input.split(delimiter);
      return numbersArray;
    }

    const match = input.match(CUSTOM_CHECKED_DELIMITER);

    delimiter = match[1];

    //만약 숫자가 커스텀 구분자로 들어올 경우 개행문자 뒤로 구분자로 받은 숫자와
    //다른 숫자가 등장하기 전까지 쭉 찾은 후에 구분자 숫자 나올 경우에 구분
    const hasDelimiterNumber = /\d/.test(delimiter);
    if (hasDelimiterNumber) {
      console.log(delimiter);
      const numbers = match[2];
      numbersArray = FindLastNumberBeforeDelimiter.find(numbersArray, numbers, delimiter);
      return numbersArray;
    }

    numbersArray = match[2].split(delimiter);
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
