import { Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { IIcon } from '~/components/IIcon'

const { Title, Text } = Typography

export function FooterSection() {
  return (
    <div className='bg-[#eaf2f7]'>
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <Title font='deyihei'>
          <span text=''>只需 4 步，轻松得到你的答案</span>
        </Title>
        <Text m='y5' text='xl' font='deyihei'>
          <span text='xl'>创建、编辑、发送、收集，问卷调查轻松简单！</span>
        </Text>
        <div flex=''>
          <Link to={'/survey/create'}>
            <Button type='primary' size="large" shape='round' className="mr-4 flex items-center">
              <IIcon icon='mdi:tab-add'/>
              <span m='l1'>创建问卷</span>
            </Button>
          </Link>
          <Link to={'/survey/list'}>
            <Button type='primary' size="large" shape='round' className="mr-4 flex items-center">
              <IIcon icon='iconoir:page-edit'/>
              <span m='l1'>编辑问卷</span>
            </Button>
          </Link>
          <Link to={'/survey/list'}>
            <Button type='primary' size="large" shape='round' className="mr-4 flex items-center">
              <IIcon icon='mingcute:send-plane-fill'/>
              <span m='l1'>发送问卷</span>
            </Button>
          </Link>
          <Link to={'/survey/list'}>
            <Button type='primary' size="large" shape='round' className="mr-4 flex items-center">
              <IIcon icon='ep:data-line'/>
              <span m='l1'>收集答卷</span>
            </Button>
          </Link>
        </div>
      </div>
      <div text='white base' className='h-[20vh] bg-footer flex-center'>
        基于 Spring Boot 的在线问卷调查系统 Copyright &copy; 2023 ChenGui
      </div>
    </div>
  )
}
