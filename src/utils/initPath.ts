import { dirname, resolve } from 'path'
import { stackTrace } from '@mnrendra/stack-trace'

/**
 * Initialize path.
 * @param basename Base name (file name) to be initialized.
 * @returns Initialized path.
 */
const initPath = (basename: string): string => {
  // Retrieve the first stack traces.
  const [stack] = stackTrace()
  // Retrieve the file name (path) of the first stack traces.
  const path = stack.getFileName()
  // Retrieve the directory name of the file name (path).
  const dir = dirname(path as string)
  // Initialize the initial path.
  const initialpath = resolve(dir, basename)
  // Return the initialized path.
  return initialpath
}

// Export the `initPath` as the default value.
export default initPath
