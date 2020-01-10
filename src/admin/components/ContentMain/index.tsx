import React, { Component } from 'react'
import { withRouter, Switch, Redirect, RouteComponentProps, Route } from 'react-router-dom'
import { Index } from '../../pages'
import './index.scss'

interface IProps extends RouteComponentProps {

}

interface IStates {

}

class Content extends Component<IProps, IStates>{
  render() {
    return (
      <Switch>
        <Route exact path="/home/index" component={Index} />

        <Redirect exact from="/home" to="/home/index" />
      </Switch>
    )
  }
}

export default withRouter(Content)