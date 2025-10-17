import StringCalculator from './calculator/stringCalculator.js';
import { ERROR_PREFIX } from './util/constants.js';
import InputHandler from './view/inputHandler.js';
import OutputHandler from './view/outputHandler.js';

class App {
  async run() {
    try {
      const input = await InputHandler.read();
      const result = StringCalculator.calculate(input);
      OutputHandler.print(result);
    } catch (error) {
      if (!error) {
        OutputHandler.print(ERROR_PREFIX);
      }
      if (!error.message.startsWith(ERROR_PREFIX)) {
        error.message = `${ERROR_PREFIX}${error.message}`;
      }
      OutputHandler.printError(error.message);
      throw error;
    }
  }
}

export default App;
