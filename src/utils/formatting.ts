export const formatName = (name?: string) => (name ? name.trim() : '')
export const formatMessageTime = (date: Date | string) =>
  new Date(date).toLocaleTimeString()
