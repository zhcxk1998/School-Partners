import { createContext } from 'react'
import { UserInfoStore } from '@/admin/store'

export const storeContext = createContext({
  userInfoStore: new UserInfoStore()
})