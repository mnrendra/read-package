import { dirname, resolve } from 'path'
import { stackTrace } from '@mnrendra/stack-trace'

const EXCLUDE_STACK = '/node_modules/@mnrendra/read-package'

/**
 * Initialize path.
 * @param basename Base name (file name) to be resolved with the initialize path
 * @returns Initialized path
 */
const initPath = (basename: string): string => {
  // Trace the stacks.
  const stacks = stackTrace()
  // Map the stack trace paths.
  const paths = stacks.map((stack) => stack.getFileName() || EXCLUDE_STACK)
  // Find the initial path.
  const path = paths.find((path) => !path.includes(EXCLUDE_STACK))
  // Throw an error if the path is undefined.
  if (!path) throw new Error('Unable to obtain the initial path!')
  // Get the directory name.
  const dir = dirname(path)
  // Resolve the initial path.
  const initialPath = resolve(dir, basename)
  // Return the initialized path.
  return initialPath
}

// Export the `initPath` as the default value.
export default initPath
