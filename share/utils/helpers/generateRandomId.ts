const RANGE = 10000

export const generateRandomId = (): number => {
  const { floor, random } = Math
  return floor(random() * RANGE)
}
