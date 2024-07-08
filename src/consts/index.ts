import { normalize } from 'node:path'

export const SCOPE = '@mnrendra'

export const NAME = 'read-package'

export const DIST_NAME = `${SCOPE}/${NAME}`

export const DIST_PATH = `node_modules/${DIST_NAME}`

export const SKIPPED_STACK = normalize(DIST_PATH)

export const TARGET_FILE = 'package'
