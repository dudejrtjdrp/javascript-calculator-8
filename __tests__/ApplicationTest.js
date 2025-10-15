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

describe("문자열 계산기 통합 테스트", () => {
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
      ["//\n3\n\n1\n3\n2\n3\n3", "결과 : 15"],
    ])("입력: %s → %s", async (input, expected) => {
      mockQuestions([input]);
      const logSpy = getLogSpy();
      const app = new App();
      await app.run();
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
    });
  });

  describe("✅ 커스텀 구분자 + 개행 + 숫자", () => {
    test("//\n3\n\n1\n3\n2\n3\n3 → 15", async () => {
      mockQuestions(["//\n3\n\n1\n3\n2\n3\n3"]);
      const logSpy = getLogSpy();
      const app = new App();
      await app.run();
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("결과 : 15"));
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

    test("process.exit 호출되지 않아야 함", async () => {
      mockQuestions(["//;\n1;2;3"]);
      const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
      const app = new App();
      await app.run();
      expect(exitSpy).not.toHaveBeenCalled();
      exitSpy.mockRestore();
    });
  });
});
