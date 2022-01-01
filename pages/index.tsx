import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import CourseSelector from '../components/CourseSelector'

export default function Home() {
  const [allSubjects, setAllSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubjectData = async () => {
      let subjectsInfo: any = await fetch(`${process.env.COURSE_REQS_URL}/api/course/ubc`)
      subjectsInfo = await subjectsInfo.json()
      setAllSubjects(subjectsInfo.data.subjects)
      setLoading(false)
  }
  fetchSubjectData()
  }, [])

  return (
    <>
      {loading ? (
            <div>Loading</div>
          ) : (
            <div className={styles.container}>
              <h1>Pick your course below:</h1>
              <CourseSelector 
                school={"UBC"}
                subject={"ADHE"}
                code={"313"}
                subjectCourses={allSubjects}
              />
            </div>
          )
        }
    </>
  )
}
