/** @jsxRuntime classic */
/** @jsx jsx */
import { FC, useEffect, useState } from "react"
import { jsx } from "theme-ui"

const CourseSelector: FC<{
    school? :any
    subject? :any
    code? :any
    subjectCourses? :any
}> = ({ school, subject, code, subjectCourses }) => {
    const [selectedSubject, setSelectedSubject] = useState(subject)
    const [selectedCode, setSelectedCode] = useState(code)
    const [codes, setCodes] = useState([])

    const calendarUrl = "http://www.calendar.ubc.ca/vancouver/courses.cfm?page=name&code="

    useEffect(() => {
        setSelectedSubject(subject)
        const subjectUrl = `${calendarUrl}${subject}`
        const subjectCodes = subjectCourses.filter(eachSubject => eachSubject.url === subjectUrl)
        if (subjectCodes && subjectCodes[0])
            setCodes(subjectCodes[0].codes)
        if (code)
            setSelectedCode(code)
    }, [school, subject, code, subjectCourses])
    
    const handleSelectCourse = e => {
        e.preventDefault()
        setSelectedSubject(e.target.value)
        const subjectUrl = `${calendarUrl}${e.target.value}`
        const subjectCodes = subjectCourses.filter(eachSubject => eachSubject.url === subjectUrl)
        if (subjectCodes && subjectCodes[0]) {
            setCodes(subjectCodes[0].codes)
        }
        setSelectedCode(subjectCodes[0].codes[0])
    }

    return (
        <div className="course-selector">
            <form 
                sx={{ variant: "containers.courseInfo.courseSelector" }} 
                action={`${window.location.origin}/${school}/${selectedSubject}/${selectedCode}`} 
                method="get"
            >
                <p sx={{variant: "containers.courseInfo.courseSelector.schoolTitle"}}>UBC -</p>
                <select
                    sx={{ variant: "containers.courseInfo.courseSelector.dropdown" }}
                    id="subject"
                    name="subject"
                    value={selectedSubject}
                    onChange={e => handleSelectCourse(e)}
                >
                    {subjectCourses.map((eachSubject, index) =>
                        <option 
                            sx={{ variant: "containers.courseInfo.courseSelector.dropdownContent" }}
                            key={index}
                            >
                            {eachSubject.url.substring(64, 68).toUpperCase()}
                        </option>
                    )}
                </select>
                <select 
                    sx={{ variant: "containers.courseInfo.courseSelector.dropdown" }}
                    id="code"
                    name="code"
                    value={selectedCode}
                    onChange={e => setSelectedCode(e.target.value)}
                    >
                    {codes.map((code: number, index) =>
                        <option 
                        sx={{ variant: "containers.courseInfo.courseSelector.dropdownContent" }}
                        key={index} 
                        value={code}
                        >
                            {code}
                        </option>
                    )}
                </select>
                <input 
                    sx={{ variant: "containers.courseInfo.button" }}
                    type="submit" 
                />
            </form>
        </div>
    )
}

export default CourseSelector
