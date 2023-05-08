export const LIST_SEARCH_KEY = 'keyword'

export const SEPERATOR = '#&^@#@@^%#$$#%$&'

export enum QuestionType {
  /** 标题 */
  TITLE_VIEW = 1,
  /** 文本 */
  TEXT_VIEW = 2,
  /** 标题文本 */
  TITLE_TEXT_VIEW = 3,
  /** 单行输入 */
  LINE_INPUT = 4,
  /** 段落输入 */
  AREA_INPUT = 5,
  /** 单选题 */
  SINGLE_CHOICE = 6,
  /** 多选题 */
  MULTIPLE_CHOICE = 7,
  /** 评分题 */
  SCORE_RATE = 8
}
