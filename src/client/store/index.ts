import exerciseStore from './exerciseStore'
import studyStore from './studyStore'
import infoStore from './infoStore'

export default {
  exerciseStore: new exerciseStore(),
  studyStore: new studyStore(),
  infoStore: new infoStore(),
}