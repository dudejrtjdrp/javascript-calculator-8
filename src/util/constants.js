export const CUSTOM_CHECKED_DELIMITER = /^([\s\S]+?)\n([\s\S]*)$/;
export const DEFAULT_CHECKED_DELIMITER = /([,:]{2,})|^[,:]|[,:]$/;
export const EXCEPTION_NEWLINE = '\n';
export const ERROR_PREFIX = '[ERROR]';
export const INVALID_FORMAT_ERROR = '[ERROR] 입력 형식이 올바르지 않습니다.';
export const NEGATIVE_NUMBER_ERROR = '[ERROR] 숫자는 양수만 허용됩니다.';
export const EMPTY_DELIMITER_ERROR = '[ERROR] 커스텀 구분자가 빈 문자열입니다.';
export const NUMBER_DELIMITER_ERROR = '[ERROR] 커스텀 구분자는 숫자로만 구성할 수 없습니다.';
export const SIDE_NUMBER_DELIMITER_ERROR =
  '[ERROR] 커스텀 구분자는 숫자로 시작하거나 끝날수 없습니다.';
export const NEWLINE_DELIMITER_ERROR = '[ERROR] 커스텀 구분자에 개행문자가 포함될 수 없습니다.';
export const INVALID_DELIMITER_ERROR = '[ERROR] 문자열에 구분자 외의 문자가 포함되어 있습니다.';

export const CUSTOM_DELIMITER_PATTERN = /^([\s\S]+?)\n([\s\S]*)$/;
export const POSITIVE_NUMBER_PATTERN = /^(0|[1-9]\d*)(\.\d+)?$/;
export const NUMBER_PATTERN = /^\d+$/;
export const PREFIX_NUMBER_PATTERN = /^\d/;
export const SUFFIX_NUMBER_PATTERN = /\d$/;

export const REGEX_SPECIAL_CHARS_PATTERN = /[.*+?^${}()|[\]\\]/g;
export const ESCAPED_REPLACEMENT = '\\$&';
