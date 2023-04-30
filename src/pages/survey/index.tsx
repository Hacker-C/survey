import { SFooter, SHeader, SSider } from './components'
import { SurveyLayout } from '~/layouts'
import { IIcon } from '~/components/IIcon'
import type { MenuItem } from '~/pages/survey/components'

const menus: MenuItem[] = [
  {
    key: '/survey/create',
    icon: <IIcon icon="material-symbols:add"/>,
    label: '新建问卷'
  },
  {
    key: '/survey/profile',
    icon: <IIcon icon="gg:profile"/>,
    label: '个人账号'
  },
  {
    key: '/survey/list',
    icon: <IIcon icon='material-symbols:list-alt-outline-rounded'/>,
    label: '问卷列表'
  },
  {
    key: '/survey/star',
    icon: <IIcon icon='material-symbols:star'/>,
    label: '收藏夹'
  },
  {
    key: '/survey/trash',
    icon: <IIcon icon='ph:trash-bold'/>,
    label: '回收站'
  }
]

export function SurveyPage() {
  return (
    <SurveyLayout
      SFooter={SFooter}
      SHeader={SHeader}
      SSider={SSider}
      menus={menus}
    />
  )
}
