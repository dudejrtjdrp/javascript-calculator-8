import { ERROR_PREFIX } from './constants.js';

class CustomError extends Error {
  constructor(message) {
    super(
      message.startsWith(ERROR_PREFIX) ? message : `${ERROR_PREFIX} ${message}`,
    );
    this.name = ERROR_PREFIX;
  }
}

export default CustomError;
