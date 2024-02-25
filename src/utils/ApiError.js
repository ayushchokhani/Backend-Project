class ApiError extends Error {
  // creating our own constructor
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    // this fn to override something or add something
    super(message)
      // overriding our message

    this.statusCode = statusCode
    this.data = null
    this.message = message, 
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
