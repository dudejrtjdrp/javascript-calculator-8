import { ERROR_PREFIX } from "./constants";

class CustomError extends Error {
  constructor(message) {
    super(message.startsWith(ERROR_PREFIX) ? message : `${ERROR_PREFIX} ${message}`);
    this.name = "CustomError";
  }
}

export default CustomError;