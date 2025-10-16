process.on("uncaughtException", (error) => {
  if (error.message.startsWith("[ERROR]")) {
  } else {
    console.error(error);
  }
});

import StringCalculator from "./calculator/stringCalculator.js";
import FindPattern from "./util/findPattern.js";
import InputHandler from "./view/inputHandler.js";
import OutputHandler from "./view/outputHandler.js";

class App {
  async run() {
    const input = await InputHandler.read();
    try {
      const result = StringCalculator.calculate(input);
      OutputHandler.print(result);
    } catch (error) {
      OutputHandler.printError(error);
      throw error;
    }
  }
}

export default App;
