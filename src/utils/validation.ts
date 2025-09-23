export const isEmail = (value: string) => /.+@.+\..+/.test(value)
export const required = (value: unknown) =>
  value !== null && value !== undefined && `${value}`.trim().length > 0
