import type { Package } from '@mnrendra/types-package'
import mainAsync from './mainAsync'
import mainSync from './mainSync'

export type {
  Package
}

export {
  mainAsync as readPackage,
  mainSync as readPackageSync
}
