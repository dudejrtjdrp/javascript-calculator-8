import InputHandler from "./view/inputHandler";
import OutputHandler from "./view/outputHandler";

class App {
  async run() {
    try {
      const input = await InputHandler.read();
      OutputHandler.print(input);
    } catch (error) {
      OutputHandler.printError(error);
    }
  }
}

export default App;
