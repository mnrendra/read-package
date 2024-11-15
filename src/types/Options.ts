import type { SkippedStacks } from '@mnrendra/read-stacked-json'

/**
 * The options interface.
 *
 * @see https://github.com/mnrendra/read-package#readme
 */
interface Options {
  /**
   * A name or a list of names of stack traces that need to be skipped.
   *
   * @default []
   *
   * @see https://github.com/mnrendra/read-package#readme
   */
  skippedStacks?: SkippedStacks

  /**
   * The `Error.stackTraceLimit` property specifies the number of stack frames
   * to be collected by a stack trace.
   *
   * @default 10
   *
   * @see https://github.com/mnrendra/read-package#readme
   */
  stackTraceLimit?: number
}

export default Options
