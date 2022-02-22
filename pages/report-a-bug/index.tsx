/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui"
import { GetServerSideProps } from 'next'
import { FC, useState } from 'react'
import styles from "../../styles/Home.module.css"
import Footer from '../../components/Footer'

const ReportABug: FC<{
    authToken?: string,
    repoUrl?: string
}> = ({ authToken, repoUrl }) => {
    const [subject, setSubject] = useState("")
    const [code, setCode] = useState("")
    const [bug, setBug] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        let xhr = new XMLHttpRequest()
        xhr.open("POST", repoUrl)

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
        <div className={styles.container}>
            <h1>Report a bug:</h1>
            <form id="bug-form" onSubmit={handleSubmit} sx={{ variant: "containers.bugForm" }}>
                <label htmlFor="course-subject">
                    Course Subject (or leave blank):
                </label><br/>
                <input 
                    type="text" 
                    id="course-subject" 
                    name="course-subject"
                    onChange={e => setSubject(e.target.value)}
                    sx={{ variant: "containers.bugForm.inputField" }}
                /><br/>
                <label htmlFor="course-code">
                    Course Code (or leave blank):
                </label><br/>
                <input
                    type="text"
                    id="course-code"
                    name="course-code"
                    onChange={e => setCode(e.target.value)}
                    sx={{ variant: "containers.bugForm.inputField" }}
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
                <input
                    sx={{ variant: "containers.courseInfo.button" }}
                    type="submit"
                />
            </form>
            <div style={{"maxWidth": "800px", "width": "100%", "height": "100%"}}>
                <Footer />
            </div>
        </div>
    )
}

export default ReportABug

export const getServerSideProps: GetServerSideProps = async () => {
    return { 
        props: { 
            authToken: process.env.COURSE_REQS_BUG_GITHUB_TOKEN,
            repoUrl: process.env.COURSE_REQS_ISSUES_URL
        }
    }
}
