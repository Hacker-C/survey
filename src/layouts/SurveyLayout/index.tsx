import { Outlet, useLocation } from 'react-router'
import { Layout } from 'antd'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import type { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { menuStore, themeStore } from '~/store'
import type { SSiderProps } from '~/pages/survey/components'

const { Header, Content, Footer, Sider } = Layout

interface SurveyLayoutProps {
  SHeader: React.FC<{ onToggle: () => void; collapsed: boolean }>
  SSider: React.FC<SSiderProps>
  SFooter: React.FC
}

export function SurveyLayout(props: PropsWithChildren<SurveyLayoutProps>) {
  const { SHeader, SSider, SFooter } = props
  const { menus } = useSnapshot(menuStore)
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = () => {
    setCollapsed(!collapsed)
  }

  const { theme } = useSnapshot(themeStore)

  // 每次路由变化，页面都滚动到顶部
  const loc = useLocation()
  useEffect(() => {
    window.scrollTo({
      top: 0
    })
  }, [loc.pathname])

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
        <SSider collapsed={collapsed} menus={menus as MenuItemType[]} />
      </Sider>
      <Layout style={{ marginLeft: !collapsed ? 200 : 80 }}>
        <Header
          className='h20 p5 flex items-center theme-duration bg-white dark:(bg-dark text-darktext hover:text-white)'
          style={{ position: 'sticky', top: 0, zIndex: 1 }}
        >
          <SHeader onToggle={onToggle} collapsed={collapsed} />
        </Header>

        <Content className='relative bg-lightbg theme-duration dark:bg-darkbg'>
          <div className='m5 p5 bg-white theme-duration dark:(bg-dark text-darktext) rounded-xl min-h-120px'>
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
