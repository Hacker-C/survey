import { SFooter, SHeader, SSider } from '~/pages/survey/components'
import { SurveyLayout } from '~/layouts'

export function AdminPage() {
  return (
    <SurveyLayout
      SFooter={SFooter}
      SHeader={SHeader}
      SSider={SSider}
    />
  )
}
