import { Outlet } from 'react-router'
import { Layout } from 'antd'
import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'
import { useSnapshot } from 'valtio'
import { themeStore } from '~/store'

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

  const { theme } = useSnapshot(themeStore)

  return (
    <Layout className='min-h-screen theme-duration dark:bg-darkbg'>
      <Sider
        theme={theme}
        collapsible
        trigger={null}
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 2
        }}
        className='theme-duration'
      >
        <SSider collapsed={collapsed}/>
      </Sider>
      <Layout style={{ marginLeft: !collapsed ? 200 : 80 }}>
        <Header
          className='h20 p5 flex items-center theme-duration bg-white dark:(bg-dark text-darktext hover:text-white)'
          style={{ position: 'sticky', top: 0, zIndex: 1 }}
        >
          <SHeader onToggle={onToggle} collapsed={collapsed}/>
        </Header>

        <Content className='bg-lightbg theme-duration dark:bg-darkbg'>
          <div className='m5 p5 bg-white theme-duration dark:(bg-dark text-darktext) rounded-xl'>
          <Outlet />
          </div>
        </Content>

        <Footer className='h20 px10 theme-duration dark:(bg-darkbg text-darktext)'>
          <SFooter />
        </Footer>
      </Layout>
    </Layout>
  )
}
