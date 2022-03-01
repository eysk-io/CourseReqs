/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui"
import { FC, useEffect, useState } from 'react'
import { GetServerSideProps } from "next"
import { connectToDB } from "../../../db/connect"
import { addVisit } from "../../../db/addVisit"
import styles from "../../../styles/Home.module.css"
import Footer from "../../../components/Footer"
import { getNoReqUpperDivCourses } from "../../../db/getNoReqUpperDivCourses"

const UpperDivNoReqs: FC<{
    allNoReqUppderDivCourses?: any[];
}> = ({ allNoReqUppderDivCourses }) => {
    const [allCourses, setAllCourses] = useState([])

    useEffect(() => {
        const sorted = allNoReqUppderDivCourses.sort(
            (a, b) => (a.subject > b.subject) ? 1 : -1
        )
        setAllCourses(sorted)
    }, [allNoReqUppderDivCourses])
    
    return (
        <div className={styles.container}>
            <h1 sx={{ variant: "containers.noReqs" }}>
                UBC Upper-Divs Without Pre or Co-Requisite Courses
            </h1>
            <p sx={{ variant: "containers.noReqs.message" }} style={{width: "75%"}}><strong>PLEASE NOTE:</strong><em> This is an aggregation based on an unofficial API. Please double-check each course on the UBC course calendar: <a href="https://www.calendar.ubc.ca/vancouver/courses.cfm?page=name" target="blank">https://www.calendar.ubc.ca/vancouver/courses.cfm?page=name</a>. As well, it will NOT consider all registration restrictions (ex. Registration for a course may only be restricted to specific faculties, year-standing, programs, etc.)</em></p>
            <div sx={{ variant: "containers.noReqs.course" }}>
                {allCourses.map((subj, index) => {
                    return (
                        <div key={index}>
                            <ul>{subj.subject}:</ul>
                            {subj.courses.map((course, index) => (
                                <li key={index} sx={{ variant: "containers.noReqs.course.li" }}>
                                    <a
                                        key={index} 
                                        href={`https://www.calendar.ubc.ca/vancouver/courses.cfm?page=name&code=${subj.subject}#${course.code}`}
                                        target="blank"
                                    ><strong>{subj.subject} {course.code}:</strong> {course.title} ({course.credits})
                                    </a>
                                </li>
                            ))}
                        </div>
                    )
                })}
            </div>
            <div style={{"maxWidth": "800px", "width": "100%", "height": "100%"}}>
                <Footer />
            </div>
        </div>
    )
}

export default UpperDivNoReqs

export const getServerSideProps: GetServerSideProps = async () => {
    await connectToDB()

    await addVisit()

    const allNoReqUppderDivCourses =
        await getNoReqUpperDivCourses()

    return {
        props: {
            allNoReqUppderDivCourses: [ 
                ... allNoReqUppderDivCourses
            ]
        }
    }
}
