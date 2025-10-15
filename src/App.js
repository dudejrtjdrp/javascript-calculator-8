import StringCalculator from "./calculator/stringCalculator.js";
import FindPattern from "./util/findPattern.js";
import InputHandler from "./view/inputHandler.js";
import OutputHandler from "./view/outputHandler.js";

class App {
  async run() {
    try {
      const input = await InputHandler.read();
      // FindPattern.find(input)
      const result = StringCalculator.calculate(input);
      OutputHandler.print(result);
    } catch (error) {
      OutputHandler.printError(error);
    }
  }
}

export default App;
