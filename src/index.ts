import { validateSkippedStacks } from '@mnrendra/read-stacked-json'

import mainAsync from './async'
import mainSync from './sync'

export type {
  Package,
  Options,
  SkippedStacks,
  ValidSkippedStacks
} from './types'

export {
  mainAsync as readPackage,
  mainSync as readPackageSync,
  validateSkippedStacks
}
