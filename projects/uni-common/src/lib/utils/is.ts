export const isDefined = (value: unknown): boolean => typeof value !== 'undefined';

export const isNull = (value: unknown): boolean => value === null;

export const isArray = (value: unknown): boolean => Array.isArray(value);

export const isObject = (value: unknown): boolean => typeof value === 'object' && value !== null && !isArray(value);

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
