import type { Options, Package } from '../types'

import { readSync, validateSkippedStacks } from '@mnrendra/read-stacked-json'

import { SKIPPED_STACK, TARGET_FILE } from '../consts'

/**
 * Read `package.json` file synchronously.
 *
 * @param {Options} [options] - Optional params.
 *
 * @returns {Package} `package.json` JSON value.
 */
const main = ({
  skippedStacks,
  stackTraceLimit
}: Options = {
  skippedStacks: [],
  stackTraceLimit: 10
}): Package => {
  // Validate skipped stacks.
  const validSkippedStacks = validateSkippedStacks(SKIPPED_STACK, skippedStacks)

  // Read `package.json` JSON synchronously.
  const data = readSync<Package>(TARGET_FILE, {
    skippedStacks: validSkippedStacks,
    stackTraceLimit
  })

  // Return `package.json` JSON value.
  return data
}

// Export the `main` as the default value.
export default main
