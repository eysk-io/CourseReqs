import React, { FC, useState, useEffect } from "react"
import { GetServerSideProps } from "next"
import createNodes from "../../../utils/course_map/createNodes"
import CourseInfo from "../../../components/CourseInfo"
import CourseMap from "../../../components/CourseMap"
import Spinner from "../../../components/Spinner"

const CoursePage: FC<{
    school?: string,
    subject?: string,
    code?: number
}> = ({ school, subject, code }) => {
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [credits, setCredits] = useState("")
    const [description, setDescription] = useState("")
    const [notes, setNotes] = useState("")
    const [nodes, setNodes] = useState([])
    const [preRequisitesText, setPreRequisitesText] = useState("")
    const [coRequisitesText, setCoRequisitesText] = useState("")
    const [equivalenciesText, setEquivalenciesText] = useState("")

    useEffect(() => {
        const fetchCourseData = async () => {
            let courseInfo: any = await fetch(`${process.env.COURSE_REQS_URL}/api/course/${school}/${subject}/${code}`)
            courseInfo = await courseInfo.json()
            courseInfo.data.nodes = []
            createNodes(courseInfo.data)
            setNodes(courseInfo.data.nodes)
            setTitle(courseInfo.data.title)
            setCredits(courseInfo.data.credits)
            setDescription(courseInfo.data.description)
            setNotes(courseInfo.data.notes)
            setPreRequisitesText(courseInfo.data.preRequisitesText)
            setCoRequisitesText(courseInfo.data.coRequisitesText)
            setEquivalenciesText(courseInfo.data.equivalenciesText)
            setLoading(false)
        }
        fetchCourseData()
    }, [school])

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className={
                    `${school.toLowerCase()}_\
                    ${subject.toLowerCase()}_\
                    ${code}_page`
                }>
                    <CourseInfo 
                        school={school.toUpperCase()}
                        subject={subject.toUpperCase()}
                        code={code}
                        credits={credits}
                        title={title}
                        description={description}
                        notes={notes}
                        preRequisitesText={preRequisitesText}
                        coRequisitesText={coRequisitesText}
                        equivalenciesText={equivalenciesText}
                        />
                    <CourseMap nodes={nodes}/>
                </div>
            )}
        </>
    )
}

export default CoursePage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { school, subject, courseCode } = context.query
    return { 
        props: {
            school: school,
            subject: subject,
            code: courseCode
        } 
    }
}
