import { Outlet } from 'react-router'
import { Layout } from 'antd'
import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

const { Header, Content, Footer, Sider } = Layout

interface SurveyLayoutProps {
  SHeader: React.FC<{ onToggle: () => void; collapsed: boolean }>
  SSider: React.FC<{ collapsed: boolean }>
  SFooter: React.FC
}

export function SurveyLayout(props: PropsWithChildren<SurveyLayoutProps>) {
  const { SHeader, SSider, SFooter } = props
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className='min-h-screen'>
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        theme='light'
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 2
        }}
      >
        <SSider collapsed={collapsed}/>
      </Sider>
      <Layout style={{ marginLeft: !collapsed ? 200 : 80 }}>
        <Header
          className='bg-gray-600 text-white h20 p5 flex items-center'
          style={{ position: 'sticky', top: 0, zIndex: 1 }}
        >
          <SHeader onToggle={onToggle} collapsed={collapsed}/>
        </Header>

        <Content className='bg-gray-300 m5 p5'>
          <Outlet />
        </Content>

        <Footer className='h20 px10'>
          <SFooter />
        </Footer>
      </Layout>
    </Layout>
  )
}
