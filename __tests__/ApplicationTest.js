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

describe("✅ 기본 구분자 테스트 (, :)", () => {
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

describe("✅ 커스텀 구분자 테스트", () => {
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

describe("✅ 커스텀 복잡한 구분자 테스트", () => {
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

describe("✅ 커스텀 구분자 + 숫자 조합", () => {
  test.each([
    ["//3\n132333", "결과 : 27"],
    ["//2\n12234", "결과 : 46"],
    ["//1\n11112", "결과 : 113"],
    ["//4\n14244", "결과 : 7"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});

describe("✅ 커스텀 구분자 + 개행", () => {
  test.each([
    ["//\n\n1\n2\n3", "결과 : 6"],
    ["//\n3\n\n1\n3\n2\n3\n3", "결과 : 6"],
  ])("입력: %s → %s", async (input, expected) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
  });
});

describe("✅ 커스텀 구분자 + 개행 + 숫자", () => {
  test("//\n3\n\n1\n3\n2\n3\n3 → 6", async () => {
    mockQuestions(["//\n3\n\n1\n3\n2\n3\n3"]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("결과 : 6"));
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
  // 구분자가 숫자일 때
  const inputs = ["//3\\n13234"];
  mockQuestions(inputs);

  const logSpy = getLogSpy();
  const outputs = ["결과 : 7"];

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
describe("❌ 예외 및 종료 테스트", () => {
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

describe("✅ 정규식 특수문자 - 정상 처리되어야 함", () => {
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

describe("✅ 다중 문자 패턴 - 정상 처리되어야 함", () => {
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

describe("✅ 특수 문자 조합 - 정상 처리되어야 함", () => {
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

describe("✅ 유니코드 문자 - 정상 처리되어야 함", () => {
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

describe("✅ 공백 구분자 - 정상 처리되어야 함", () => {
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

describe("❌ 구분자에 숫자 포함 - 오류 발생해야 함", () => {
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
describe("❌ 개행 문자 혼합 - 오류 발생해야 함", () => {
  test("입력: //\\n\\n\\n1\\n2\\n3 → [ERROR]", async () => {
    mockQuestions(["//\n\n\n1\n2\n3"]);
    const app = new App();
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  describe("❌ 중첩 구분자 선언 - 오류 발생해야 함", () => {
    test.each([["//a\n1a2a//aa\n1aa2"], ["//;\n1;2;//;;\n1;;2"]])(
      "입력: %s → [ERROR]",
      async (input) => {
        mockQuestions([input]);
        const app = new App();
        await expect(app.run()).rejects.toThrow("[ERROR]");
      }
    );
  });

  describe("❌ 빈 데이터 / 경계 케이스 - 오류 발생해야 함", () => {
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


  describe("❌ 혼합 구분자 - 오류 발생해야 함", () => {
    test.each([["//|\n1|2/3"], ["//:\n1:2::3"]])(
      "입력: %s → [ERROR]",
      async (input) => {
        mockQuestions([input]);
        const app = new App();
        await expect(app.run()).rejects.toThrow("[ERROR]");
      }
    );
  });

  describe("❌ NULL 바이트 / 제어문자 - 오류 발생해야 함", () => {
    test("입력: NULL 바이트 구분자 → [ERROR]", async () => {
      const nullByteInput = "//\x00\n1\x00" + "2\x00" + "3";
      mockQuestions([nullByteInput]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });

    test("입력: 유니코드 NULL 구분자 → [ERROR]", async () => {
      mockQuestions(["//\u0000\n1\u00002"]);
      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });
  });

  // 예외처리해야됌 - 구분자가 ! 하나여도 !! 뒤에 두개반복되서 오면 인지를 못함
  // //;;\n1;;2;;;;3
  // //abc\n1abc2abcabc3
  // //123\n112323123
  // 받은 input에서 //랑 \n이랑 모든 delimiter를 replaceAll로 바꿔줌
  // 근데 숫자만 남는게 아니면 throw error어떰?


  // //123\n112323123 지금 얘랑 null만 문제임 이거 해결해야댐
  describe("❌ 복합 엣지 케이스 - 오류 발생해야 함", () => {
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
