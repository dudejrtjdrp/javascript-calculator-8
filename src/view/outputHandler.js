import { Console } from '@woowacourse/mission-utils';

class OutputHandler {
  static print(result) {
    Console.print(`결과 : ${result}`);
  }

  static printError(error) {
    Console.print(`[ERROR] ${error.message}`);
  }
}

export default OutputHandler;