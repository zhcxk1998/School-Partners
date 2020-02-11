export interface CourseList {
  id: number,
  publishDate: number,
  courseName: string,
  courseAuthor: string,
  courseDescription: string,
  isRecommend: boolean
}

export interface CourseDetails {
  courseName: string,
  courseAuthor: string,
  courseDescription: string,
  isRecommend: boolean,
  courseRate: number,
}