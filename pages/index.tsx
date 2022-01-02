/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from "react"
import { jsx } from "theme-ui"
import styles from "../styles/Home.module.css"
import CourseSelector from "../components/CourseComponents/CourseSelector"
import Footer from "../components/Footer"
import Animation from "../components/AnimationPage/Animation"
import LoadingPage from "../components/LoadingPage"

export default function Home() {
  const [allSubjects, setAllSubjects] = useState([])
  const [randomSubject, setRandomSubject] = useState("ADHE")
  const [randomCode, setRandomCode] = useState("313")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubjectData = async () => {
      let subjectsInfo: any = await fetch(`${process.env.COURSE_REQS_URL}/api/course/ubc`)
      subjectsInfo = await subjectsInfo.json()
      setAllSubjects(subjectsInfo.data.subjects)
      const randomSubjectIdx = Math.floor(Math.random() * subjectsInfo.data.subjects.length)
      const randomSubjectInfo = subjectsInfo.data.subjects[randomSubjectIdx]
      const randomSubject = randomSubjectInfo.url.substring(64, 68).toUpperCase()
      setRandomSubject(randomSubject)
      const randomCodeIdx = Math.floor(Math.random() * randomSubjectInfo.codes.length)
      setRandomCode(randomSubjectInfo.codes[randomCodeIdx])
      setLoading(false)
  }
  fetchSubjectData()
  }, [])

  return (
    <>
      {loading ? (
            <LoadingPage />
          ) : (
            <div className={styles.container}>
              <h1>Pick your course below:</h1>
              <CourseSelector 
                school={"UBC"}
                subject={randomSubject}
                code={randomCode}
                subjectCourses={allSubjects}
              />
              <Animation />
              <div style={{"maxWidth": "800px", "width": "100%", "height": "100%"}}>
                <Footer />
              </div>
            </div>
          )
        }
    </>
  )
}
