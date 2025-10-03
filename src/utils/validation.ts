export const isEmail = (value: string) => /.+@.+\..+/.test(value)
export const required = (value: unknown) =>
  value !== null && value !== undefined && `${value}`.trim().length > 0

// Common college email domains
const COLLEGE_DOMAINS = [
  '.edu',
  '.ac.uk',
  '.ac.in',
  '.edu.au',
  '.ac.za',
  '.ac.nz',
  // Add more college domains as needed
]

// Check if email belongs to a college domain
export const isCollegeEmail = (email: string): boolean => {
  if (!isEmail(email)) return false

  const emailLower = email.toLowerCase()
  return COLLEGE_DOMAINS.some(domain => emailLower.endsWith(domain))
}
