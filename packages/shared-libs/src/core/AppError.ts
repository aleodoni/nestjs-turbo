import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: Error) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err,
      } as UseCaseError);
      console.log(`[AppError]: An unexpected error occurred`);
      console.log(err.message);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
