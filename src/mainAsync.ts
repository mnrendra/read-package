import type { Package } from '@mnrendra/types-package'
import { obtainAsync } from './utils'

/**
 * Read (obtain) the `package.json` file from any directory within a
 * NodeJS module and parse it into a JSON.
 * @returns Obtained and parsed `package.json` file in a JSON format.
 */
const mainAsync = async (): Promise<Package> => {
  // Obtain file data asynchronously.
  const data = await obtainAsync('package.json')
  // Parse the obtained file data into a JSON format.
  return JSON.parse(data)
}

// Export the `mainAsync` as the default value.
export default mainAsync
