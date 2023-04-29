import { message } from 'antd'

export const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const success = (msg: string, callback?: () => void) => {
    messageApi.open({
      type: 'success',
      content: msg,
      duration: 1.5
    }).then(callback)
  }

  const error = (msg: string, callback?: () => void) => {
    messageApi.open({
      type: 'error',
      content: msg,
      duration: 1.5
    }).then(callback)
  }

  return { success, error, contextHolder }
}
