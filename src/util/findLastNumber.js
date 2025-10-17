class FindLastNumber {
  static find(input) {
    let current = "";
    let lastNumber = "";

    for (const char of input) {
      if (/\d/.test(char)) {
        current += char;
      } else {
        if (current) lastNumber = current;
        current = "";
      }
    }

    if (current) lastNumber = current; // 문자열이 숫자로 끝나는 경우
    return lastNumber || null;
  }
}

export default FindLastNumber;
