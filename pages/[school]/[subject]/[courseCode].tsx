import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import { connectToDB } from '../../../db/connect'
import { getCourse } from '../../../db/course'
import CourseBox from '../../../components/CourseBox'

const CoursePage: FC<{ courseInfo?: any; }> = ({
    courseInfo 
}) => {
    const { 
        school, 
        subject, 
        code, 
        title, 
        description, 
        notes 
    } = courseInfo
    return (
        <div className={
            `${school.toLowerCase()}_${subject.toLowerCase()}_${code} course_page`}
        >
            <CourseBox 
                school={school}
                subject={subject}
                code={code}
                title={title}
                description={description}
                notes={notes}
            />
        </div>
    )
}

export default CoursePage

export const getServerSideProps: GetServerSideProps = async (context) => {
    let courseInfo = {}
    await connectToDB()
    const { school, subject, courseCode } = context.query
    if (
        typeof school === "string" &&
        typeof subject === "string" &&
        typeof courseCode === "string"
    ) {
        courseInfo = await getCourse(school, subject, courseCode)
    }
    return { props: { courseInfo: courseInfo } }
}
