import { Tag } from 'antd'

export const addKeyOfData = (data: any[]) => {
  return data.map(item => ({
    ...item,
    key: item.id
  }))
}

export const surveyStatusComp = (status: 0 | 1 | 2) => {
  if (status === 0) {
    return <Tag color='orange'>未发布</Tag>
  }
  if (status === 1) {
    return <Tag color='blue'>已发布</Tag>
  }
  return <Tag color='red'>回收站中</Tag>
}
