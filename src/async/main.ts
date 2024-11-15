import type { Package } from '@mnrendra/types-package'

import type { Options } from '../types'

import { read, validateSkippedStacks } from '@mnrendra/read-stacked-json'

import { SKIPPED_STACK, TARGET_FILE } from '../consts'

/**
 * Read the `package.json` file asynchronously.
 *
 * @param {Options} [options] - Optional params.
 *
 * @returns {Promise<Package>} `package.json` JSON value.
 *
 * @see https://github.com/mnrendra/read-package#readme
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

export default main
