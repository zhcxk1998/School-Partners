import React, { FC, ComponentType, FormEvent, useState, Fragment, useEffect } from 'react'
import { CustomBreadcrumb } from '@/admin/components'
import { RouteComponentProps } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import {
  Form,
  Input,
  Col,
  Row,
  Switch,
  Divider,
  Button,
  Icon,
  Tooltip,
  message,
  Rate,
  Spin
} from 'antd';
import {
  CourseNameRules,
  CourseDescriptionRules,
  CourseAuthorRules,
  CourseRateRules,
  StepTitleRules,
  StepContentRules
} from './formValidate'
import { CourseDetails } from '@/admin/modals/courseList'
import http from '@/admin/utils/http'

import './index.scss'

type ModifyProps = RouteComponentProps & FormComponentProps

interface FormLayout {
  labelCol: object,
  wrapperCol: object,
  labelAlign?: 'left' | 'right' | undefined
}

interface StepList {
  title: string,
  content: string,
}

const CourseModify: FC<ModifyProps> = (props: ModifyProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [courseName, setCourseName] = useState<string>('')
  const [stepList, setStepList] = useState<StepList[]>([{
    title: '',
    content: ''
  }])
  const [courseDetails, setCourseDetails] = useState<CourseDetails>({
    courseRate: 0,
    courseName: '',
    courseDescription: '',
    courseAuthor: '',
    isRecommend: false
  })

  const { history, form, match } = props
  const { getFieldDecorator, getFieldsValue, setFieldsValue } = form
  const formLayout: FormLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 15,
      offset: 1
    }
  }

  useEffect(() => {
    setCourseInfo()
  }, [])

  const setCourseInfo = async () => {
    const { params: { id } } = match as any
    try {
      const { data } = await http.get(`/courses/${id}`)
      const {
        courseName,
        courseDescription,
        courseAuthor,
        courseRate,
        isRecommend,
        courseSteps } = data
      setCourseName(courseName)
      setStepList([...courseSteps])
      setCourseDetails({
        courseName,
        courseDescription,
        courseAuthor,
        courseRate,
        isRecommend,
      })
      setIsLoading(false)
    } catch (e) {
      /* 当通过url直接访问页面时候，若课程不存在则跳转回列表页面 */
      history.push('/admin/content/course-list')
    }
  }

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()

    const { form } = props
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {
          courseName,
          courseDescription,
          courseAuthor,
          courseRate,
          isRecommend,
          stepList
        } = values
        const { params: { id } } = match as any
        const { data: { msg } } = await http.put(`/courses/${id}`, {
          courseName,
          courseDescription,
          courseAuthor,
          courseRate,
          isRecommend,
          stepList
        })
        message.success(msg)
        history.push('/admin/content/course-list')
      }
    })
  }

  const handleTopicAddClick = () => {
    setStepList([...stepList, {
      title: '',
      content: ''
    }])
  }

  const handleTopicDeleteClick = (topicIndex: number) => {
    const { stepList: currentstepList } = getFieldsValue(['stepList'])
    currentstepList.splice(topicIndex, 1)
    setStepList([...currentstepList])
    setFieldsValue({ stepList: currentstepList })
  }

  return (
    <div>
      <CustomBreadcrumb list={['内容管理', '课程管理', courseName]} />
      <div className="course-modify__container">
        <Spin
          spinning={isLoading}
          size="large"
          tip="加载中..."
          indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
          <div className="form__title">课程信息</div>
          <Form layout="horizontal" {...formLayout} hideRequiredMark>
            <Form.Item label="课程名称">
              {getFieldDecorator('courseName', {
                rules: CourseNameRules,
                initialValue: courseDetails.courseName
              })(<Input />)}
            </Form.Item>
            <Form.Item label="课程简介">
              {getFieldDecorator('courseDescription', {
                rules: CourseDescriptionRules,
                initialValue: courseDetails.courseDescription
              })(<Input />)}
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item label="课程作者" labelCol={{
                  span: 8
                }} wrapperCol={{
                  span: 10,
                  offset: 2
                }}>
                  {getFieldDecorator('courseAuthor', {
                    rules: CourseAuthorRules,
                    initialValue: courseDetails.courseAuthor
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="课程评分" labelCol={{
                  span: 4
                }} wrapperCol={{
                  span: 10,
                  offset: 2
                }}>
                  {getFieldDecorator('courseRate', {
                    rules: CourseRateRules,
                    initialValue: courseDetails.courseRate
                  })(<Rate allowHalf />)}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="是否推荐">
              {getFieldDecorator('isRecommend', {
                initialValue: courseDetails.isRecommend,
                valuePropName: 'checked'
              })(
                <Switch />
              )}
            </Form.Item>
            <Divider></Divider>
            <Form.Item label="课程步骤">
              {stepList && stepList.map((_: any, index: number) => {
                return (
                  <Fragment key={index}>
                    <div className="form__subtitle">
                      第{index + 1}步
                    <Tooltip title="删除该题目">
                        <Icon
                          type="delete"
                          theme="twoTone"
                          twoToneColor="#fa4b2a"
                          style={{ marginLeft: 16, display: stepList.length > 1 ? 'inline' : 'none' }}
                          onClick={() => handleTopicDeleteClick(index)} />
                      </Tooltip>
                    </div>
                    <Form.Item label="标题" >
                      {getFieldDecorator(`stepList[${index}].title`, {
                        rules: StepTitleRules,
                        initialValue: stepList[index].title
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="内容" >
                      {getFieldDecorator(`stepList[${index}].content`, {
                        rules: StepContentRules,
                        initialValue: stepList[index].content
                      })(<Input.TextArea />)}
                    </Form.Item>
                  </Fragment>
                )
              })}
              <Form.Item>
                <Button onClick={handleTopicAddClick}>新增步骤</Button>
              </Form.Item>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5 }}>
              <Button type="primary" size="large" onClick={handleFormSubmit}>立即提交</Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div >
  )
}

export default Form.create({ name: 'modifyForm' })(CourseModify) as ComponentType