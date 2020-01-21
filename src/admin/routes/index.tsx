import React from 'react'
import {
  Switch, Redirect, Route,
} from 'react-router-dom'

import PrivateRoute from '../components/PrivateRoute'
import { Login, Register } from '../pages'
import Main from '../components/Main/index'

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <PrivateRoute component={Main} path="/home" />

    <Redirect exact from="/" to="/home" />
  </Switch>
)

export default Routes
