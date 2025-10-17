class EscapeRegex {
  static escape(string) {
    return string.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
  }
}

export default EscapeRegex;
