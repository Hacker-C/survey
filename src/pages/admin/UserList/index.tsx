import { useRequest } from 'ahooks'
import { Button, Image, Popconfirm, Switch, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteUser, disableUser, getUserList } from '~/api'
import { IIcon } from '~/components/IIcon'
import { SearchPanel } from '~/components/SearchPanel'
import { useMessage } from '~/hooks'
import { addKeyOfData } from '~/utils'

const defaultAvatar = import.meta.env.VITE_REACT_APP_DEFAULT_AVATAR

export const UserList = () => {
  const { error, warning, success, contextHolder } = useMessage()
  const [searchParams] = useSearchParams()

  // 获取用户列表
  const { data, loading, refresh } = useRequest(
    () => getUserList({
      pageNum: 1,
      pageSize: 100,
      nickname: searchParams.get('keyword') ?? ''
    }),
    {
      onSuccess: (res) => {
        if (res.code !== 200) {
          error(res.msg)
        }
      },
      onError: (err) => {
        error(err.message)
      }
    })
  // 刷新用户列表
  useEffect(() => {
    refresh()
  }, [searchParams])

  // 禁用用户
  const { run: disable, loading: disableLoading } = useRequest(disableUser, {
    manual: true
  })
  const handleStatusChange = (checked: boolean, id: number) => {
    disable(id, !checked ? 1 : 0)
  }

  // 删除用户
  const { run: runDelete } = useRequest(deleteUser, {
    manual: true,
    onSuccess: (res) => {
      if (res.code !== 200) {
        error(res.msg)
      } else {
        success('删除成功', () => {
          refresh()
        })
      }
    },
    onError: (err) => {
      error(err.message)
    }
  })

  const confirmDelete = (id: number) => {
    runDelete(id)
  }

  const cancelDelete = () => {
    warning('已取消删除')
  }

  const users = addKeyOfData((data?.data?.rows ?? []))
  const columns: ColumnsType<typeof users[0]> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render(_, { gender, id }) {
        return <span key={id}>{gender === 0 ? '男' : '女'}</span>
      },
      filters: [
        {
          text: '男',
          value: 0
        },
        {
          text: '女',
          value: 1
        }
      ],
      onFilter: (value: number, { gender }) => gender === value
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render(_, { avatar, id }) {
        return <Image
          key={id}
          src={avatar}
          width={40} height={40}
          preview={{ mask: <IIcon icon='ant-design:eye-outlined' /> }}
          fallback={defaultAvatar}
        />
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(_, { status, id }) {
        return <Switch
          key={id}
          checkedChildren="正常"
          unCheckedChildren="禁用"
          defaultChecked={status === 0}
          onChange={checked => handleStatusChange(checked, id)}
          loading={disableLoading}
        />
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render(_, { id, nickname }) {
        return <Popconfirm
          key={id}
          title="删除用户"
          description={`确定删除用户 ${nickname} 吗？`}
          onConfirm={() => confirmDelete(id)}
          onCancel={cancelDelete}
          okText="确认"
          cancelText="取消"
        >
          <Button danger className='flex items-center'>
            <IIcon icon='material-symbols:delete-rounded' className='mr1' />删除
          </Button>
        </Popconfirm>
      }
    }
  ]

  return <div p='5 t4'>
    <div flex='' m='b5'>
      <h2 text='xl' font='bold'>用户列表</h2>
      <div flex='1'></div>
      <SearchPanel tip={'请输入用户昵称搜索'} />
    </div>
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
      pagination={{ position: ['bottomRight'], total: data?.data?.total }}
    />
    {contextHolder}
  </div>
}
