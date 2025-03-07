export type MutateFn<T> = (
  data: T | Promise<T> | ((currentData?: T) => T | Promise<T>),
  shouldRevalidate?: boolean
) => Promise<T | undefined>;
