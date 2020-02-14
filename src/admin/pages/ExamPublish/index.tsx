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
  Divider,
  Button,
  Icon,
  Checkbox,
  Tooltip,
  message,
  DatePicker
} from 'antd';
import {
  ExamNameRules,
  ExamDifficultyRules,
  ExamTypeRules,
  ExamContentRules,
  ExamTimingModeRules,
  ExamTimeRangeRules,
  ExamCountDownRules,
  TopicContentRules,
  TopicTypeRules,
  TopicOptionRules,
  TopicAnswerRules
} from './formValidate'
import http from '@/admin/utils/http'

import './index.scss'
const { Option } = Select
const { RangePicker } = DatePicker;

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

const ExamPublish: FC<PublishProps> = (props: PublishProps) => {
  const [topicList, setTopicList] = useState<TopicList[]>([{
    topicType: 1,
    topicAnswer: [],
    topicContent: '',
    topicOptions: []
  }])
  const [timingMode, setTimingMode] = useState<number>(1)
  const [examCountDown, setExamCountDown] = useState<string>('m')
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
          examName,
          examContent,
          examType,
          examDifficulty,
          examTimingMode,
          examTime,
          topicList
        } = values
        const time = timingMode === 1
          ? examTime + examCountDown
          : examTime.map((time: any) => time.format('x'))
        topicList.forEach((topic: TopicList) => {
          const { topicOptions } = topic
          topic.topicOptions = topicOptions.map((option: string, id: number) => ({
            id: id + 1,
            option
          }))
        })
        const { data: { msg } } = await http.post('/exams', {
          examName,
          examContent,
          examType,
          examDifficulty,
          examTimingMode,
          examTime: time,
          topicList
        })
        message.success(msg)
        history.push('/admin/content/exam-list')
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

  const handleTimingModeChange = (value: number) => {
    setTimingMode(value)
    /* 不清空表单值会引起 RangePicker 组件报错 */
    setFieldsValue({ examTime: null })
    setExamCountDown('m')
  }

  const handleExamCountDownChange = (value: string) => {
    setExamCountDown(value)
  }

  return (
    <div>
      <CustomBreadcrumb list={['内容管理', '新增考试']} />
      <div className="exam-publish__container">
        <div className="form__title">考试信息</div>
        <Form layout="horizontal" {...formLayout} hideRequiredMark>
          <Form.Item label="考试名称">
            {getFieldDecorator('examName', {
              rules: ExamNameRules
            })(<Input />)}
          </Form.Item>
          <Form.Item label="考试简介">
            {getFieldDecorator('examContent', {
              rules: ExamContentRules
            })(<Input />)}
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label="考试难度" labelCol={{
                span: 8
              }} wrapperCol={{
                span: 10,
                offset: 2
              }}>
                {getFieldDecorator('examDifficulty', {
                  rules: ExamDifficultyRules,
                  initialValue: 1
                })(<Select>
                  <Option value={1}>简单</Option>
                  <Option value={2}>中等</Option>
                  <Option value={3}>困难</Option>
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="考试类型" labelCol={{
                span: 4
              }} wrapperCol={{
                span: 10,
                offset: 2
              }}>
                {getFieldDecorator('examType', {
                  rules: ExamTypeRules,
                  initialValue: 1
                })(<Select>
                  <Option value={1}>课堂小测</Option>
                  <Option value={2}>单元测试</Option>
                </Select>)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label={
            <span>
              计时方式&nbsp;
              <Tooltip title="目前支持两种计时方式">
                <Icon type="info-circle" />
              </Tooltip>
            </span>
          } labelCol={{
            span: 4
          }} wrapperCol={{
            span: 5,
            offset: 1
          }}>
            {getFieldDecorator('examTimingMode', {
              rules: ExamTimingModeRules,
              initialValue: 1
            })(<Select
              onChange={handleTimingModeChange}>
              <Option value={1}>倒计时</Option>
              <Option value={2}>固定时间</Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="时间安排" labelCol={{
            span: 4
          }} wrapperCol={{
            span: timingMode === 1 ? 5 : 12,
            offset: 1
          }}>
            {getFieldDecorator('examTime', {
              rules: timingMode === 1 ? ExamCountDownRules : ExamTimeRangeRules,
            })(
              timingMode === 1 ?
                <Input addonAfter={
                  <Select value={examCountDown} onChange={handleExamCountDownChange} defaultValue="m" style={{ width: 80 }}>
                    <Option value="s">秒</Option>
                    <Option value="m">分钟</Option>
                    <Option value="h">小时</Option>
                    <Option value="d">天</Option>
                  </Select>} />
                :
                <RangePicker
                  style={{ width: '100%' }}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['开始时间', '结束时间']}
                />)}
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

export default Form.create({ name: 'publishForm' })(ExamPublish) as ComponentType