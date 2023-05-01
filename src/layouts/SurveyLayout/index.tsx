import { Outlet } from 'react-router'
import { Layout } from 'antd'
import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'
import { useSnapshot } from 'valtio'
import { themeStore } from '~/store'
import type { MenuItem, SSiderProps } from '~/pages/survey/components'

const { Header, Content, Footer, Sider } = Layout

interface SurveyLayoutProps {
  SHeader: React.FC<{ onToggle: () => void; collapsed: boolean }>
  SSider: React.FC<SSiderProps>
  SFooter: React.FC
  menus: MenuItem[]
}

export function SurveyLayout(props: PropsWithChildren<SurveyLayoutProps>) {
  const { SHeader, SSider, SFooter, menus } = props
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = () => {
    setCollapsed(!collapsed)
  }

  const { theme } = useSnapshot(themeStore)

  return (
    <Layout className='theme-duration dark:bg-darkbg'>
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
        <SSider collapsed={collapsed} menus={menus}/>
      </Sider>
      <Layout style={{ marginLeft: !collapsed ? 200 : 80 }}>
        <Header
          className='h20 p5 flex items-center theme-duration bg-white dark:(bg-dark text-darktext hover:text-white)'
          style={{ position: 'sticky', top: 0, zIndex: 1 }}
        >
          <SHeader onToggle={onToggle} collapsed={collapsed}/>
        </Header>

        <Content className='relative bg-lightbg theme-duration dark:bg-darkbg'>
          <div className='m5 p5 bg-white theme-duration dark:(bg-dark text-darktext) rounded-xl min-content-h'>
          <Outlet />
          </div>
        </Content>

        <Footer className='h20 px10 theme-duration bg-lightbg dark:(bg-darkbg text-darktext)'>
          <SFooter />
        </Footer>
      </Layout>
    </Layout>
  )
}
