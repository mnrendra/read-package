import type { SkippedStacks, ValidSkippedStacks } from '../types'

import { SKIPPED_STACK } from '../consts'

/**
 * Validate skipped stacks.
 * @param skippedStacks Skipped stacks (optional)
 * @returns Valid skipped stacks
 */
const validateSkippedStacks = (
  skippedStacks: SkippedStacks = []
): ValidSkippedStacks => {
  // Validate skipped stacks.
  const validSkippedStacks = !Array.isArray(skippedStacks)
    ? [skippedStacks]
    : skippedStacks

  // Add this module name as the first element of `validSkippedStacks`.
  validSkippedStacks.unshift(SKIPPED_STACK)

  // Return valid skipped stacks.
  return validSkippedStacks
}

// Export the `validateSkippedStacks` as the default value.
export default validateSkippedStacks
