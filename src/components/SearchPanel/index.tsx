import { Input } from 'antd'
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { IIcon } from '~/components/IIcon'
import { LIST_SEARCH_KEY } from '~/constant'

const { Search } = Input

export function SearchPanel() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const searchVal = searchParams.get(LIST_SEARCH_KEY)
    if (searchVal) {
      setValue(searchVal)
    }
  }, [searchParams])

  const onSearch = (value: string) => {
    navigate({
      pathname,
      search: value ? `?${LIST_SEARCH_KEY}=${value}` : ''
    })
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <>
      <Search
        allowClear
        placeholder="请输入问卷名搜索"
        size="middle"
        onSearch={onSearch}
        onChange={onChange}
        enterButton={<IIcon icon='ic:round-search' width='26'/>}
        style={{ width: 300 }}
        value={value}
      />
    </>
  )
}
