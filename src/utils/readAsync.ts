import { readFile } from 'fs'

/**
 * Read file asynchronously.
 * @param path File path to be read.
 * @returns Return the file data in a promise.
 */
const readAsync = async (path: string): Promise<string | undefined> => {
  // Return a promise-based function.
  return await new Promise((resolve) => {
    // Read the file asynchronously.
    readFile(path, 'utf8', (err, data) => {
      // When an error occurs, resolve as undefined.
      if (err !== null) resolve(undefined)
      // When no error occurs, resolve the file data.
      resolve(data)
    })
  })
}

// Export the `readAsync` as the default value.
export default readAsync
