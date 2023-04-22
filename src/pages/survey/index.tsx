import { SFooter, SHeader, SSider } from './components'
import { SurveyLayout } from '~/layouts'

export function SurveyPage() {
  return (
    <SurveyLayout
      SFooter={SFooter}
      SHeader={SHeader}
      SSider={SSider}
    />
  )
}
