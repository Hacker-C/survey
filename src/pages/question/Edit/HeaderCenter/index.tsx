import { Button, Popconfirm } from 'antd'
import { useSnapshot } from 'valtio'
import { IIcon } from '~/components/IIcon'
import { deleteQuestion } from '~/api'
import { questionStore } from '~/store'
import { useMessage } from '~/hooks'

export const HeaderCenter = () => {
  const { curQuestion } = useSnapshot(questionStore)
  const { error, success, contextHolder } = useMessage()

  const handleDelete = () => {
    if (!curQuestion) return error('请选择要删除的问题')
    deleteQuestion(curQuestion.id).then((res) => {
      if (res.code === 200) {
        success('删除成功')
        questionStore.deleteQuestion(curQuestion.id)
      } else {
        error(res.msg)
      }
    })
  }

  return <div flex='' items='center'>
    <Popconfirm
    title="确定删除选中的问题？"
    okText="确定"
    cancelText="取消"
    onConfirm={handleDelete}
  >
    <Button shape="circle" flex='center' m='r2'>
      <IIcon icon='icon-park-outline:delete-four' />
    </Button>
  </Popconfirm>

    <Button shape="circle" flex='center' m='r2'>
      <IIcon icon='mdi:arrow-up' />
    </Button>
    <Button shape="circle" flex='center' m='r2'>
      <IIcon icon='mdi:arrow-down' />
    </Button>
    <Button shape="circle" flex='center' m='r2'>
      <IIcon icon='ci:undo' />
    </Button>
    <Button shape="circle" flex='center' m='r2'>
      <IIcon icon='ci:redo' />
    </Button>
    { contextHolder }
  </div>
}
