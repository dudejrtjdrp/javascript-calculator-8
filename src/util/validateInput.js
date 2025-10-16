import {
  CUSTOM_CHECKED_DELIMITER,
  DEFAULT_CHECKED_DELIMITER,
  INVALID_FORMAT_ERROR,
  NEGATIVE_NUMBER_ERROR,
  EMPTY_DELIMITER_ERROR,
  INVALID_DELIMITER_ERROR,
} from "./constants.js";

class ValidateInput {
  static common(input) {
    if (!/\d/.test(input.at(-1))) {
      throw new Error(INVALID_FORMAT_ERROR);
    }
  }
  static custom(input) {
    this.common(input);
    const match = input.match(CUSTOM_CHECKED_DELIMITER);

    if (match) {
      const [, delimiter, numbersPart] = match;

      // 구분자가 아닌 다른 문자가 섞여 있으면 에러
      const invalidPattern = new RegExp(`[^0-9${delimiter}\n]`);
      if (invalidPattern.test(numbersPart)) {
        throw new Error(INVALID_DELIMITER_ERROR);
      }
    }

    if (!match) {
      throw new Error(INVALID_FORMAT_ERROR);
    }

    const delimiter = match[1];
    if (delimiter === "") {
      throw new Error(EMPTY_DELIMITER_ERROR);
    }
  }
  static default(input) {
    this.common(input);
    const numbersArray = input.split(/,|:/);
    const checkNegativeNumbers = numbersArray.filter((n) => n < 0);
    if (checkNegativeNumbers.length != 0) {
      throw new Error(NEGATIVE_NUMBER_ERROR);
    }
    if (/[^0-9,:]/.test(input) || DEFAULT_CHECKED_DELIMITER.test(input)) {
      throw new Error(INVALID_FORMAT_ERROR);
    }
  }
}

export default ValidateInput;
