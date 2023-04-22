import { Typography } from 'antd'
import DataFeat from '~/assets/svgs/data-feat.svg'
import EasyFeat from '~/assets/svgs/esay-feat.svg'
import LowcodeFeat from '~/assets/svgs/lowcode-feat.svg'

const { Title, Paragraph } = Typography

export function FeatSection() {
  return (
    <div className="full-screen flex justify-around items-center">
      <div className='w50 text-center'>
        <img alt={'EasyFeat'} src={EasyFeat} m='b4' />
        <Title level={3}>简洁易操作</Title>
        <Paragraph>无需编程技能，轻松打造专业问卷调查，高效获取有效的数据并展示统计分析！</Paragraph>
      </div>
      <div className='w50 text-center'>
        <img alt={'LowcodeFeat'} src={LowcodeFeat} m='b4' />
        <Title level={3}>低代码平台</Title>
        <Paragraph>高效构建，在线编辑，低代码快速落地，让问卷设计更便捷！</Paragraph>
      </div>
      <div className='w50 text-center'>
        <img alt={'DataFeat'} src={DataFeat} m='b4' />
        <Title level={3}>数据可视化</Title>
        <Paragraph>数据的抽样、数据加权、数据提取、数据统计与呈现功能齐全，答案一目了然！</Paragraph>
      </div>
    </div>
  )
}
