import type { Package } from '@mnrendra/types-package'
import type { Options } from './types'

import mainAsync from './async'
import mainSync from './sync'

export type {
  Package,
  Options
}

export {
  mainAsync as readPackage,
  mainSync as readPackageSync
}
