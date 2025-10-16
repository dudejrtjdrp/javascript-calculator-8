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
