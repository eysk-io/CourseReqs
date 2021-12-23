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
}> = ({
    school, 
    subject, 
    code, 
    title,
    credits, 
    description, 
    notes 
}) => {
    return (
        <div sx={{variant: "containers.courseInfo"}}>
            <h1>{school} / {subject} {code} ({credits})</h1>
            <h2>{title}</h2>
            <p sx={{variant: "containers.courseInfoDescription"}}>{description.replace("<em>", "").replace("</em>","")}</p>
            <p>{notes ? notes : ""}</p>
        </div>
    )
}

export default CourseInfo
