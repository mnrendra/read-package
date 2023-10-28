import { resolve } from 'path'
import type { Package } from '@mnrendra/types-package'

import { initPath, movePath, validateData } from '../utils'

import read from './read'

const TARGET_FILE = 'package.json'

/**
 * Read `package.json` file asynchronously.
 * @param filename File name (default: `package.json`)
 * @returns `package.json` file.
 */
const main = async (): Promise<Package> => {
  // Initialize path.
  let path = initPath(TARGET_FILE)
  // Read initial path.
  let data = await read(path)

  // Looping when data is undefined or invalid.
  while (data === undefined || !validateData(data)) {
    // Move to the next path.
    path = movePath(path, '..')
    // Read the next path.
    data = await read(path)

    // Stop looping when unable to obtain the file data.
    if (path === resolve('/', TARGET_FILE) && (data === undefined || !validateData(data))) {
      throw new Error('Unable to obtain the file data!')
    }
  }

  // Return the parsed data.
  return JSON.parse(data)
}

// Export `main` as the default value.
export default main
