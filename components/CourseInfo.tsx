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
    preRequisitesText?: any
    coRequisitesText?: any
    equivalenciesText?: any
}> = ({
    school, 
    subject, 
    code, 
    title,
    credits, 
    description, 
    notes,
    preRequisitesText,
    coRequisitesText,
    equivalenciesText
}) => {
    const parseReqText = (reqText: string): string => {
        reqText = reqText.replace("<br />", "")
        reqText = reqText.replace("<br/>", "")

        if (reqText[reqText.length-1] === ".") {
            reqText = reqText.slice(0, -1)
        }

        return reqText
    }

    return (
        <div sx={{variant: "containers.courseInfo"}}>
            <h1 sx={{variant: "containers.courseInfoHeaders"}}>
                {school} - {subject} {code} ({credits})
            </h1>
            <h2 sx={{variant: "containers.courseInfoHeaders"}}>
                <a target="_blank" rel="noreferrer" href={`https://www.calendar.ubc.ca/vancouver/courses.cfm?page=name&code=${subject}#${code}`}>
                    {title}
                </a>
            </h2>
            <p sx={{variant: "containers.courseInfoDescription"}}>
                {description.replace("<em>", "").replace("</em>","")}
            </p>
            <p>{notes ? notes : ""}</p>
            <em><p sx={{variant: "containers.courseInfoDescription"}}>
                <b>Pre-requisites:</b> {preRequisitesText ? parseReqText(preRequisitesText) : "none"}
            </p></em>
            <em><p sx={{variant: "containers.courseInfoDescription"}}>
                <b>Co-requisites:</b> {coRequisitesText ? parseReqText(coRequisitesText) : "none"}
            </p></em>
            <em><p sx={{variant: "containers.courseInfoDescription"}}>
                <b>Equivalencies:</b> {equivalenciesText ? parseReqText(equivalenciesText) : "none"}
            </p></em>
        </div>
    )
}

export default CourseInfo
