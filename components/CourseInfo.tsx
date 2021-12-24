/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC } from "react"
import { jsx } from 'theme-ui'

const CourseInfo: FC<{
    school?: any
    subject?: any
    code?: any
    title?: any
    credits?: any
    description?: any
    notes?: any
    preRequisites?: any
    coRequisites?: any
    equivalencies?: any
}> = ({
    school, 
    subject, 
    code, 
    title,
    credits, 
    description, 
    notes,
    preRequisites,
    coRequisites,
    equivalencies
}) => {
    const immediatePreReqs = () => {
        return "preReqs"
    }

    const immediateCoReqs = () => {
        return "coReqs"
    }

    const immediateEquivalencies = () => {
        return "equivalencies"
    }

    return (
        <div sx={{variant: "containers.courseInfo"}}>
            <h1>{school} - {subject} {code} ({credits})</h1>
            <h2>
                <a target="_blank" rel="noreferrer" href={`https://www.calendar.ubc.ca/vancouver/courses.cfm?page=name&code=${subject}#${code}`}>
                    {title}
                </a>
            </h2>
            <p sx={{variant: "containers.courseInfoDescription"}}>
                {description.replace("<em>", "").replace("</em>","")}
            </p>
            <p>{notes ? notes : ""}</p>
            <em><p sx={{variant: "containers.courseInfoDescription"}}>
                <b>Pre-requisites:</b> {immediatePreReqs()}
            </p></em>
            <em><p sx={{variant: "containers.courseInfoDescription"}}>
                <b>Co-requisites:</b> {immediateCoReqs()}
            </p></em>
            <em><p sx={{variant: "containers.courseInfoDescription"}}>
                <b>Equivalencies:</b> {immediateEquivalencies()}
            </p></em>
        </div>
    )
}

export default CourseInfo
