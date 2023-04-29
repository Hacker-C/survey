interface LoginSiderProps {
  cover: string
  title: string
  description: string
}

export function LoginSider(props: LoginSiderProps) {
  const { cover, title, description } = props
  return (
    <div className="h-full w-full bg-secondary flex flex-col items-center justify-center">
      <img src={cover} className='w100'/>
      <div mt='16' className='text-center font-deyihei px30'>
        <h1 text='white 2xl' font='bold'>{ title }</h1>
        <p text='white lg'>{ description }</p>
      </div>
    </div>
  )
}
