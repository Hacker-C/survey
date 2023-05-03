import { Select, Typography } from 'antd'
import { IIcon } from '~/components/IIcon'
import { SearchPanel } from '~/components/SearchPanel'
import { DarkThemeText } from '~/components/DarkThemeText'

interface SurveyHeaderProps {
  title?: string
  total?: number
}

export function SurveyHeader(props: SurveyHeaderProps) {
  const { title: _title = '问卷列表', total } = props

  const sortOptions = [
    {
      value: 'jack',
      label: '时间正序'
    },
    {
      value: 'lucy',
      label: '时间倒序'
    },
    {
      value: 'tom',
      label: '问卷正序'
    },
    {
      value: 'tom2',
      label: '问卷倒序'
    }
  ]

  const statusOptions = [
    {
      value: 'jack',
      label: '未发布'
    },
    {
      value: 'lucy',
      label: '已发布'
    }
  ]

  const onSortChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const onStatusChange = (value: string) => {
    console.log(`selected ${value}`)
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
          placeholder={<DarkThemeText>时间顺序</DarkThemeText>}
          optionFilterProp="children"
          onChange={onSortChange}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          suffixIcon={ <IIcon icon='solar:round-sort-vertical-linear' className='theme-duration dark:text-darktext'/>}
          options={sortOptions}
          className='mr1 w26 theme-duration dark:(text-darktext)'
        />

      </div>
      <Select
        bordered={false}
        placeholder={<DarkThemeText>状态</DarkThemeText>}
        optionFilterProp="children"
        onChange={onStatusChange}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        suffixIcon={ <IIcon icon='solar:round-sort-vertical-linear' className='theme-duration dark:text-darktext'/>}
        options={statusOptions}
        className='w19'
      />
      <SearchPanel />
    </div>
  )
}
