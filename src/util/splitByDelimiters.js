import EscapeRegExp from './escapeRegExp.js';

class SplitByDelimiters {
  static split(delimiter, string) {
    const delimiterPattern = new RegExp(`${EscapeRegExp.escape(delimiter)}|,|:`);
    const splitArray = string.split(delimiterPattern);
    return splitArray;
  }
}

export default SplitByDelimiters;
