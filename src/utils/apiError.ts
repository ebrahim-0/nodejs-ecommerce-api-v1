// @desc Custom error class for handling API errors
class ApiError extends Error {
  public status: string;
  public operation: boolean;
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.operation = true;
  }
}

export default ApiError;
