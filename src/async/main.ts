import type { Package } from '@mnrendra/types-package'

import type { Options } from '../types'

import validateSkippedStacks from '@mnrendra/validate-skipped-stacks'

import { SKIPPED_STACK, TARGET_FILE } from '../consts'

import { read } from '@mnrendra/read-stacked-json'

/**
 * Read `package.json` file asynchronously.
 *
 * @param {Object} [options] - Optional params.
 *
 * @returns {Promise<Package>} `package.json` JSON value.
 */
const main = async ({
  skippedStacks
}: Options = {
  skippedStacks: []
}): Promise<Package> => {
  // Validate skipped stacks.
  const validSkippedStacks = validateSkippedStacks(SKIPPED_STACK, skippedStacks)

  // Read `package.json` JSON asynchronously.
  const data = await read<Package>(TARGET_FILE, {
    skippedStacks: validSkippedStacks
  })

  // Return `package.json` JSON value.
  return data
}

// Export the `main` as the default value.
export default main
