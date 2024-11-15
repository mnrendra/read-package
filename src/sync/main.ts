import type { Package } from '@mnrendra/types-package'

import type { Options } from '../types'

import { readSync, validateSkippedStacks } from '@mnrendra/read-stacked-json'

import { SKIPPED_STACK, TARGET_FILE } from '../consts'

/**
 * Read the `package.json` file synchronously.
 *
 * @param {Options} [options] - Optional params.
 *
 * @returns {Package} `package.json` JSON value.
 *
 * @see https://github.com/mnrendra/read-package#readme
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

export default main
