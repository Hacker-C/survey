import dayjs from 'dayjs'
import { QuestionType } from '~/constant'

export type Prettify<T> = {
  [P in keyof T]: T[P]
} & {}

export const formatTime = (time: string | undefined) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

export function generateRandomString(): string {
  const length = 8
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

/** 过滤掉标题文本题目 */
export const filterQuestions = (questions: any[]) => {
  return questions.filter(item => ![
    QuestionType.TITLE_VIEW,
    QuestionType.TEXT_VIEW,
    QuestionType.TITLE_TEXT_VIEW
  ].includes(item.type))
}
