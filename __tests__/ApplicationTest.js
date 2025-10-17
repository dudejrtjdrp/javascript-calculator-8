import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("기본 구분자 테스트 (, :)", () => {
  test.each([
    ["1,2,3", "결과 : 6"],
    ["1,2:3", "결과 : 6"],
    ["1:2,3", "결과 : 6"],
    ["1:2:3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});

describe("커스텀 구분자 테스트", () => {
  test.each([
    ["//;\n1;2;3", "결과 : 6"],
    ["//-\n10-20-30", "결과 : 60"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});

describe("커스텀 복잡한 구분자 테스트", () => {
  test.each([
    ["//;\n1;2;3", "결과 : 6"],
    ["//-\n10-20-30", "결과 : 60"],
    ["//***\n1***2***3", "결과 : 6"],
    ["//@@@@\n1@@@@2@@@@3", "결과 : 6"],
    ["//---===---\n1---===---2---===---3", "결과 : 6"],
    ["//$$$$%%\n1$$$$%%2$$$$%%3", "결과 : 6"],
    ["//^^^&&&^^^\n1^^^&&&^^^2^^^&&&^^^3", "결과 : 6"],
    ["//<>><<>><>\n1<>><<>><>2<>><<>><>3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});

describe("커스텀 구분자 + 개행", () => {
  test.each([["//\n\n1\n2\n3", "결과 : 6"]])(
    "입력: %s → %s",
    async (input, expected) => {
      mockQuestions([input]);
      const logSpy = getLogSpy();
      const app = new App();
      await app.run();
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
    }
  );
});

test("커스텀 구분자 사용", async () => {
  const inputs = ["//;\\n1"];
  mockQuestions(inputs);

  const logSpy = getLogSpy();
  const outputs = ["결과 : 1"];

  const app = new App();
  await app.run();

  outputs.forEach((output) => {
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
  });
});

test("커스텀 구분자 사용", async () => {
  // 커스텀 구분자가 문자열일 때
  const inputs = ["//pp\\n1pp2"];
  mockQuestions(inputs);

  const logSpy = getLogSpy();
  const outputs = ["결과 : 3"];

  const app = new App();
  await app.run();

  outputs.forEach((output) => {
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
  });
});

test("커스텀 구분자 사용", async () => {
  // 커스텀 구분자가 특수문자일 때
  const inputs = ["//*\\n1*2"];
  mockQuestions(inputs);

  const logSpy = getLogSpy();
  const outputs = ["결과 : 3"];

  const app = new App();
  await app.run();

  outputs.forEach((output) => {
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
  });
});

test("커스텀 구분자 사용", async () => {
  const inputs = ["//;\\n1"];
  mockQuestions(inputs);

  const logSpy = getLogSpy();
  const outputs = ["결과 : 1"];

  const app = new App();
  await app.run();

  outputs.forEach((output) => {
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
  });
});
describe("예외 및 종료 테스트", () => {
  test("빈 문자열 → 0 출력", async () => {
    mockQuestions([""]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("결과 : 0"));
  });

  test("음수 입력 → [ERROR]", async () => {
    mockQuestions(["-1,2,3"]);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("문자 포함 → [ERROR]", async () => {
    mockQuestions(["1,a,3"]);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("잘못된 커스텀 형식 → [ERROR]", async () => {
    mockQuestions(["//;\n1;2,3"]);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("예외 테스트", async () => {
    const inputs = ["-1,2,3"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("예외 테스트", async () => {
    const inputs = ["//p\n1p2p//pp\\n1pp2"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("예외 테스트", async () => {
    const inputs = ["//**\n1**2**//p\\n1p2"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("예외 테스트", async () => {
    const inputs = ["//**\n1**2**//*\\n1*2"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("예외 테스트", async () => {
    const inputs = ["////\n///\n"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("예외 테스트", async () => {
    // 공백문자가 있을때
    const inputs = ["1,2,3, ''"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("예외 테스트", async () => {
    // 다른 문자열이 들어가있을 떄
    const inputs = ["1,2,3,;"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("예외 테스트", async () => {
    // 숫자 끝에 소수점이 들어갔을 때
    const inputs = ["1,2,3."];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow("[ERROR]");
  });
});

describe("정규식 특수문자 - 정상 처리되어야 함", () => {
  test.each([
    ["//.\n1.2.3", "결과 : 6"],
    ["//*\n1*2*3", "결과 : 6"],
    ["//+\n1+2+3", "결과 : 6"],
    ["//?\n1?2?3", "결과 : 6"],
    ["//^\n1^2^3", "결과 : 6"],
    ["//$\n1$2$3", "결과 : 6"],
    ["//|\n1|2|3", "결과 : 6"],
    ["//[\n1[2[3", "결과 : 6"],
    ["//]\n1]2]3", "결과 : 6"],
    ["//(\n1(2(3", "결과 : 6"],
    ["//)\n1)2)3", "결과 : 6"],
    ["//{\n1{2{3", "결과 : 6"],
    ["//}\n1}2}3", "결과 : 6"],
    ["//\\\n1\\2\\3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});

describe("다중 문자 패턴 - 정상 처리되어야 함", () => {
  test.each([
    ["//###\n1###2###3", "결과 : 6"],
    ["//ABCABC\n1ABCABC2ABCABC3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});

describe("특수 문자 조합 - 정상 처리되어야 함", () => {
  test.each([
    ["//!@#\n1!@#2!@#3", "결과 : 6"],
    ["//<>\n1<>2<>3", "결과 : 6"],
    ["//~`\n1~`2~`3", "결과 : 6"],
    ["//%^\n1%^2%^3", "결과 : 6"],
    ["//&*\n1&*2&*3", "결과 : 6"],
    ["//=+\n1=+2=+3", "결과 : 6"],
    ["//{}[]\n1{}[]2{}[]3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});

describe("유니코드 문자 - 정상 처리되어야 함", () => {
  test.each([
    ["//😀\n1😀2😀3", "결과 : 6"],
    ["//가\n1가2가3", "결과 : 6"],
    ["//中\n1中2中3", "결과 : 6"],
    ["//™\n1™2™3", "결과 : 6"],
    ["//€\n1€2€3", "결과 : 6"],
    ["//°\n1°2°3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});

describe("공백 구분자 - 정상 처리되어야 함", () => {
  test.each([
    ["// \n1 2 3", "결과 : 6"],
    ["//  \n1  2  3", "결과 : 6"],
    ["// _ \n1 _ 2 _ 3", "결과 : 6"],
    ["//   \n1   2   3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});

describe("구분자가 숫자로 시작 - 오류 발생해야 함", () => {
  test.each([["//3a\n13a23a3"], ["//7x\n17x27x37x4"]])(
    "입력: %s → [ERROR]",
    async (input) => {
      mockQuestions([input]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR]");
    }
  );
});

//예외처리해야됌
describe("개행 문자 혼합 - 오류 발생해야 함", () => {
  test("입력: //\\n\\n\\n1\\n2\\n3 → [ERROR]", async () => {
    mockQuestions(["//\n\n\n1\n2\n3"]);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  describe("중첩 구분자 선언 - 오류 발생해야 함", () => {
    test.each([["//a\n1a2a//aa\n1aa2"], ["//;\n1;2;//;;\n1;;2"]])(
      "입력: %s → [ERROR]",
      async (input) => {
        mockQuestions([input]);
        const app = new App();
        await expect(app.run()).rejects.toThrow("[ERROR]");
      }
    );
  });

  describe("빈 데이터 / 경계 케이스 - 오류 발생해야 함", () => {
    test.each([
      ["//;\n"],
      ["//;\n;"],
      ["//;\n1;;2"],
      ["//;\n;1;2;"],
      ["//;\n;;;"],
    ])("입력: %s → [ERROR]", async (input) => {
      mockQuestions([input]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });
  });

  describe("혼합 구분자 - 오류 발생해야 함", () => {
    test.each([["//|\n1|2/3"], ["//:\n1:2::3"]])(
      "입력: %s → [ERROR]",
      async (input) => {
        mockQuestions([input]);
        const app = new App();
        await expect(app.run()).rejects.toThrow("[ERROR]");
      }
    );
  });

  describe("복합 엣지 케이스 - 오류 발생해야 함", () => {
    test.each([
      ["//--\n1--2--//--\n1--2"],
      ["//;;\n1;;2;;;;3"],
      ["//abc\n1abc2abcabc3"],
      ["//123\n112323123"],
      ["//..\n1..2....3"],
      ["//***\n1***2**3*4"],
    ])("입력: %s → [ERROR]", async (input) => {
      mockQuestions([input]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });
  });
});

describe("구분자가 숫자로 시작/끝남 - 모두 오류", () => {
  test.each([
    // 숫자로 시작
    ["//123#\n1123#2123#3"],
    ["//7x\n17x27x3"],
    ["//3a\n13a23a3"],

    // 숫자로 끝남
    ["//#123\n1#1232#1233"],
    ["//x7\n1x72x73"],
    ["//a3\n1a32a33"],

    // 순수 숫자
    ["//123\n112323123"],
    ["//1\n111213"],
  ])("입력: %s → [ERROR]", async (input) => {
    mockQuestions([input]);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });
});

describe("구분자 중간에만 숫자 - 정상 처리", () => {
  test.each([
    ["//#123#\n1#123#2#123#3", "결과 : 6"],
    ["//a1b\n1a1b2a1b3", "결과 : 6"],
    ["//x7y\n1x7y2x7y3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});

test.each([
   [
      "//abcdefghijklmnopqrstuvwxyz\n1abcdefghijklmnopqrstuvwxyz2abcdefghijklmnopqrstuvwxyz3",
      "결과 : 6",
    ],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });

describe("추가 엣지 케이스 ", () => {
  // 극단적으로 긴 구분자
  test.each([
    ["//1234567890\n1123456789023456789034567890", "[ERROR]"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });
  test.each([["//--\n\n1--2--3"]])(
    "입력: %s → [ERROR]",
    async (input) => {
      mockQuestions([input]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR]");
    }
  );

  // 연속 구분자 → 빈 값
  test.each([["1,,2,3"], ["//;\n1;;2;3"]])(
    "입력: %s → [ERROR]",
    async (input) => {
      mockQuestions([input]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR]");
    }
  );

  // 숫자+문자 혼합 구분자
  test.each([
    ["//1a\n11a21a3"], // 숫자로 시작 → [ERROR]
    ["//a1\n1a12a13"], // 숫자로 끝 → [ERROR]
  ])("입력: %s → [ERROR]", async (input) => {
    mockQuestions([input]);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  // 특수문자 + 중첩 구분자
  test.each([["//**\n1**2**//\n3"], ["//++\n1++2+3"]])(
    "입력: %s → [ERROR]",
    async (input) => {
      mockQuestions([input]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR]");
    }
  );

  // 숫자 끝에 공백/문자
  test.each([["1,2,3 "], ["1,2,3a"], ["//;\n1;2;3 "]])(
    "입력: %s → [ERROR]",
    async (input) => {
      mockQuestions([input]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR]");
    }
  );
});

describe("추가 엣지 케이스 - 정상 처리되어야 함", () => {
  // 구분자에 공백 포함 (정상 처리)
  test.each([
    ["//_ \n1_ 2_ 3", "결과 : 6"],
    ["//  \n1  2  3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });

  // 유니코드 포함
  test.each([
    ["//😀\n1😀2😀3", "결과 : 6"],
    ["//中\n1中2中3", "결과 : 6"],
    ["//™\n1™2™3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });

  // 숫자가 구분자 중간에만 있는 경우
  test.each([
    ["//#123#\n1#123#2#123#3", "결과 : 6"],
    ["//a1b\n1a1b2a1b3", "결과 : 6"],
    ["//x7y\n1x7y2x7y3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});
