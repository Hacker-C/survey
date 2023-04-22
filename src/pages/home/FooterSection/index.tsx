import { Button, Typography } from 'antd'

const { Title, Text } = Typography

export function FooterSection() {
  return (
    <>
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <Title style={{
          fontFamily: 'SmileySans'
        }}>只需 4 步，轻松得到你的答案</Title>
        <Text m='y5' text='xl' style={{
          fontFamily: 'SmileySans'
        }}>创建、编辑、投放、回收，问卷调查轻松简单</Text>
        <div>
          {
            ['创建问卷', '编辑问卷', '投放问卷', '回收问卷'].map((item, index) => (
              <Button key={index} type='primary' size="large" shape='round' className="mr-4">{item}</Button>
            ))
          }
        </div>
      </div>
      <div text='white base' className='h-[20vh] bg-footer flex-center'>
        在线问卷系统 Copyright &copy; 2023 Built with React, by ChenGui
      </div>
    </>
  )
}
