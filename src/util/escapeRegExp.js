import { REGEX_SPECIAL_CHARS_PATTERN, ESCAPED_REPLACEMENT } from './constants.js';

class EscapeRegExp {
  static escape(string) {
    return string.replace(REGEX_SPECIAL_CHARS_PATTERN, ESCAPED_REPLACEMENT);
  }
}

export default EscapeRegExp;
