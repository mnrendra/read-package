import type { Package } from '@mnrendra/types-package'
import mainAsync from './async'
import mainSync from './sync'

export type {
  Package
}

export {
  mainAsync as readPackage,
  mainSync as readPackageSync
}
