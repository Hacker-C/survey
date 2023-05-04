interface QuestionLayoutProps {
  HeaderLeft?: React.ReactNode
  HeaderCenter?: React.ReactNode
  HeaderRight?: React.ReactNode
  children?: React.ReactNode
}

export function QuestionLayout(props: QuestionLayoutProps) {
  const { HeaderLeft, HeaderCenter, HeaderRight, children } = props
  return (
    <>
      <header
        className='h-16 flex items-center fixed top-0 w-100% z-10 bg-white'
        border='1 solid gray-200'
      >
        <div>
          { HeaderLeft }
        </div>
        <div flex='1' className='flex justify-center'>
          { HeaderCenter }
        </div>
        <div>
          { HeaderRight }
        </div>
      </header>
      <div m='t16'>
        { children }
      </div>
    </>
  )
}
