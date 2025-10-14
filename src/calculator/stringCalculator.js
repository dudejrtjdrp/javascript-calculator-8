class StringCalculator {
  static calculate(input) {
    let sum = 0;
    let numbersArray = [];
    if (!input) return 0;
    if (input.startsWith("//")) {
      input = input.replace(/\\n/g, "\n").slice(2);

      const regex = /^([\s\S]+?)\n([\s\S]*)$/;
      const match = input.match(regex);

      if (!match) {
        throw new Error("입력 형식이 올바르지 않습니다.");
      }

      const delimiter = match[1];
      numbersArray = match[2].split(delimiter);
      console.log(numbersArray);
      if (delimiter === "") {
        throw new Error("커스텀 구분자가 빈 문자열입니다.");
      }

      for (let i = 0; i <= numbersArray.length - 1; i++) {
        if (isNaN(numbersArray[i])) {
          console.log(i, numbersArray[i]);
          throw new Error("입력 형식이 올바르지 않습니다.");
        }
        sum += Number(numbersArray[i]);
      }
      return sum
    }

    if (/[^0-9,:]/.test(input) || /([,:]{2,})|^[,:]|[,:]$/.test(input)) {
      throw new Error("[ERROR] 잘못된 구분자입니다.");
    }
    numbersArray = input.split(/,|:/);

    const checkNegativeNumbers = numbersArray.filter((n) => n < 0);
    if (checkNegativeNumbers.length != 0) {
      throw new Error("[ERROR] 음수는 허용되지 않습니다.");
    }

    sum = numbersArray.reduce((acc, n) => acc + Number(n), 0);
    return sum; // 기본 구분자 사용
  }
}

export default StringCalculator;
