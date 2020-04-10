import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useStore } from '@/admin/hooks/useStore'
import { message } from 'antd'

interface IProps {
  component: any,
  path: string,
  exact: boolean
}

const RestrictRoute = ({ component: Component, path }: IProps) => {
  const { userInfoStore } = useStore()
  const { isActived } = userInfoStore

  if (!isActived) {
    message.warn('请先完善班级信息')
  }

  return (
    <Route
      path={path}
      render={(props) => (
        isActived
          ? <Component {...props} />
          : (
            <Redirect to={{
              pathname: '/admin/class/class-dashboard',
              state: { from: props.location },
            }}
            />
          )
      )}
    />
  )
}

export default RestrictRoute
