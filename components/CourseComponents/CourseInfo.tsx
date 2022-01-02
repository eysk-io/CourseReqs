/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from "react"
import { jsx } from "theme-ui"
import CourseSelector from "./CourseSelector"

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
    allSubjects?: string[]
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
    equivalenciesText,
    allSubjects
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
        <div sx={{ variant: "containers.courseInfo" }}>
            <CourseSelector 
                school={school}
                subject={subject}
                code={code}
                subjectCourses={allSubjects}
            />
            <h2 sx={{ variant: "containers.courseInfo.title" }}>
                <a target="_blank" rel="noreferrer" href={`https://www.calendar.ubc.ca/vancouver/courses.cfm?page=name&code=${subject}#${code}`}>
                    {title} ({credits})
                </a>
            </h2>
            <p sx={{ variant: "containers.courseInfo.description" }}>
                {description.replace("<em>", "").replace("</em>","")}
            </p>
            <em><p sx={{ variant: "containers.courseInfo.description.requisites" }}>
                <b>Pre-requisites:</b> {preRequisitesText ? parseReqText(preRequisitesText) : "none"}
            </p></em>
            <em><p sx={{ variant: "containers.courseInfo.description.requisites" }}>
                <b>Co-requisites:</b> {coRequisitesText ? parseReqText(coRequisitesText) : "none"}
            </p></em>
            <em><p sx={{ variant: "containers.courseInfo.description.requisites" }}>
                <b>Equivalencies:</b> {equivalenciesText ? parseReqText(equivalenciesText) : "none"}
            </p></em>
            {notes ? 
                <em><p sx={{ variant: "containers.courseInfo.description.requisites" }}>
                    <b>Note: </b> {notes}
                </p></em> :
                <span></span>
            }
        </div>
    )
}

export default CourseInfo
