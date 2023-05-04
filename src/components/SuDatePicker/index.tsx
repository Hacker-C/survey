import type { DatePickerProps } from 'antd'
import { DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useState } from 'react'

interface SuDatePickerProps {
  onSuOk: (value: any) => void
  defaultValue?: string
}

export const SuDatePicker: React.FC<SuDatePickerProps> = ({ onSuOk, defaultValue }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const onChange = (
    value: DatePickerProps['value']
  ) => {
    setSelectedDate(value as Dayjs)
  }
  const range = (start: number, end: number) => {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }
  const disabledDate = (current: Dayjs) => {
    // 只能选择当天之后的日期
    return current.isBefore(dayjs().startOf('day'))
  }
  const disabledDateTime = (current: Dayjs) => {
    // 只能选择当前时间之后
    const curHour = dayjs().hour()
    const curMin = dayjs().minute()
    const curSec = dayjs().second()
    if (current && current.isSame(selectedDate, 'day')) {
      return {
        disabledHours: () => range(0, 24).splice(0, curHour),
        disabledMinutes: () => range(0, curMin),
        disabledSeconds: () => [0, curSec]
      }
    }
  }

  return <DatePicker
    showTime
    format="YYYY-MM-DD HH:mm:ss"
    onChange={onChange}
    disabledDate={disabledDate}
    disabledTime={disabledDateTime}
    placeholder='请选择截止时间'
    defaultValue={ defaultValue ? dayjs(defaultValue) : undefined}
    onOk={v => onSuOk(dayjs(v).format('YYYY-MM-DDTHH:mm:ss.SSSSSSSSS'))}
  />
}
