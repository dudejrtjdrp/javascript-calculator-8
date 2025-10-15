class FindLastNumberBeforeDelimiter {
  static find(numbersArray, numbers, delimiter) {
    for (let i = 0; i < numbers.length; i++) {
      if (i == numbers.length - 1) {
        numbersArray.push(numbers);
        return numbersArray;
      }
      const isAnotherNumber =
        numbers[i] == delimiter && numbers[i + 1] != delimiter;
      const isConnectedNumber =
        i == numbers.length - 2 && numbers[i] == delimiter;

      if (isAnotherNumber || isConnectedNumber) {
        const number = numbers.slice(0, i);
        numbersArray.push(number);
        numbers = numbers.slice(i + 1);
        return this.find(numbersArray, numbers, delimiter);
      }
    }
  }
}

export default FindLastNumberBeforeDelimiter;
