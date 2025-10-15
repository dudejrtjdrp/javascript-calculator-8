class FindSecondLastIndex {
  static find(input) {
    let count = 0;

    // 뒤에서부터 앞으로 탐색
    for (let i = input.length - 1; i >= 0; i--) {
      if (/\d/.test(input[i])) {
        count++;
        if (count === 2) {
          return i; // 뒤에서 두 번째 숫자 발견
        }
      }
    }

    return -1; // 숫자가 하나 이하이면 -1
  }
}

export default FindSecondLastIndex;
