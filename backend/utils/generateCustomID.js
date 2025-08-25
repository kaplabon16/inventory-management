export const generateCustomID = (prefix='INV') => {
  return `${prefix}-${Date.now().toString(36)}-${Math.floor(Math.random()*1000)}`
}
