import React, { FC, ComponentType, FormEvent, useState, Fragment, useEffect } from 'react'
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
  DatePicker,
  Spin,
  Switch
} from 'antd';
import moment from 'moment';
import {
  ExamNameRules,
  ExamDifficultyRules,
  ExamTypeRules,
  ExamContentRules,
  ExamTimingModeRules,
  ExamTimeRangeRules,
  ExamCodeRules,
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

type ModifyProps = RouteComponentProps & FormComponentProps

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

interface ExamInfo {
  examName: string,
  examContent: string,
  examCode: string,
  examType: number,
  examDifficulty: number,
  examTimingMode: number,
  startTime: number,
  endTime: number,
  countDown: number
  isOpen: boolean,
}

const ExamModify: FC<ModifyProps> = (props: ModifyProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [examInfo, setExamInfo] = useState<ExamInfo>({
    examName: '',
    examContent: '',
    examCode: '',
    examType: 0,
    examDifficulty: 0,
    examTimingMode: 0,
    startTime: 0,
    endTime: 0,
    countDown: 0,
    isOpen: false,
  })
  const [topicList, setTopicList] = useState<TopicList[]>([{
    topicType: 1,
    topicAnswer: [],
    topicContent: '',
    topicOptions: []
  }])
  const [timingMode, setTimingMode] = useState<number>(1)
  const [examCountDown, setExamCountDown] = useState<string>('m')
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
    setExamDetails()
  }, [])

  const setExamDetails = async () => {
    const { params: { id } } = match as any
    try {
      const { data } = await http.get(`/exams/${id}`)
      const {
        examName,
        examContent,
        examCode,
        examType,
        examDifficulty,
        examTimingMode,
        startTime,
        endTime,
        countDown,
        isOpen,
        topicList
      } = data
      topicList.forEach((_: any, index: number) => {
        topicList[index].topicOptions = topicList[index].topicOptions.map((item: any) => item.option)
      })
      setExamCountDown(countDown[countDown.length - 1])
      setTopicList([...topicList])
      setExamInfo({
        examName,
        examContent,
        examCode,
        examType,
        examDifficulty,
        examTimingMode,
        startTime,
        endTime,
        countDown: countDown.substr(0, countDown.length - 1),
        isOpen
      })
      setTimingMode(examTimingMode)
      setIsLoading(false)
    } catch (e) {
      /* 当通过url直接访问页面时候，若题库不存在则跳转回列表页面 */
      history.push('/admin/content/exam-list')
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
          topicList,
          examCode,
          isOpen
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
        const { params: { id } } = match as any
        const { data: { msg } } = await http.put(`/exams/${id}`, {
          examName,
          examContent,
          examType,
          examDifficulty,
          examTimingMode,
          examTime: time,
          topicList,
          isOpen,
          examCode
        })
        message.success(msg)
        history.push('/admin/content/exam-list')
      }
    })
  }

  const handleTopicAddClick = () => {
    setTopicList([...topicList, {
      topicType: 1,
      topicAnswer: [1],
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
      <CustomBreadcrumb list={['内容管理', '新增考试', examInfo.examName]} />
      <div className="exam-publish__container">
        <Spin
          spinning={isLoading}
          size="large"
          tip="加载中..."
          indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
          <div className="form__title">考试信息</div>
          <Form layout="horizontal" {...formLayout} hideRequiredMark>
            <Form.Item label="考试名称">
              {getFieldDecorator('examName', {
                rules: ExamNameRules,
                initialValue: examInfo.examName
              })(<Input />)}
            </Form.Item>
            <Form.Item label="考试简介">
              {getFieldDecorator('examContent', {
                rules: ExamContentRules,
                initialValue: examInfo.examContent
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
                    initialValue: examInfo.examDifficulty
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
                    initialValue: examInfo.examType
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
                initialValue: examInfo.examTimingMode
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
                initialValue: timingMode === 1 ?
                  examInfo.countDown :
                  [moment(examInfo.startTime), moment(examInfo.endTime)]
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
            <Form.Item label={
              <span>
                考试代码&nbsp;
                <Tooltip title="请输入六位考试代码">
                  <Icon type="info-circle" />
                </Tooltip>
              </span>
            } wrapperCol={{
              span: 5,
              offset: 1
            }}>
              {getFieldDecorator('examCode', {
                rules: ExamCodeRules,
                initialValue: examInfo.examCode,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="是否开启">
              {getFieldDecorator('isOpen', {
                initialValue: examInfo.isOpen,
                valuePropName: 'checked'
              })(<Switch />)}
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
                        rules: TopicContentRules,
                        initialValue: topic.topicContent
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
                            initialValue: topic.topicType
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
                            initialValue: topic.topicAnswer
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
                              rules: TopicOptionRules,
                              initialValue: topic.topicOptions[idx]
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
        </Spin>
      </div>
    </div >
  )
}

export default Form.create({ name: 'modifyForm' })(ExamModify) as ComponentType