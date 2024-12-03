import { Struct, StructError, assert, validate as sup } from 'superstruct';

import { ValidationError } from './custom-error';

export const validate = <T, S>(
  value: unknown,
  struct: Struct<T, S>,
  options?: {
    coerce?: boolean;
    mask?: boolean;
    message?: string;
  },
) => {
  const [error, res] = sup(value, struct, options);

  if (error) {
    throw new ValidationError(
      error.message,
      error.failures().map((item) => `${item.key} ${item.message}`),
    );
  }
  return res;
};
