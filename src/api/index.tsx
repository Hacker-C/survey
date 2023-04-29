import { httpGet } from '~/utils'

export const geProducts = () => {
  return httpGet<{
    id: number
    title: string
    decs: string
  }>('/products/1')
}
