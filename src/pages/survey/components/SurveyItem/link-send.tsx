import React from 'react'
import { useRequest } from 'ahooks'
import { Button, Typography } from 'antd'
import { getLinkBySurveyId } from '~/api'

const { Paragraph } = Typography

interface LinkSendProps {
  id: number
}

export const LinkSend: React.FC<LinkSendProps> = ({ id }) => {
  const { data: res } = useRequest(
    () => getLinkBySurveyId(id)
  )
  const link = `http://localhost:3333/sv/${res?.data}`
  return <div>
    <Paragraph copyable={{
      text: link
    }}>
      <span text='base'>
        {link}
      </span>
    </Paragraph>
    <Button type='primary' onClick={() => {
      window.open(link)
    }}>打开</Button>
  </div>
}
