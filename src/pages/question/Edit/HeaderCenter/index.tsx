import { Button } from 'antd'
import { IIcon } from '~/components/IIcon'

export const HeaderCenter = () => {
  return <div flex='' items='center'>
    <Button shape="circle" flex='center' m='r2'>
      <IIcon icon='icon-park-outline:delete-four' />
    </Button>
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
  </div>
}
