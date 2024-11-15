import mainAsync from './async'
import mainSync from './sync'

export type {
  Package
} from '@mnrendra/types-package'

export {
  type SkippedStacks,
  type ValidSkippedStacks,
  validateSkippedStacks
} from '@mnrendra/read-stacked-json'

export type {
  Options
} from './types'

export {
  mainAsync as readPackage,
  mainSync as readPackageSync
}
