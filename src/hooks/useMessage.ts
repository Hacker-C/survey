import { message } from 'antd'

export const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const duration = 1.5

  const success = (msg: string, callback?: () => void) => {
    messageApi.open({
      type: 'success',
      content: msg,
      duration
    }).then(callback)
  }

  const error = (msg: string, callback?: () => void) => {
    messageApi.open({
      type: 'error',
      content: msg,
      duration
    }).then(callback)
  }

  const warning = (msg: string, callback?: () => void) => {
    messageApi.open({
      type: 'warning',
      content: msg,
      duration
    }).then(callback)
  }

  return { success, error, warning, contextHolder }
}
