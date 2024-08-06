import { logger } from './logger';

export enum ErrorType {
  FATAL = 'Fatal',
  HANDLED = 'Handled',
}

type ErrorParams =
  | {
      msg: string;
      [key: string]: any;
    }
  | string;

export const reportCrash = (hints: ErrorParams, error: Error, type: ErrorType = ErrorType.FATAL) => {
  if (process.env.NODE_ENV === 'development') {
    const message = error.message || 'Unknown';
    logger.fatal({ type, message, error }, 'Crash detected in development mode');
  } else {
    logger.fatal({ type, error }, 'Crash detected in production mode');
    // todo: send error to your crash reporting service
    // Sentry.captureException(error, {
    //   extra:
    //     typeof hints === 'string'
    //       ? {
    //           message: hints,
    //         }
    //       : hints,
    // });
  }
};
