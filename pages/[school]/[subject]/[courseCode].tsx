import React, { FC, useEffect, createRef } from 'react'
import { GetServerSideProps } from 'next'
import { connectToDB } from '../../../db/connect'
import { getCourse } from '../../../db/course'
import createNodes from '../../../utils/course_map/createNodes'
import CourseBox from '../../../components/CourseBox'
import renderMap from '../../../utils/course_map/renderMap'

const CoursePage: FC<{ 
    school?: any;
    subject?: any;
    code?: any;
    title?: any;
    description?: any;
    notes?: any;
    nodes?: any;
    links?: any;
}> = ({ school, subject, code, title, description, notes, nodes, links }) => {
    const divRef = createRef()
    useEffect(() => {
        let courseInfo = {
            school: school,
            subject: subject,
            code: code,
            title: title,
            description: description,
            notes: notes,
            nodes: nodes,
            links: links
        }
        renderMap(
            divRef.current, 
            courseInfo
        )
    }, [divRef])

    return (
        <div 
            className={
                `${school.toLowerCase()}_\
                ${subject.toLowerCase()}_\
                ${code}_page`
            }
            ref={divRef}
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
    await connectToDB()
    let courseInfo = { nodes: [], links: [] }
    const { school, subject, courseCode } = context.query
    if (
        typeof school === "string" &&
        typeof subject === "string" &&
        typeof courseCode === "string"
    ) {
        courseInfo = await getCourse(school, subject, courseCode)
    }
    createNodes(courseInfo)
    return { props: courseInfo }
}
