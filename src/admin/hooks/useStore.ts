import { useContext } from 'react'
import { storeContext } from '@/admin/contexts'

export const useStore = () => useContext(storeContext)