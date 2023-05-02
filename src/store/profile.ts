import { proxy } from 'valtio'
import { devtools } from 'valtio/utils'
import type { IUser } from '~/interfaces'

const defaultAvatar = import.meta.env.VITE_REACT_APP_DEFAULT_AVATAR

export const profileStore = proxy<{
  profile: IUser | null
  update: (profile: IUser) => void
}>({
      profile: null,
      update: (profile: IUser) => {
        profileStore.profile = profile
        if (!profile.avatar) {
          profileStore.profile.avatar = defaultAvatar
        }
      }
    })

devtools(profileStore, { name: 'profileStore', enabled: true })
