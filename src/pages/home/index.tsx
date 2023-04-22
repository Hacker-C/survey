import { MainSection } from './MainSection'
import { FeatSection } from './FeatSection'
import { FooterSection } from './FooterSection'
import { HomeLayout } from '~/layouts/HomeLayout'

export function HomePage() {
  return (
    <HomeLayout
      MainSection={MainSection}
      FeatSection={FeatSection}
      FooterSection={FooterSection}
    />
  )
}
