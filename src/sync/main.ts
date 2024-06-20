import type { Package } from '@mnrendra/types-package'

import type { Options } from '../types'

import validateSkippedStacks from '@mnrendra/validate-skipped-stacks'

import { SKIPPED_STACK, TARGET_FILE } from '../consts'

import { readSync } from '@mnrendra/read-stacked-json'

/**
 * Read `package.json` file synchronously.
 *
 * @param {Object} [options] - Optional params.
 *
 * @returns {Package} `package.json` JSON value.
 */
const main = ({
  skippedStacks
}: Options = {
  skippedStacks: []
}): Package => {
  // Validate skipped stacks.
  const validSkippedStacks = validateSkippedStacks(SKIPPED_STACK, skippedStacks)

  // Read `package.json` JSON synchronously.
  const data = readSync<Package>(TARGET_FILE, {
    skippedStacks: validSkippedStacks
  })

  // Return `package.json` JSON value.
  return data
}

// Export the `main` as the default value.
export default main
