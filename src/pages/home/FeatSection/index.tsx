import { Card, Typography } from 'antd'
import DataFeat from '~/assets/svgs/data-feat.svg'
import EasyFeat from '~/assets/svgs/esay-feat.svg'
import LowcodeFeat from '~/assets/svgs/lowcode-feat.svg'

const { Title, Paragraph } = Typography

export function FeatSection() {
  return (
    <div className='bg-[#eaf2f7]'>
      <Title className='h-[30vh] flex-center font-deyihei'>
        <span text=''>系统特性</span>
      </Title>
      <div className="h-[70vh] flex justify-around">
        <Card hoverable style={{ width: 280, height: 360 }} className='text-center'>
          <img alt={'EasyFeat'} src={EasyFeat} m='b4' />
          <Title level={3} font='deyihei'>简洁易操作</Title>
          <Paragraph font='deyihei'>无需编程技能，轻松打造专业问卷调查，高效获取有效的数据并展示统计分析！</Paragraph>
        </Card>
        <Card hoverable style={{ width: 280, height: 360 }} className='text-center'>
          <img alt={'LowcodeFeat'} src={LowcodeFeat} m='b4' />
          <Title level={3} font='deyihei'>低代码平台</Title>
          <Paragraph font='deyihei'>高效构建，在线编辑，低代码快速落地，让问卷设计更便捷！</Paragraph>
        </Card>
        <Card hoverable style={{ width: 280, height: 360 }} className='text-center'>
          <img alt={'DataFeat'} src={DataFeat} m='b4' />
          <Title level={3} font='deyihei'>数据可视化</Title>
          <Paragraph font='deyihei'>数据的抽样、数据加权、数据提取、数据统计与呈现功能齐全，答案一目了然！</Paragraph>
        </Card>
      </div>
    </div>

  )
}
