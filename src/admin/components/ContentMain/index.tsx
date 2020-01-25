import React, { FC } from 'react'
import { withRouter, Switch, Redirect, RouteComponentProps, Route } from 'react-router-dom'
import { Index, ExerciseList } from '@/admin/pages'
import './index.scss'

const ContentMain: FC<RouteComponentProps> = () => {
  return (
    <div className="main__container">
      <Switch>
        <Route exact path="/admin" component={Index} />
        <Route exact path="/admin/content/exercise-list" component={ExerciseList} />

        <Redirect exact from="/" to="/admin" />
      </Switch>
    </div>
  )
}

export default withRouter(ContentMain)