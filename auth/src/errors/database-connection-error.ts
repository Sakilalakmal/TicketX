import { CustomError } from "./custom-error.js";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "DatabaseConnectionError";
  constructor() {
    super('Database connection error');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
