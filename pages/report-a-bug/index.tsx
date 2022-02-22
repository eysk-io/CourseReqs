import { FC } from 'react'

const ReportABug: FC<{}> = () => {
    return (
        <div className="report-a-bug">
            <h1>Report a bug:</h1>
            <form id="bug-form">
                <label htmlFor="course-subject">
                    Course Subject (or leave blank):
                </label><br/>
                <input 
                    type="text" 
                    id="course-subject" 
                    name="course-subject"
                /><br/>
                <label htmlFor="course-code">
                    Course Code (or leave blank):
                </label><br/>
                <input
                    type="text"
                    id="course-code"
                    name="course-code"
                /><br/>
                <label htmlFor="bug-form">
                    Please provide some information about the bug below:
                </label><br/>
                <textarea 
                    form="bug-form"
                    rows={4}
                    cols={50}
                    name="bug-info"
                /><br/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default ReportABug
