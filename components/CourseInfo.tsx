import React, { FC } from "react"

const CourseInfo: FC<{
    school?: any
    subject?: any
    code?: any
    title?: any
    description?: any
    notes?: any
}> = ({
    school, 
    subject, 
    code, 
    title, 
    description, 
    notes 
}) => {
    return (
        <div className={"course-info"}>
            <h1>{school} {subject} {code}</h1>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{notes ? notes : "none"}</p>
        </div>
    )
}

export default CourseInfo
