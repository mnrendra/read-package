import type { Package } from '@mnrendra/types-package'
import { obtainSync } from './utils'

/**
 * Read (obtain) the `package.json` file from any directory within a
 * NodeJS module and parse it into a JSON.
 * @returns Obtained and parsed `package.json` file in a JSON format.
 */
const mainSync = (): Package => {
  // Obtain file data synchronously.
  const data = obtainSync('package.json')
  // Parse the obtained file data into a JSON format.
  return JSON.parse(data)
}

// Export the `mainSync` as the default value.
export default mainSync
