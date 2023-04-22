import { useState } from 'react'
import { Button } from 'antd'

export function Hello() {
  const [count, setCount] = useState(0)
  const add = () => setCount(count => count + 1)

  return (
    <>
      <div>{ count }</div>
      <Button onClick={add}>Add</Button>
    </>
  )
}
