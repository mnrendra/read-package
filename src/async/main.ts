import type { Options, Package } from '../types'

import { read, validateSkippedStacks } from '@mnrendra/read-stacked-json'

import { SKIPPED_STACK, TARGET_FILE } from '../consts'

/**
 * Read `package.json` file asynchronously.
 *
 * @param {Options} [options] - Optional params.
 *
 * @returns {Promise<Package>} `package.json` JSON value.
 */
const main = async ({
  skippedStacks,
  stackTraceLimit
}: Options = {
  skippedStacks: [],
  stackTraceLimit: 10
}): Promise<Package> => {
  // Validate skipped stacks.
  const validSkippedStacks = validateSkippedStacks(SKIPPED_STACK, skippedStacks)

  // Read `package.json` JSON asynchronously.
  const data = await read<Package>(TARGET_FILE, {
    skippedStacks: validSkippedStacks,
    stackTraceLimit
  })

  // Return `package.json` JSON value.
  return data
}

// Export the `main` as the default value.
export default main
