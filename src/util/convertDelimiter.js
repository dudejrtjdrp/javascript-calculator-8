class ConvertDelimiter {
  static getDelimiterFromString(input) {
    
  }
  static findDelimiterFromString(input) {
    const nIndex = input.findIndex("\n");
    return input;
  }
  static convert(input) {
    if (input.startswith("//") && input.inlcudes("\n")) {
      this.findDelimiterFromString(input);
    }
    return input;
  }
}

export default ConvertDelimiter;
