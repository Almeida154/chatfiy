class ErrorHandler extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }
}

export { ErrorHandler };
