import React from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Image, Modal, Upload, message } from 'antd'
import type { RcFile } from 'antd/es/upload/interface'
import { useRequest } from 'ahooks'
import { IIcon } from '../IIcon'
import { imageUpload } from '~/api'
import { useMessage } from '~/hooks'

/** 上传前对图片进行限制 */
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('仅限 JPG/PNG 图片!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小必须小于 2MB!')
  }
  return isJpgOrPng && isLt2M
}

interface ImageUploadProps {
  originUrl?: string
  onSuccess: (url: string) => void
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onSuccess, originUrl = '' }) => {
  const [imageUrl, setImageUrl] = React.useState<string>(originUrl)
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const { success, error, contextHolder } = useMessage()

  const { run, loading } = useRequest(imageUpload, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200) {
        setImageUrl(res.data!)
        onSuccess(res.data!)
        success('上传成功')
      } else {
        error(res.message)
      }
    }
  })

  const onUploadImage = ({ file }: any) => {
    const formdata = new FormData()
    formdata.append('file', file as Blob)
    run(formdata)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      {contextHolder}
      <Upload
        name="avatar"
        customRequest={onUploadImage}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {
          imageUrl
            ? <Image
                alt="example"
                src={imageUrl}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                preview={{
                  mask: <div flex=''>
                    <IIcon icon='ic:baseline-remove-red-eye' className='mr2'/>
                    <IIcon icon='material-symbols:delete-outline-rounded' onClick={(e) => {
                      e.stopPropagation()
                      setImageUrl('')
                    }}/>
                  </div>
                }}
              />
            : uploadButton
        }
      </Upload>
      <Modal
        open={previewOpen}
        title={'图片预览'}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      ><img alt="example" style={{ width: '100%' }} src={imageUrl} /></Modal>
    </>
  )
}
