import exerciseStore from './exerciseStore'
import studyStore from './studyStore'
import infoStore from './infoStore'
import chatroomStore from './chatroomStore'

export default {
  exerciseStore: new exerciseStore(),
  studyStore: new studyStore(),
  infoStore: new infoStore(),
  chatroomStore: new chatroomStore()
}