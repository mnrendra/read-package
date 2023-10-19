/**
 * Validate data from `readFile`
 * @param data Value from `readFile`
 * @returns The valid status
 */
const validateData = (
  data: string
): boolean => {
  // Try catch to handle `JSON.parse`.
  try {
    // Get the `name` value from the `data` as an object string.
    const { name } = JSON.parse(data)
    // Return `false` if the `name` value is the same with this package name.
    if (name === '@mnrendra/read-package') return false
  } catch (err) {
    // Return `false` if the error occurs.
    return false
  }

  // Return `true` if the above criteria aren't met.
  return true
}

export default validateData
