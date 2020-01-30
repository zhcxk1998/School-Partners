export interface ExerciseInfo {
  exerciseCid: number,
  exerciseName: string,
  finsihCount: number,
  totalCount: number,
  exerciseDifficulty: number,
  exerciseType: number
}

export interface TopicList {
  topicContent: string,
  topicType: number,
  topicAnswer: number[],
  topicOptions: {
    id: number,
    option: string
  }[]
}