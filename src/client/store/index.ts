import exerciseStore from './exerciseStore'
import studyStore from './studyStore'
import infoStore from './infoStore'
import chatroomStore from './chatroomStore'
import courseStore from './courseStore'
import forumStore from './forumStore'

export default {
  exerciseStore: new exerciseStore(),
  studyStore: new studyStore(),
  infoStore: new infoStore(),
  chatroomStore: new chatroomStore(),
  courseStore: new courseStore(),
  forumStore: new forumStore()
}