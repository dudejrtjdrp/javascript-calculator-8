import StringCalculator from "./calculator/stringCalculator";
import InputHandler from "./view/inputHandler";
import OutputHandler from "./view/outputHandler";

class App {
  async run() {
    try {
      const input = await InputHandler.read();
      const result = StringCalculator.default(input)
      OutputHandler.print(result);
    } catch (error) {
      OutputHandler.printError(error);
    }
  }
}

export default App;
