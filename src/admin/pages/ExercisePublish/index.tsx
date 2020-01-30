import React, { FC, ComponentType, FormEvent, useState, Fragment } from 'react'
import { CustomBreadcrumb } from '@/admin/components'
import { RouteComponentProps } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { SelectValue } from 'antd/lib/select';
import {
  Form,
  Input,
  Select,
  Col,
  Row,
  Switch,
  Divider,
  Button,
  Icon,
  Checkbox,
  Tooltip,
  message
} from 'antd';
import {
  ExerciseNameRules,
  ExerciseDifficultyRules,
  ExerciseTypeRules,
  TopicContentRules,
  ExerciseContentRules,
  TopicTypeRules,
  TopicOptionRules,
  TopicAnswerRules
} from './formValidate'
import http from '@/admin/utils/http'

import './index.scss'
const { Option } = Select

type PublishProps = RouteComponentProps & FormComponentProps

interface FormLayout {
  labelCol: object,
  wrapperCol: object,
  labelAlign?: 'left' | 'right' | undefined
}

interface TopicList {
  topicType: number,
  topicAnswer: number[],
  topicContent: string,
  topicOptions: any[]
}

const ExercisePublish: FC<PublishProps> = (props: PublishProps) => {
  const [topicList, setTopicList] = useState<TopicList[]>([{
    topicType: 1,
    topicAnswer: [],
    topicContent: '',
    topicOptions: []
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
          exerciseName,
          exerciseContent,
          exerciseType,
          exerciseDifficulty,
          isHot,
          topicList
        } = values
        topicList.forEach((topic: TopicList, index: number) => {
          const { topicOptions } = topic
          topic.topicOptions = topicOptions.map((option: string, id: number) => ({
            id: id + 1,
            option
          }))
        })
        const { data: { msg } } = await http.post('/exercises', {
          exerciseName,
          exerciseContent,
          exerciseType,
          exerciseDifficulty,
          isHot,
          topicList
        })
        message.success(msg)
        history.push('/admin/content/exercise-list')
      }
    })
  }

  const handleTopicAddClick = () => {
    setTopicList([...topicList, {
      topicType: 1,
      topicAnswer: [],
      topicContent: '',
      topicOptions: [],
    }])
  }

  const handleTopicDeleteClick = (topicIndex: number) => {
    const { topicList: currentTopicList } = getFieldsValue(['topicList'])
    currentTopicList.splice(topicIndex, 1)
    setTopicList([...currentTopicList])
    setFieldsValue({ topicList: currentTopicList })
  }

  const handleTopicAnswerChange = (checkedValues: CheckboxValueType[], index: number) => {
    const { topicList: currentTopicList } = getFieldsValue(['topicList'])
    const len = checkedValues.length
    if (!isMultiple(index) && len > 1) {
      checkedValues.splice(0, len - 1)
    }
    currentTopicList[index].topicAnswer = [...checkedValues]
    setTopicList([...currentTopicList])
    setFieldsValue({ topicList: currentTopicList })
  }

  const handleTopicTypeChange = (value: SelectValue, index: number) => {
    const { topicList: currentTopicList } = getFieldsValue(['topicList'])
    const { topicAnswer } = currentTopicList[index]
    const len = topicAnswer.length
    if (value === 1 && len > 1) {
      currentTopicList[index].topicAnswer.splice(0, len - 1)
    }
    setTopicList([...currentTopicList])
    setFieldsValue({ topicList: currentTopicList })
  }

  const isMultiple = (index: number): boolean => {
    const { topicList } = getFieldsValue(['topicList'])
    return topicList[index].topicType === 2
  }

  return (
    <div>
      <CustomBreadcrumb list={['内容管理', '新增题目']} />
      <div className="exercise-publish__container">
        <div className="form__title">题库信息</div>
        <Form layout="horizontal" {...formLayout} hideRequiredMark>
          <Form.Item label="题库名称">
            {getFieldDecorator('exerciseName', {
              rules: ExerciseNameRules
            })(<Input />)}
          </Form.Item>
          <Form.Item label="题库简介">
            {getFieldDecorator('exerciseContent', {
              rules: ExerciseContentRules
            })(<Input />)}
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label="题库难度" labelCol={{
                span: 8
              }} wrapperCol={{
                span: 10,
                offset: 2
              }}>
                {getFieldDecorator('exerciseDifficulty', {
                  rules: ExerciseDifficultyRules,
                  initialValue: 1
                })(<Select>
                  <Option value={1}>简单</Option>
                  <Option value={2}>中等</Option>
                  <Option value={3}>困难</Option>
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="题库类型" labelCol={{
                span: 4
              }} wrapperCol={{
                span: 10,
                offset: 2
              }}>
                {getFieldDecorator('exerciseType', {
                  rules: ExerciseTypeRules,
                  initialValue: 1
                })(<Select>
                  <Option value={1}>免费</Option>
                  <Option value={2}>会员</Option>
                </Select>)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="题库热门">
            {getFieldDecorator('isHot', {
              initialValue: false,
              valuePropName: 'checked'
            })(
              <Switch />
            )}
          </Form.Item>
          <Divider></Divider>
          <Form.Item label="新增题目">
            {topicList && topicList.map((topic, index) => {
              return (
                <Fragment key={index}>
                  <div className="form__subtitle">
                    第{index + 1}题
                    <Tooltip title="删除该题目">
                      <Icon
                        type="delete"
                        theme="twoTone"
                        twoToneColor="#fa4b2a"
                        style={{ marginLeft: 16, display: topicList.length > 1 ? 'inline' : 'none' }}
                        onClick={() => handleTopicDeleteClick(index)} />
                    </Tooltip>
                  </div>
                  <Form.Item label="题目内容" >
                    {getFieldDecorator(`topicList[${index}].topicContent`, {
                      rules: TopicContentRules
                    })(<Input.TextArea />)}
                  </Form.Item>
                  <Row gutter={32}>
                    <Col span={12}>
                      <Form.Item label={
                        <span>
                          题目类型&nbsp;
                          <Tooltip title="目前仅支持单选及多选">
                            <Icon type="info-circle" />
                          </Tooltip>
                        </span>
                      }>
                        {getFieldDecorator(`topicList[${index}].topicType`, {
                          rules: TopicTypeRules,
                          initialValue: 1
                        })(<Select onChange={(value) => handleTopicTypeChange(value, index)}>
                          <Option value={1}>单选</Option>
                          <Option value={2}>多选</Option>
                        </Select>)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      {/* <Form.Item label="正确答案">
                        {getFieldDecorator(`topicList[${index}].topicAnswer`, {
                          rules: TopicAnswerRules,
                          initialValue: 1
                        })(<Select mode={isMultiple(index) ? 'multiple' : 'default'}>
                          <Option value={1}>选项A</Option>
                          <Option value={2}>选项B</Option>
                          <Option value={3}>选项C</Option>
                          <Option value={4}>选项D</Option>
                        </Select>)}
                      </Form.Item> */}
                      <Form.Item label="正确答案">
                        {getFieldDecorator(`topicList[${index}].topicAnswer`, {
                          rules: TopicAnswerRules,
                          initialValue: [1]
                        })(<Checkbox.Group
                          style={{ width: '100%' }}
                          onChange={(values) => handleTopicAnswerChange(values, index)}>
                          <Row>
                            {['A', 'B', 'C', 'D'].map((option, idx) => (
                              <Col span={6} key={idx}>
                                <Checkbox value={idx + 1}>选项{option}</Checkbox>
                              </Col>
                            ))}
                          </Row>
                        </Checkbox.Group>)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    {['A', 'B', 'C', 'D'].map((option, idx) => (
                      <Col span={12} key={idx}>
                        <Form.Item label={`选项${option}`}>
                          {getFieldDecorator(`topicList[${index}].topicOptions[${idx}]`, {
                            rules: TopicOptionRules
                            // 改用数组形式存储选项，大于两个选项时候则允许提交
                          })(<Input />)}
                        </Form.Item>
                      </Col>
                    ))}
                  </Row>
                </Fragment>
              )
            })}
            <Form.Item>
              <Button onClick={handleTopicAddClick}>新增题目</Button>
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

export default Form.create({ name: 'publishForm' })(ExercisePublish) as ComponentType