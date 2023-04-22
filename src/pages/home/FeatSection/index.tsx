import { Card, Typography } from 'antd'
import DataFeat from '~/assets/svgs/data-feat.svg'
import EasyFeat from '~/assets/svgs/esay-feat.svg'
import LowcodeFeat from '~/assets/svgs/lowcode-feat.svg'

const { Title, Paragraph } = Typography

export function FeatSection() {
  return (
    <div>
      <Title
        className='h-[30vh] flex-center'
        style={{
          fontFamily: 'SmileySans'
        }}
      >
        系统特性
      </Title>
      <div className="h-[70vh] flex justify-around">
        <Card style={{ width: 280, height: 360 }} className='text-center'>
          <img alt={'EasyFeat'} src={EasyFeat} m='b4' />
          <Title level={3} style={{
            fontFamily: 'SmileySans'
          }}>简洁易操作</Title>
          <Paragraph style={{
            fontFamily: 'SmileySans'
          }}>无需编程技能，轻松打造专业问卷调查，高效获取有效的数据并展示统计分析！</Paragraph>
        </Card>
        <Card style={{ width: 280, height: 360 }} className='text-center'>
          <img alt={'LowcodeFeat'} src={LowcodeFeat} m='b4' />
          <Title level={3} style={{
            fontFamily: 'SmileySans'
          }}>低代码平台</Title>
          <Paragraph style={{
            fontFamily: 'SmileySans'
          }}>高效构建，在线编辑，低代码快速落地，让问卷设计更便捷！</Paragraph>
        </Card>
        <Card style={{ width: 280, height: 360 }} className='text-center'>
          <img alt={'DataFeat'} src={DataFeat} m='b4' />
          <Title level={3} style={{
            fontFamily: 'SmileySans'
          }}>数据可视化</Title>
          <Paragraph style={{
            fontFamily: 'SmileySans'
          }}>数据的抽样、数据加权、数据提取、数据统计与呈现功能齐全，答案一目了然！</Paragraph>
        </Card>
      </div>
    </div>

  )
}
