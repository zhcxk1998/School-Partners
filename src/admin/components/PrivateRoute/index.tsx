import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../../utils/session'

interface IProps {
  component: any,
  path: string
}

const PrivateRoute = ({ component: Component, path }: IProps) => (
  <Route
    path={path}
    render={(props) => (
      !!isAuthenticated()
        ? <Component {...props} />
        : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location },
          }}
          />
        )
    )}
  />
)

export default PrivateRoute
