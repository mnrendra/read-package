import { readFileSync } from 'fs'

/**
 * Read file synchronously.
 * @param path File path to be read.
 * @returns Return the file data.
 */
const readSync = (path: string): string | undefined => {
  // Handle errors using a try-catch block.
  try {
    // Read the file synchronously.
    const data = readFileSync(path, 'utf8')
    // When no error occurs, return the file data.
    return data
  } catch (err) {
    // When an error occurs, return undefined.
    return undefined
  }
}

// Export the `readSync` as the default value.
export default readSync
