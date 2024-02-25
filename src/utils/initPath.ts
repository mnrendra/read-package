import type { SkippedStacks } from '../types'

import { dirname, resolve } from 'path'

import { stackTrace } from '@mnrendra/stack-trace'

import { SKIPPED_STACK } from '../consts'

import validateSkippedStacks from './validateSkippedStacks'

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
  // Trace stacks.
  const stacks = stackTrace()

  // Map stack trace paths.
  const paths = stacks.map((stack) => stack.getFileName() || SKIPPED_STACK)

  // Validate skipped stacks.
  const validSkippedStacks = validateSkippedStacks(skippedStacks)

  // Find the initial path.
  const path = paths.find((path) => !(
    validSkippedStacks.some((skippedStack) => path.includes(skippedStack))
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
