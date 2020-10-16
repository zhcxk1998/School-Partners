export type ExerciseListProps = {
  id: number,
  exerciseName: string,
  exerciseContent: string,
  exerciseType: number,
  exerciseDifficulty: number,
  isHot: boolean,
  key: string
}

export type ExerciseIndexList = {
  index: number,
  topicContent: string
}

export type ExerciseStudentList = {
  studentId: number,
  studentName: string,
  nickName: string,
  openid: string,
  studentAvtar: string
}