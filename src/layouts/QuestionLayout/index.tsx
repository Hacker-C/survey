import { Outlet } from 'react-router-dom'

export function QuestionLayout() {
  return (
    <>
      <header className='bg-sky h-16'>QuestionLayout</header>
      <div>
        <Outlet />
      </div>
    </>
  )
}
