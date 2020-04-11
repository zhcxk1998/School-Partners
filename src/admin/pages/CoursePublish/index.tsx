import React, { FC, ComponentType, FormEvent, useState, Fragment } from 'react'
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
  Rate
} from 'antd';
import {
  CourseNameRules,
  CourseDescriptionRules,
  CourseAuthorRules,
  CourseRateRules,
  StepTitleRules,
  StepContentRules
} from './formValidate'
import http from '@/admin/utils/http'

import './index.scss'

type PublishProps = RouteComponentProps & FormComponentProps

interface FormLayout {
  labelCol: object,
  wrapperCol: object,
  labelAlign?: 'left' | 'right' | undefined
}

interface StepList {
  title: string,
  content: string,
}

const CoursePublish: FC<PublishProps> = (props: PublishProps) => {
  const [stepList, setStepList] = useState<StepList[]>([{
    title: '',
    content: ''
  }])
  const { history, form } = props
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
          isPublic,
          stepList
        } = values
        const { data: { msg } } = await http.post('/courses', {
          courseName,
          courseDescription,
          courseAuthor,
          courseRate,
          isRecommend,
          isPublic,
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
      <CustomBreadcrumb list={['内容管理', '新增课程']} />
      <div className="course-publish__container">
        <div className="form__title">课程信息</div>
        <Form layout="horizontal" {...formLayout} hideRequiredMark>
          <Form.Item label="课程名称">
            {getFieldDecorator('courseName', {
              rules: CourseNameRules,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="课程简介">
            {getFieldDecorator('courseDescription', {
              rules: CourseDescriptionRules
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
                })(<Rate allowHalf />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="是否推荐" labelCol={{
                span: 8
              }} wrapperCol={{
                span: 10,
                offset: 2
              }}>
                {getFieldDecorator('isRecommend', {
                  initialValue: false,
                  valuePropName: 'checked'
                })(
                  <Switch />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="是否公开" labelCol={{
                span: 4
              }} wrapperCol={{
                span: 10,
                offset: 2
              }}>
                {getFieldDecorator('isPublic', {
                  initialValue: false,
                  valuePropName: 'checked'
                })(
                  <Switch />
                )}
              </Form.Item>
            </Col>
          </Row>

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
                      rules: StepTitleRules
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="内容" >
                    {getFieldDecorator(`stepList[${index}].content`, {
                      rules: StepContentRules
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
      </div>
    </div >
  )
}

export default Form.create({ name: 'publishForm' })(CoursePublish) as ComponentType