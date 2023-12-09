import type { Package } from '@mnrendra/types-package'

type SkippedStacks = Package['name'] | Array<Package['name']>

export default SkippedStacks
