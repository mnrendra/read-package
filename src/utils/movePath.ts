import { basename, dirname, resolve } from 'path'

/**
 * Move path.
 * @param path Path to be moved.
 * @param aim Aimed directory.
 * @returns Moved path.
 */
const movePath = (path: string, aim: string): string => {
  // Retrieve the base name.
  const base = basename(path)
  // Retrieve the directory name.
  const dir = dirname(path)
  // Move the directory.
  const movedDir = resolve(dir, aim)
  // Move the path.
  const movedPath = resolve(movedDir, base)
  // Return the moved path.
  return movedPath
}

// Export the `movePath` as the default value.
export default movePath
