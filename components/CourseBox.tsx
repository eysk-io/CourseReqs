import React, { FC } from "react"

const CourseBox: FC<{
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
        <div className={"course_box"}>
            <h1>{school} {subject} {code}</h1>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{notes ? notes : "none"}</p>
        </div>
    )
}

export default CourseBox
