import { SFooter, SHeader, SSider } from '~/pages/survey/components'
import { SurveyLayout } from '~/layouts'
import { IIcon } from '~/components/IIcon'
import type { MenuItem } from '~/pages/survey/components'

const menus: MenuItem[] = [
  {
    key: '/admin/profile',
    icon: <IIcon icon="gg:profile"/>,
    label: '个人账号'
  },
  {
    key: '/admin/survey',
    icon: <IIcon icon='material-symbols:list-alt-outline-rounded'/>,
    label: '问卷列表'
  },
  {
    key: '/admin/user',
    icon: <IIcon icon='material-symbols:list-alt-outline-rounded'/>,
    label: '用户管理'
  }
]

export function AdminPage() {
  return (
    <SurveyLayout
      SFooter={SFooter}
      SHeader={SHeader}
      SSider={SSider}
      menus={menus}
    />
  )
}
