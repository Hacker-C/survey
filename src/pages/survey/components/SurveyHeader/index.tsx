import { Select, Typography } from 'antd'
import { IIcon } from '~/components/IIcon'
import { SearchPanel } from '~/components/SearchPanel'
import { DarkThemeText } from '~/components/DarkThemeText'

interface SurveyHeaderProps {
  title?: string
  total?: number
  toggleStatus?: (status: number) => void
  toggleSort?: (sort: number) => void
}

export function SurveyHeader(props: SurveyHeaderProps) {
  const { title: _title = '问卷列表', total, toggleStatus, toggleSort } = props

  const sortOptions = [
    {
      value: 1,
      label: '创建时间正序'
    },
    {
      value: 2,
      label: '创建时间倒序'
    },
    {
      value: 3,
      label: '截止时间正序'
    },
    {
      value: 4,
      label: '截止时间倒序'
    }
  ]

  const statusOptions = [
    {
      value: 0,
      label: '暂未发布'
    },
    {
      value: 1,
      label: '已经发布'
    },
    {
      value: -1,
      label: '所有问卷'
    }
  ]

  const onSortChange = (value: number) => {
    toggleSort?.(value)
  }

  const onStatusChange = (value: number) => {
    toggleStatus?.(value)
  }

  return (
    <div className='flex items-center'>
      <Typography.Title level={4} className='theme-duration dark:(text-darktext)'>
        {`${_title}（${total}）`}
      </Typography.Title>
      <div flex='1'></div>
      <div
        text='base theme-duration dark:(text-darktext)'
        className='flex items-center cursor-pointer'
      >
        <Select
          bordered={false}
          placeholder={<DarkThemeText>按照时间顺序</DarkThemeText>}
          optionFilterProp="children"
          onChange={onSortChange}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          suffixIcon={ <IIcon icon='solar:round-sort-vertical-linear' className='theme-duration dark:text-darktext'/>}
          options={sortOptions}
          className='mr1 w33 theme-duration dark:(text-darktext)'
        />

      </div>
      <Select
        bordered={false}
        placeholder={<DarkThemeText>是否发布</DarkThemeText>}
        optionFilterProp="children"
        onChange={onStatusChange}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        suffixIcon={ <IIcon icon='solar:round-sort-vertical-linear' className='theme-duration dark:text-darktext'/>}
        options={statusOptions}
        className='w26'
      />
      <SearchPanel />
    </div>
  )
}
