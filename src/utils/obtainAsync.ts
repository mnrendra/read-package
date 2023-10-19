import { resolve } from 'path'
import initPath from './initPath'
import movePath from './movePath'
import readAsync from './readAsync'
import validateData from './validateData'

/**
 * Obtain file data asynchronously.
 * @param filename File name to be obtained.
 * @returns Return the obtained file data.
 */
const obtainAsync = async (filename: string): Promise<string> => {
  // Retrieve the initial path.
  let path = initPath(filename)
  // Retrieve the initial data.
  let data = await readAsync(path)

  // While the data is undefined or invalid,
  // continue looping until a defined data is obtained.
  while (data === undefined || !validateData(data)) {
    // Retrieve the new path.
    path = movePath(path, '..')
    // Retrieve the new data.
    data = await readAsync(path)

    // Stop looping when unable to obtain the file data.
    if (path === resolve('/', filename) && (data === undefined || !validateData(data))) {
      throw new Error('Unable to obtain the file data!')
    }
  }

  // Return (resolve) the obtained data
  return data
}

// Return the `obtainAsync` as the default value.
export default obtainAsync
