import { FC, useState, useEffect } from "react"
import { GetServerSideProps } from "next"
import { connectToDB } from "../../../db/connect"
import { getAllCourseSubjectsBySchool } from "../../../db/course"
import createNodes from "../../../utils/course_map/createNodes"
import CourseInfo from "../../../components/CourseComponents/CourseInfo"
import CourseMap from "../../../components/CourseComponents/CourseMap"
import Footer from "../../../components/Footer"
import LoadingPage from "../../../components/LoadingPage"

const CoursePage: FC<{ 
    school?: string;
    subject?: string;
    code?: string;
    allSubjects?: string[];
}> = ({ school, subject, code, allSubjects }) => {
    const [courseInfo, setCourseInfo] = useState(
        { 
            data: {
                credits: "",
                title: "",
                description: "",
                notes: "",
                preRequisitesText: "",
                coRequisitesText: "",
                equivalenciesText: "",
                nodes: []
            } 
        }
    )
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCourseData = async () => {
            const baseUrl = window.location.origin
            let courseInfo: any = await fetch(`${baseUrl}/api/course/${school}/${subject}/${code}`)
            courseInfo = await courseInfo.json()
            courseInfo.data.nodes = []
            createNodes(courseInfo.data)
            setCourseInfo(courseInfo);
            setLoading(false)
        }
        fetchCourseData()
    }, [school, subject, code])

    return (
        <>
            {loading ? (
                <LoadingPage />
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
                        credits={courseInfo.data.credits}
                        title={courseInfo.data.title}
                        description={courseInfo.data.description}
                        notes={courseInfo.data.notes}
                        preRequisitesText={courseInfo.data.preRequisitesText}
                        coRequisitesText={courseInfo.data.coRequisitesText}
                        equivalenciesText={courseInfo.data.equivalenciesText}
                        allSubjects={allSubjects}
                    />
                    <CourseMap nodes={courseInfo.data.nodes}/>
                    <Footer />
                </div>
            )}
        </>
    )
}

export default CoursePage

export const getServerSideProps: GetServerSideProps = async (context) => {
    await connectToDB()
    const { school, subject, courseCode } = context.query
    let courseSubjects: any = {}
    if (typeof school === "string") {
        courseSubjects = await getAllCourseSubjectsBySchool(school)
    }
    return { 
        props: {
            school: school,
            subject: subject,
            code: courseCode,
            allSubjects: courseSubjects.subjects
        }
    }
}
