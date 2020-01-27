const generateDifficulty = (difficultyDegree: number): { color: string, difficulty: string } => {
  const difficultyList = {
    1: '简单',
    2: '中等',
    3: '困难'
  }
  const colorList = {
    1: '#5cb85c',
    2: '#f0ad4e',
    3: '#d9534f'
  }
  return {
    difficulty: difficultyList[difficultyDegree],
    color: colorList[difficultyDegree]
  }
}

const generateExerciseType = (exerciseType: number): { color: string, type: string } => {
  const typeList = {
    1: '免费',
    2: '会员'
  }
  const colorList = {
    1: '#5cb85c',
    2: '#f0ad4e'
  }
  return {
    color: colorList[exerciseType],
    type: typeList[exerciseType]
  }
}

export {
  generateDifficulty,
  generateExerciseType
}