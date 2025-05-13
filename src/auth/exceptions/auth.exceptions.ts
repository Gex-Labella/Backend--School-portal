import { HttpException, HttpStatus } from '@nestjs/common';

export class SessionExpiredException extends HttpException {
  constructor() {
    super('Session has expired. Please login again.', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidResetTokenException extends HttpException {
  constructor() {
    super('Invalid or expired reset token', HttpStatus.BAD_REQUEST);
  }
}
