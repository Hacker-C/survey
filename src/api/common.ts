import { httpPost } from '~/utils'

export const imageUpload = (data: any) => {
  return httpPost<string>('/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarygDQaNiLQ3IZN6zzb'
    }
  })
}
