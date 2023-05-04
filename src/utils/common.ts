import dayjs from 'dayjs'

export type Prettify<T> = {
  [P in keyof T]: T[P]
} & {}

export const formatTime = (time: string | undefined) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
