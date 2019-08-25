import exerciseStore from './exerciseStore'
import studyStore from './studyStore'
import infoStore from './infoStore'
import chatStore from './chatStore'

export default {
  exerciseStore: new exerciseStore(),
  studyStore: new studyStore(),
  infoStore: new infoStore(),
  chatStore: new chatStore()
}