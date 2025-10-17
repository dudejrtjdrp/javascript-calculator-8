import FindLastNumber from "./findLastNumber.js";

class FindPatternTest {
  static checkFinalArray(input, numberArray, pattern) {}
  static splitByPattern(input, pattern) {
    if (!input) return [];
    return input.split(pattern);
  }
  static find(input) {
    let bestArray = null;
    let bestMaxLength = Infinity;
    let bestArrayLength = -1;
    let delimiter = "";
    let notPattern = "";

    for (let len = 1; len <= input.length; len++) {
      const pattern = input.slice(0, len);
      let candidateArray = this.splitByPattern(input, pattern);

      if (!candidateArray || candidateArray.length === 0) continue;

      if (candidateArray.filter((item) => item === "").length >= 3) {
        notPattern = pattern;
        continue;
      }

      // 0️⃣ 앞쪽 빈칸 제거 (숫자 나올 때까지)
      while (candidateArray.length > 0 && candidateArray[0].trim() === "") {
        candidateArray.shift();
      }

      if (candidateArray.length === 0) continue;

      const firstElement = candidateArray[0];

      // 0번째 요소: 숫자 또는 \n+숫자
      const firstValid = /^\n?\d/.test(firstElement);
      if (!firstValid) continue;
      // 1번째 이후 요소 검증
      let isValid = true;
      for (let i = 1; i < candidateArray.length; i++) {
        const elem = candidateArray[i].trim();

        if (elem === "") {
          isValid = false;
          break;
        }

        if (elem.length === 1) {
          if (isNaN(Number(elem))) {
            isValid = false;
            break;
          }
        } else {
          if (!/^\d/.test(elem) || !/\d$/.test(elem)) {
            isValid = false;
            break;
          }
        }
      }
      if (!isValid) continue;

      const lastNumber = FindLastNumber.find(input);

      if (pattern.length >= lastNumber.length + 3) {
        continue
      }

      // 최적 패턴 선택
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
    console.log(delimiter);
    // 안전하게 0번째 요소 '\n' 제거
    if (bestArray && bestArray.length > 0) {
      bestArray[0] = bestArray[0].replace("\n", "");
    }
    return bestArray || [];
  }
}

export default FindPatternTest;
