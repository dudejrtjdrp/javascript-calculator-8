import {
  CUSTOM_CHECKED_DELIMITER,
  DEFAULT_CHECKED_DELIMITER,
  INVALID_FORMAT_ERROR,
  NEGATIVE_NUMBER_ERROR,
  EMPTY_DELIMITER_ERROR,
  INVALID_DELIMITER_ERROR,
  NUMBER_DELIMITER_ERROR,
  SIDE_NUMBER_DELIMITER_ERROR,
  EXCEPTION_NEWLINE,
} from "./constants.js";
import EscapeRegex from "./escapeRegex.js";

class ValidateInput {
  static common(input) {
    if (!/\d/.test(input.at(-1))) {
      throw new Error(INVALID_FORMAT_ERROR);
    }
  }
  static custom(input) {
    const match = input.match(CUSTOM_CHECKED_DELIMITER);
    if (match) {
      const [, delimiter, numbers] = match;

      const onlyDelimiterNumber = /^\d+$/.test(delimiter);
      const countNewline = input.split(EXCEPTION_NEWLINE).length - 1;

      // 구분자가 숫자로만 이루어져 있으면 에러
      if (onlyDelimiterNumber && countNewline === 1) {
        throw new Error(NUMBER_DELIMITER_ERROR);
      }

      // 구분자가 숫자로 시작하거나 끝나면 에러
      if (/^\d/.test(delimiter) || /\d$/.test(delimiter)) {
        throw new Error(SIDE_NUMBER_DELIMITER_ERROR);
      }

      // 구분자가 아닌 다른 문자가 섞여 있으면 에러
      const invalidPattern = new RegExp(
        `[^0-9\\.\\n${EscapeRegex.escape(delimiter)}]`
      );
      if (invalidPattern.test(numbers)) {
        throw new Error(INVALID_DELIMITER_ERROR);
      }
      return;
    }

    if (!match) {
      throw new Error(INVALID_FORMAT_ERROR);
    }

    const delimiter = match[1];
    if (delimiter === "") {
      throw new Error(EMPTY_DELIMITER_ERROR);
    }
    return;
  }
  static default(input) {
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
