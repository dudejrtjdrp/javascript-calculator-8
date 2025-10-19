import {
  DEFAULT_CHECKED_DELIMITER,
  INVALID_FORMAT_ERROR,
  NEGATIVE_NUMBER_ERROR,
  EMPTY_DELIMITER_ERROR,
  INVALID_DELIMITER_ERROR,
  NUMBER_DELIMITER_ERROR,
  SIDE_NUMBER_DELIMITER_ERROR,
  EXCEPTION_NEWLINE,
  CUSTOM_DELIMITER_PATTERN,
  POSITIVE_NUMBER_PATTERN,
  NUMBER_PATTERN,
  PREFIX_NUMBER_PATTERN,
  SUFFIX_NUMBER_PATTERN,
  NEWLINE_DELIMITER_ERROR,
} from './constants.js';
import SplitByDelimiters from './splitByDelimiters.js';

class Validate {
  static validStringIsNumber(string) {
    return POSITIVE_NUMBER_PATTERN.test(string);
  }

  // 정규식에서 기능할수도 있는 문자 치환

  static common(numbersArray) {
    numbersArray.forEach((number) => {
      // 문자열에 빈칸이 있거나 구분자 반복 사용시 에러
      if (number.trim() === '') {
        throw new Error(INVALID_FORMAT_ERROR);
      }
      // 문자열을 구분자로 나눴을때 각 요소가 숫자가 아닐 경우 에러
      if (!this.validStringIsNumber(number)) {
        throw new Error(INVALID_DELIMITER_ERROR);
      }
      // 문자열의 숫자 부분이 양수가 아닐 경우 에러
      if (Number(number) <= 0) {
        throw new Error(NEGATIVE_NUMBER_ERROR);
      }
    });
  }

  static custom(slicedInput) {
    const match = slicedInput.match(CUSTOM_DELIMITER_PATTERN);
    if (!match) {
      throw new Error(INVALID_FORMAT_ERROR);
    }

    const [, customDelimiter, stringNumbers] = match;

    // 커스텀 구분자 + 기존 구분자(쉼표와 콜론)
    const numbersArray = SplitByDelimiters.split(customDelimiter, stringNumbers);

    if (numbersArray.length === 0) {
      return 0; // 숫자가 없는 경우 0 반환
    }

    // 구분자가 빈칸일경우 에러
    if (!customDelimiter) {
      throw new Error(EMPTY_DELIMITER_ERROR);
    }

    // 구분자가 숫자로만 이루어질 경우 에러
    if (NUMBER_PATTERN.test(customDelimiter)) {
      throw new Error(NUMBER_DELIMITER_ERROR);
    }

    // 구분자가 숫자로 시작하거나 끝나면 에러
    if (
      PREFIX_NUMBER_PATTERN.test(customDelimiter) ||
      SUFFIX_NUMBER_PATTERN.test(customDelimiter)
    ) {
      throw new Error(SIDE_NUMBER_DELIMITER_ERROR);
    }

    const newlineCount = slicedInput.split(NEWLINE_DELIMITER_ERROR).length - 1;
    // 구분자에 개행문자가 포함될 경우 에러
    if (customDelimiter.includes(EXCEPTION_NEWLINE) || newlineCount > 1) {
      throw new Error(NEWLINE_DELIMITER_ERROR);
    }

    this.common(numbersArray);
  }

  static default(input) {
    // 문자열이 일반 계산기 형식에 맞지 않을때
    if (DEFAULT_CHECKED_DELIMITER.test(input)) {
      throw new Error(INVALID_FORMAT_ERROR);
    }
    const numbersArray = input.split(/,|:/);
    this.common(numbersArray);
  }

  static validIsPoitiveNumber(number) {
    if (!this.validStringIsNumber(number) && Number(number) <= 0) {
      throw new Error(INVALID_FORMAT_ERROR);
    }
  }
}

export default Validate;
