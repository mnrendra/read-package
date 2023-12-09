import type { SkippedStacks } from '../types'

import { dirname, resolve } from 'path'
import { stackTrace } from '@mnrendra/stack-trace'

const PREFIX = 'node_modules'
const SCOPE = '@mnrendra'
const NAME = 'read-package'

/**
 * Initialize path.
 * @param basename Base name (file name) to be resolved with the initialize path
 * @param skippedStacks Stack paths to be skipped (optional)
 * @returns Initialized path
 */
const initPath = (
  basename: string,
  skippedStacks: SkippedStacks = []
): string => {
  // Trace the stacks.
  const stacks = stackTrace()

  // Map the stack trace paths.
  const paths = stacks.map((stack) =>
    stack.getFileName() || `${PREFIX}/${SCOPE}/${NAME}`)

  // validate skipped stacks.
  const ignoreStacks = !Array.isArray(skippedStacks)
    ? [`${skippedStacks}`]
    : skippedStacks

  // Find the initial path.
  const path = paths.find((path) => !(
    (
      path.includes(PREFIX) &&
      path.includes(SCOPE) &&
      path.includes(NAME)
    ) || (
      ignoreStacks.some((skippedStack) => path.includes(skippedStack))
    )
  ))

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
