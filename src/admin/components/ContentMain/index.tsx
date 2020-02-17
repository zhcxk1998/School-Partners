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
  ExamModify
} from '@/admin/pages'
import './index.scss'

const ContentMain: FC<RouteComponentProps> = () => {
  return (
    <div className="main__container">
      <Switch>
        <Route exact path="/admin" component={Index} />
        <Route exact path="/admin/content/exercise-list" component={ExerciseList} />
        <Route exact path="/admin/content/exercise-publish" component={ExercisePublish} />
        <Route exact path="/admin/content/exercise-modify/:id" component={ExerciseModify} />
        <Route exact path="/admin/content/course-list/" component={CourseList} />
        <Route exact path="/admin/content/course-publish/" component={CoursePublish} />
        <Route exact path="/admin/content/course-modify/:id/" component={CourseModify} />
        <Route exact path="/admin/content/exam-list/" component={ExamList} />
        <Route exact path="/admin/content/exam-publish/" component={ExamPublish} />
        <Route exact path="/admin/content/exam-modify/:id" component={ExamModify} />

        <Redirect exact from="/" to="/admin" />
      </Switch>
    </div>
  )
}

export default withRouter(ContentMain)