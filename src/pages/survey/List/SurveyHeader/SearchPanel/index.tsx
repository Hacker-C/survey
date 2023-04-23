import { Input } from 'antd'
import { IIcon } from '~/components/IIcon'

const { Search } = Input

export function SearchPanel() {
  const onSearch = (value: string) => console.log(value)

  return (
    <>
      <Search
        placeholder="请输入问卷名搜索"
        size="middle"
        onSearch={onSearch}
        enterButton={<IIcon icon='ic:round-search' width='26'/>}
        style={{ width: 300 }}
      />
    </>
  )
}
