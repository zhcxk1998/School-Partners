import React, { FC } from 'react'
import {
  withRouter,
  Switch,
  Redirect,
  RouteComponentProps,
  Route
} from 'react-router-dom'
import {
  Index,
  ExerciseList,
  ExercisePublish,
  ExerciseModify,
  CourseList,
  CoursePublish,
  CourseModify,
  ExamList,
  ExamPublish,
  ExamModify,
  MarkPaper,
  ClassDashboard
} from '@/admin/pages'
import {
  RestrictRoute
} from '@/admin/components'

import './index.scss'

const ContentMain: FC<RouteComponentProps> = () => {
  return (
    <div className="main__container">
      <Switch>
        <Route exact path="/admin" component={Index} />
        <RestrictRoute exact path="/admin/content/exercise-list" component={ExerciseList} />
        <RestrictRoute exact path="/admin/content/exercise-publish" component={ExercisePublish} />
        <RestrictRoute exact path="/admin/content/exercise-modify/:id" component={ExerciseModify} />
        <RestrictRoute exact path="/admin/content/course-list/" component={CourseList} />
        <RestrictRoute exact path="/admin/content/course-publish/" component={CoursePublish} />
        <RestrictRoute exact path="/admin/content/course-modify/:id/" component={CourseModify} />
        <RestrictRoute exact path="/admin/content/exam-list/" component={ExamList} />
        <RestrictRoute exact path="/admin/content/exam-publish/" component={ExamPublish} />
        <RestrictRoute exact path="/admin/content/exam-modify/:id" component={ExamModify} />
        <RestrictRoute exact path="/admin/content/mark-paper/" component={MarkPaper} />

        <Route exact path="/admin/class/class-dashboard" component={ClassDashboard} />

        <Redirect exact from="/" to="/admin" />
      </Switch>
    </div>
  )
}

export default withRouter(ContentMain)