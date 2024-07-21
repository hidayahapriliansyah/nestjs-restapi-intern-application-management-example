abstract class APIResponse {
  constructor(public readonly success: boolean, public readonly message: string) { }
}

export class SuccessAPIResponse<T extends object | []> extends APIResponse {
  constructor(message: string, public readonly data?: T) {
    super(true, message);
  }
}

export class ErrorAPIResponse extends APIResponse {
  constructor(message: string, private errors: any) {
    super(false, message);
  }
}