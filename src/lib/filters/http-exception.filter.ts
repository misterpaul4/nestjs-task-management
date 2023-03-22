import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let httpMessage = 'Internal Server Error';
    let httpError = 'We are unable to process this request';
    let other: Record<string, unknown> = {};

    if (exception?.code == 23503) {
      httpStatus = HttpStatus.BAD_REQUEST;
      httpMessage = 'This field is being used';
    } else if (exception?.code == 23505) {
      httpStatus = HttpStatus.CONFLICT;
      httpMessage = `This field ${exception.detail}`;
    } else if (exception?.status == 400) {
      httpStatus = HttpStatus.BAD_REQUEST;
      httpError = 'Bad Request';
      httpMessage = exception.response?.message;
      other = { ...exception?.response };
    } else if (exception?.status == 401) {
      httpStatus = HttpStatus.UNAUTHORIZED;
      httpError = 'Unauthorized';
      httpMessage = exception.response?.message;
    } else if (exception?.status == 402) {
      httpStatus = HttpStatus.PAYMENT_REQUIRED;
      httpError = exception.response?.message;
      httpMessage = exception.response?.message;
    } else if (exception?.status == 403) {
      httpStatus = HttpStatus.FORBIDDEN;
      httpError = 'Forbidden';
      httpMessage = exception.response?.message;
    } else if (exception?.status == 404) {
      httpStatus = HttpStatus.NOT_FOUND;
      httpError = 'Not Found';
      httpMessage = exception.response?.message;
    } else if (exception?.status == 409) {
      httpStatus = HttpStatus.CONFLICT;
      httpError = 'Conflict';
      httpMessage = exception.response?.message;
    }

    const responseBody = {
      statusCode: httpStatus,
      message: httpMessage,
      error: httpError,
      ...other,
    };

    response.status(httpStatus).json(responseBody);
  }
}
