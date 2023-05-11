import React from 'react'

interface HomeLayoutProps {
  MainSection: React.FC
  FeatSection: React.FC
  FooterSection: React.FC
}

export function HomeLayout(props: HomeLayoutProps) {
  const { MainSection, FeatSection, FooterSection } = props

  return (
    <main text='3xl' className='snap-mandatory snap-y overflow-scroll h-screen overflow-x-hidden'>
      <section className="snap-center h-screen">
        <MainSection />
      </section>
      <section className="snap-center h-screen">
        <FeatSection />
      </section>
      <section className="snap-center h-screen">
        <FooterSection />
      </section>
    </main>
  )
}
