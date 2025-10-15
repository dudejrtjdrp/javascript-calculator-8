import {
  CUSTOM_CHECKED_DELIMITER,
  DEFAULT_CHECKED_DELIMITER,
  EXCEPTION_NEWLINE,
} from "./constants.js";

class ValidateInput {
  static common(input) {
    if (!/\d/.test(input.at(-1))) {
      throw new Error("[ERROR] 입력 형식이 올바르지 않습니다.");
    }
  }
  static custom(input) {
    this.common(input);
    const match = input.match(CUSTOM_CHECKED_DELIMITER);

    if (!match) {
      throw new Error("[ERROR] 입력 형식이 올바르지 않습니다.");
    }

    const delimiter = match[1];
    if (delimiter === "") {
      throw new Error("[ERROR] 커스텀 구분자가 빈 문자열입니다.");
    }
  }
  static default(input) {
    this.common(input);
    if (/[^0-9,:]/.test(input) || DEFAULT_CHECKED_DELIMITER.test(input)) {
      throw new Error("[ERROR] 잘못된 구분자입니다.");
    }

    const numbersArray = input.split(/,|:/);
    const checkNegativeNumbers = numbersArray.filter((n) => n < 0);
    if (checkNegativeNumbers.length != 0) {
      throw new Error("[ERROR] 음수는 허용되지 않습니다.");
    }
  }
}

export default ValidateInput;
