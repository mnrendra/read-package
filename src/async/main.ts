import type { Package } from '@mnrendra/types-package'
import type { Options } from '../types'

import { resolve } from 'path'
import { initPath, movePath } from '../utils'
import read from './read'

const TARGET_FILE = 'package.json'

/**
 * Read `package.json` file asynchronously.
 * @returns `package.json` value.
 */
const main = async ({
  skippedStacks
}: Options = {
  skippedStacks: []
}): Promise<Package> => {
  // Initialize path.
  let path = initPath(TARGET_FILE, skippedStacks)
  // Read initial path.
  let data = await read(path)

  // Looping when data is `undefined`.
  while (!data) {
    // Move to the next path.
    path = movePath(path, '..')
    // Read the next path.
    data = await read(path)

    // Stop looping when unable to obtain the file data.
    if (path === resolve('/', TARGET_FILE) && !data) {
      throw new Error('Unable to obtain the file data!')
    }
  }

  // Return the parsed data.
  return JSON.parse(data)
}

// Export `main` as the default value.
export default main
