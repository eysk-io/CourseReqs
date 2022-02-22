import { GetServerSideProps } from 'next'
import { FC, useState } from 'react'

const ReportABug: FC<{
    authToken?: string
}> = ({ authToken }) => {
    const [subject, setSubject] = useState("")
    const [code, setCode] = useState("")
    const [bug, setBug] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = "https://api.github.com/repos/eyskim/CourseReqs/issues"

        let xhr = new XMLHttpRequest()
        xhr.open("POST", url)

        xhr.setRequestHeader(
            "Authorization",
            `token ${authToken}`
        )

        xhr.setRequestHeader(
            "Content-Type",
            "application/json;charset=UTF-8"
        )
        
        let data = {
            "title": "Bug Report",
            "body": `Course: ${subject} ${code}\n ${bug}`,
            "labels": ["bug"]
        }

        xhr.send(JSON.stringify(data))
    }

    return (
        <div className="report-a-bug">
            <h1>Report a bug:</h1>
            <form id="bug-form" onSubmit={handleSubmit}>
                <label htmlFor="course-subject">
                    Course Subject (or leave blank):
                </label><br/>
                <input 
                    type="text" 
                    id="course-subject" 
                    name="course-subject"
                    onChange={e => setSubject(e.target.value)}
                /><br/>
                <label htmlFor="course-code">
                    Course Code (or leave blank):
                </label><br/>
                <input
                    type="text"
                    id="course-code"
                    name="course-code"
                    onChange={e => setCode(e.target.value)}
                /><br/>
                <label htmlFor="bug-form">
                    Please provide some information about the bug below:
                </label><br/>
                <textarea 
                    form="bug-form"
                    rows={4}
                    cols={50}
                    name="bug-info"
                    onChange={e => setBug(e.target.value)}
                /><br/>
                <input type="submit"/>
            </form>
            <Footer />
        </div>
    )
}

export default ReportABug

export const getServerSideProps: GetServerSideProps = async () => {
    return { 
        props: { 
            authToken: process.env.COURSE_REQS_BUG_GITHUB_TOKEN
        }
    }
}
