class EscapeRegex {
  static escape(string) {
    // 정규식 내에서 특수기호로 쓰일수 있는게 들어와도 문자로 받아들이게끔 변환
    return string.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
  }
}

export default EscapeRegex;
