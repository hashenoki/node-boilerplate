import type { ZodType, ParseParams } from 'zod';

import { ValidationError } from './custom-error';

export const validate = <T, S, P>(value: unknown, struct: ZodType<T, S, P>, params?: ParseParams) => {
  const result = struct.safeParse(value, params);
  if (result.success) {
    return result.data;
  }

  throw new ValidationError(
    result.error.message,
    result.error.issues.map((item) => item.message),
  );
};
