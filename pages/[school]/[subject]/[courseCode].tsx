import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import { connectToDB } from '../../../db/connect'
import { getCourse } from '../../../db/course'
import createNodes from '../../../utils/course_map/createNodes'
import CourseInfo from '../../../components/CourseInfo'
import CourseMap from '../../../components/CourseMap'

const CoursePage: FC<{ 
    school?: any;
    subject?: any;
    code?: any;
    title?: any;
    credits?: any;
    description?: any;
    notes?: any;
    nodes?: any;
    links?: any;
    preRequisitesText?: any;
    coRequisitesText?: any;
    equivalenciesText?: any;
}> = ({ school, subject, code, title, credits, description, notes, nodes, links, preRequisitesText, coRequisitesText, equivalenciesText }) => {

    return (
        <div className={
            `${school.toLowerCase()}_\
            ${subject.toLowerCase()}_\
            ${code}_page`
        }>
            <CourseInfo 
                school={school}
                subject={subject}
                code={code}
                credits={credits}
                title={title}
                description={description}
                notes={notes}
                preRequisitesText={preRequisitesText}
                coRequisitesText={coRequisitesText}
                equivalenciesText={equivalenciesText}
            />
            <CourseMap
                nodes={nodes}
                links={links}
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
