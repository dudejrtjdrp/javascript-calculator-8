import { EXCEPTION_NEWLINE } from "./constants.js";

class FindPattern {
  static splitByPatternHelper(s, pattern, result) {
    if (!s) return;

    const index = s.indexOf(pattern);
    if (index === -1) {
      result.push(s);
      return;
    }

    const head = s.slice(0, index);
    const tail = s.slice(index + pattern.length);

    if (head.length > 0) result.push(head);

    this.splitByPatternHelper(tail, pattern, result); // 재귀 호출
  }

  static splitByPattern(string, pattern) {
    if (!string) return [];

    const result = [];
    this.splitByPatternHelper(string, pattern, result);
    console.log(result);
    return result;
  }

  static find(input) {
    console.log(input);
    console.log("//\n\n1\n2\n3".split("\n"));
    let bestArray = null;
    let bestMaxLength = Infinity;
    let bestArrayLength = -1;
    let delimiter = "";

    for (let len = 1; len <= input.length; len++) {
      const pattern = input.slice(0, len);
      let candidateArray = this.splitByPattern(input, pattern);

      if (candidateArray.length === 0) continue;

      if (
        len < 2 &&
        candidateArray[0] !== "" &&
        !/^\n+/.test(candidateArray[0])
      )
        continue;

      candidateArray = candidateArray.filter((s) => s.length > 0);

      // 유효성 검사
      const allValid = candidateArray.every((s, index) => {
        if (index === 0) {
          const cleaned = s.replace(/^\n+/, "");
          return cleaned.length > 0 && !isNaN(Number(cleaned));
        } else {
          const trimmed = s.trim();
          return trimmed.length > 0 && !isNaN(Number(trimmed)) && !/\n/.test(s);
        }
      });
      // console.log(
      //   `len=${len}, pattern="${JSON.stringify(
      //     pattern
      //   )}", valid=${allValid}, array:`,
      //   candidateArray
      // );

      if (!allValid) continue;

      const maxLen = Math.max(...candidateArray.map((s) => s.length));
      const arrLength = candidateArray.length;

      if (
        arrLength > bestArrayLength ||
        (arrLength === bestArrayLength && maxLen < bestMaxLength)
      ) {
        bestMaxLength = maxLen;
        bestArrayLength = arrLength;
        bestArray = candidateArray;
        delimiter = JSON.stringify(pattern);
      }
    }

    bestArray[0] = bestArray[0].replace("\n", "");
    return bestArray;
  }
}

export default FindPattern;
